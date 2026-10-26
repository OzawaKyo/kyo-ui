import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { KyoIcon } from '../icon/icon';

/** Placeholder for an empty list, a missing selection or a finished flow. Actions go inside. */
@Component({
  selector: 'kyo-empty-state',
  imports: [KyoIcon],
  template: `
    @if (icon()) {
      <span class="kyo-empty-state__icon"><kyo-icon [name]="icon()!" /></span>
    }
    @if (heading()) {
      <p class="kyo-empty-state__title">{{ heading() }}</p>
    }
    @if (description()) {
      <p class="kyo-empty-state__description">{{ description() }}</p>
    }
    <div class="kyo-empty-state__actions"><ng-content /></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kyo-empty-state' },
})
export class KyoEmptyState {
  readonly icon = input<string>();
  readonly heading = input<string>();
  readonly description = input<string>();
}
