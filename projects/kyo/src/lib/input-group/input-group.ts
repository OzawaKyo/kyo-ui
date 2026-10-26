import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Draws a text control and its inline icons or buttons as a single field.
 * Children keep their DOM order: put a kyo-icon before the input, a button after it.
 */
@Component({
  selector: 'kyo-input-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kyo-input-group' },
})
export class KyoInputGroup {}
