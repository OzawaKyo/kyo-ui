import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { uniqueId } from '../core/id';

export type KyoDialogSize = 'sm' | 'md' | 'lg';

/**
 * Modal built on the native <dialog>: focus trap, Escape, inert background and top layer
 * come from the browser. Forms with method="dialog" close it natively.
 */
@Component({
  selector: 'kyo-dialog',
  template: `
    <dialog
      #dialog
      class="kyo-dialog"
      [attr.data-size]="size()"
      [attr.role]="alert() ? 'alertdialog' : null"
      [attr.aria-describedby]="describedBy() || null"
      [attr.aria-labelledby]="heading() ? headingId : null"
      [attr.aria-label]="heading() ? null : label() || null"
      (close)="onNativeClose()"
      (pointerdown)="pressedOn = $event.target"
      (click)="onClick($event)"
    >
      @if (heading()) {
        <header class="kyo-dialog__header">
          <h2 class="kyo-dialog__title" [id]="headingId">{{ heading() }}</h2>
          <button type="button" class="kyo-dialog__close" [attr.aria-label]="closeLabel()" (click)="close()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>
      }
      <div class="kyo-dialog__body"><ng-content /></div>
      <ng-content select="[kyoDialogFooter]" />
    </dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class KyoDialog {
  readonly open = model(false);
  readonly heading = input<string>();
  /** Accessible name when there is no visible heading. */
  readonly label = input<string>();
  readonly size = input<KyoDialogSize>('md');
  readonly closeOnBackdrop = input(true, { transform: booleanAttribute });
  readonly closeLabel = input('Close');
  /** Urgent question that needs an answer, e.g. a confirmation: exposed as an alertdialog. */
  readonly alert = input(false, { transform: booleanAttribute });
  /** Id(s) of the element(s) that describe the dialog, read after its name. */
  readonly describedBy = input<string>();
  /** Emitted every time the dialog closes, whatever the cause (button, Escape, backdrop, form). */
  readonly closed = output<void>();

  protected readonly headingId = uniqueId('kyo-dialog-title');
  protected pressedOn: EventTarget | null = null;
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    afterRenderEffect(() => {
      const el = this.dialog().nativeElement;
      if (this.open() && !el.open) el.showModal();
      else if (!this.open() && el.open) el.close();
    });
  }

  close(): void {
    this.open.set(false);
  }

  protected onNativeClose(): void {
    this.open.set(false);
    this.closed.emit();
  }

  /** A click whose press and release both land on the <dialog> itself hit the backdrop. */
  protected onClick(event: MouseEvent): void {
    const el = this.dialog().nativeElement;
    if (this.closeOnBackdrop() && event.target === el && this.pressedOn === el) this.close();
  }
}

/** Action row at the bottom of a dialog. */
@Directive({
  selector: '[kyoDialogFooter]',
  host: { class: 'kyo-dialog__footer' },
})
export class KyoDialogFooter {}

/** Closes the enclosing kyo-dialog on click. */
@Directive({
  selector: '[kyoDialogClose]',
  host: { '(click)': 'dialog.close()' },
})
export class KyoDialogClose {
  protected readonly dialog = inject(KyoDialog);
}
