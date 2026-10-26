import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  createComponent,
  DOCUMENT,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { KyoTone } from '../core/tone';
import { KyoIcon } from '../icon/icon';

export interface KyoToastOptions {
  tone?: KyoTone;
  /** Milliseconds before auto-dismiss. Defaults to 3000, 6000 for danger. 0 keeps it. */
  duration?: number;
}

interface ToastItem {
  id: number;
  message: string;
  tone: KyoTone;
}

interface ToastTimer {
  remaining: number;
  startedAt: number;
  handle?: ReturnType<typeof setTimeout>;
}

const ICONS: Partial<Record<KyoTone, string>> = {
  success: 'check-circle',
  danger: 'alert-circle',
  warning: 'alert-triangle',
  info: 'info',
  accent: 'info',
};

@Component({
  selector: 'kyo-toaster',
  imports: [KyoIcon],
  template: `
    @for (toast of toasts(); track toast.id) {
      <div class="kyo-toast" [attr.data-tone]="toast.tone" [attr.role]="toast.tone === 'danger' ? 'alert' : null">
        @if (icons[toast.tone]; as icon) {
          <kyo-icon [name]="icon" />
        }
        <span class="kyo-toast__message">{{ toast.message }}</span>
        <button type="button" class="kyo-toast__close" [attr.aria-label]="dismissLabel()" (click)="dismiss(toast.id)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kyo-toaster',
    'aria-live': 'polite',
    '(mouseenter)': 'setHovered(true)',
    '(mouseleave)': 'setHovered(false)',
    '(focusin)': 'setFocused(true)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class KyoToaster {
  readonly toasts = signal<ToastItem[]>([]);
  readonly dismissLabel = signal('Dismiss');
  protected readonly icons = ICONS;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly timers = new Map<number, ToastTimer>();
  private hovered = false;
  private focused = false;

  add(item: ToastItem, duration: number): void {
    this.toasts.update((list) => [...list, item]);
    if (duration <= 0) return;
    const timer: ToastTimer = { remaining: duration, startedAt: 0 };
    this.timers.set(item.id, timer);
    if (!this.paused) this.start(item.id, timer);
  }

  dismiss(id: number): void {
    clearTimeout(this.timers.get(id)?.handle);
    this.timers.delete(id);
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  // Timers stop while the pointer or focus is on a toast, so it can be read and dismissed
  protected setHovered(hovered: boolean): void {
    this.hovered = hovered;
    this.syncTimers();
  }

  protected setFocused(focused: boolean): void {
    this.focused = focused;
    this.syncTimers();
  }

  protected onFocusOut(event: FocusEvent): void {
    if (!this.host.contains(event.relatedTarget as Node | null)) this.setFocused(false);
  }

  private get paused(): boolean {
    return this.hovered || this.focused;
  }

  private syncTimers(): void {
    for (const [id, timer] of this.timers) {
      if (this.paused && timer.handle !== undefined) {
        clearTimeout(timer.handle);
        timer.handle = undefined;
        timer.remaining -= Date.now() - timer.startedAt;
      } else if (!this.paused && timer.handle === undefined) {
        this.start(id, timer);
      }
    }
  }

  private start(id: number, timer: ToastTimer): void {
    timer.startedAt = Date.now();
    timer.handle = setTimeout(() => this.dismiss(id), timer.remaining);
  }
}

/** Shows short, non-blocking notifications. Visible above open modal dialogs too. */
@Injectable({ providedIn: 'root' })
export class KyoToast {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);
  private toaster?: ComponentRef<KyoToaster>;
  private nextId = 0;

  constructor() {
    // Mount the live region early: screen readers ignore content added along with the region itself
    this.ensureToaster();
  }

  show(message: string, options: KyoToastOptions = {}): number {
    const tone = options.tone ?? 'neutral';
    const duration = options.duration ?? (tone === 'danger' ? 6000 : 3000);
    const id = this.nextId++;
    const host = this.ensureToaster();
    const add = () => host.instance.add({ id, message, tone }, duration);
    // Same reason when it just moved into a dialog: let it settle before adding the message
    if (this.moved) setTimeout(add, 100);
    else add();
    return id;
  }

  success(message: string, options?: Omit<KyoToastOptions, 'tone'>): number {
    return this.show(message, { ...options, tone: 'success' });
  }

  error(message: string, options?: Omit<KyoToastOptions, 'tone'>): number {
    return this.show(message, { ...options, tone: 'danger' });
  }

  dismiss(id: number): void {
    this.toaster?.instance.dismiss(id);
  }

  /** Label of the close button on each toast (i18n). */
  setDismissLabel(label: string): void {
    this.ensureToaster().instance.dismissLabel.set(label);
  }

  /** Whether the last ensureToaster() call re-parented the live region. */
  private moved = false;

  private ensureToaster(): ComponentRef<KyoToaster> {
    const created = !this.toaster;
    this.toaster ??= createComponent(KyoToaster, { environmentInjector: this.injector });
    if (created) this.appRef.attachView(this.toaster.hostView);
    this.moved = this.place() && !created;
    return this.toaster;
  }

  /**
   * Everything outside a modal dialog is inert, so the region lives inside the topmost open one,
   * and comes back out when that dialog closes (e.g. "save, toast, close").
   */
  private place(): boolean {
    const host = this.toaster!.location.nativeElement as HTMLElement;
    const dialogs = this.document.querySelectorAll('dialog[open]');
    const dialog = dialogs[dialogs.length - 1];
    const parent = dialog ?? this.document.body;
    if (host.parentElement === parent) return false;
    parent.append(host);
    dialog?.addEventListener('close', () => this.place(), { once: true });
    return true;
  }
}
