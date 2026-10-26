import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type KyoSpinnerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'kyo-spinner',
  template: `
    @if (label()) {
      <span class="kyo-visually-hidden">{{ label() }}</span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kyo-spinner',
    '[attr.data-size]': 'size()',
    '[attr.role]': 'label() ? "status" : null',
    '[attr.aria-hidden]': 'label() ? null : "true"',
  },
})
export class KyoSpinner {
  readonly size = input<KyoSpinnerSize>('md');
  /** Announced by screen readers. Pass an empty string for a purely decorative spinner. */
  readonly label = input('Loading');
}
