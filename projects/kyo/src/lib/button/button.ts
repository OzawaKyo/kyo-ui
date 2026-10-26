import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { KyoSpinner } from '../spinner/spinner';

export type KyoButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type KyoButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'button[kyoButton], a[kyoButton]',
  imports: [KyoSpinner],
  template: `
    @if (loading()) {
      <kyo-spinner size="sm" label="" />
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kyo-button',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.aria-busy]': 'loading() || null',
    '[attr.aria-disabled]': 'loading() || null',
  },
})
export class KyoButton {
  readonly variant = input<KyoButtonVariant>('primary');
  readonly size = input<KyoButtonSize>('md');
  /** Shows a spinner and swallows clicks while keeping the button focusable. */
  readonly loading = input(false, { transform: booleanAttribute });

  constructor() {
    // Capture listeners on the target run before any (click) bound by the consumer.
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.addEventListener(
      'click',
      (event) => {
        if (this.loading()) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      { capture: true },
    );
  }
}
