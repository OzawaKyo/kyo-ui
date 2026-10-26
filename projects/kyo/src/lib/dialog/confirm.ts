import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  createComponent,
  DOCUMENT,
  EnvironmentInjector,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { KyoButton } from '../button/button';
import { uniqueId } from '../core/id';
import { KyoDialog, KyoDialogFooter } from './dialog';

export interface KyoConfirmOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Styles the confirm button as destructive. */
  danger?: boolean;
}

@Component({
  selector: 'kyo-confirm-dialog',
  imports: [KyoDialog, KyoDialogFooter, KyoButton],
  template: `
    <kyo-dialog
      [(open)]="open"
      [heading]="options().title"
      [closeLabel]="options().cancelLabel ?? 'Cancel'"
      [describedBy]="options().message ? messageId : undefined"
      alert
      size="sm"
      (closed)="done(answer)"
    >
      @if (options().message) {
        <p class="kyo-confirm__message" [id]="messageId">{{ options().message }}</p>
      }
      <div kyoDialogFooter>
        <button kyoButton variant="secondary" autofocus (click)="reply(false)">
          {{ options().cancelLabel ?? 'Cancel' }}
        </button>
        <button kyoButton [variant]="options().danger ? 'danger' : 'primary'" (click)="reply(true)">
          {{ options().confirmLabel ?? 'Confirm' }}
        </button>
      </div>
    </kyo-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class KyoConfirmDialog {
  readonly options = signal<KyoConfirmOptions>({ title: '' });
  protected readonly open = signal(true);
  protected readonly messageId = uniqueId('kyo-confirm-message');
  protected answer = false;
  done: (answer: boolean) => void = () => {};

  protected reply(answer: boolean): void {
    this.answer = answer;
    this.open.set(false);
  }
}

/**
 * Promise-based replacement for window.confirm(). Cancel is focused first, so a stray Enter
 * never confirms a destructive action.
 */
@Injectable({ providedIn: 'root' })
export class KyoConfirm {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);

  confirm(options: KyoConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      const ref = createComponent(KyoConfirmDialog, { environmentInjector: this.injector });
      ref.instance.options.set(options);
      ref.instance.done = (answer) => {
        resolve(answer);
        // Let the native close event finish before tearing the view down.
        queueMicrotask(() => {
          this.appRef.detachView(ref.hostView);
          ref.destroy();
        });
      };
      this.appRef.attachView(ref.hostView);
      this.document.body.append(ref.location.nativeElement);
    });
  }
}
