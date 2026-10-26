import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'kyo-progress',
  template: `<span class="kyo-progress__fill"></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kyo-progress',
    role: 'progressbar',
    'aria-valuemin': '0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'now()',
    '[attr.aria-label]': 'label() || null',
    '[attr.data-indeterminate]': 'value() === null || null',
    '[style.--kyo-progress-value]': 'percent()',
  },
})
export class KyoProgress {
  /** Current value; null shows an indeterminate animation. */
  readonly value = input<number | null>(null);
  readonly max = input(100);
  readonly label = input<string>();

  /** Kept within [0, max] so assistive tech never gets an out-of-range value. */
  protected readonly now = computed(() => {
    const value = this.value();
    return value === null ? null : Math.min(this.max(), Math.max(0, value));
  });

  protected readonly percent = computed(() => {
    const now = this.now();
    if (now === null || this.max() <= 0) return null;
    return `${(now / this.max()) * 100}%`;
  });
}
