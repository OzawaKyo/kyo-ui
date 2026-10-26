import { Directive } from '@angular/core';

/** Two-column term / value grid that stacks on narrow screens. */
@Directive({
  selector: 'dl[kyoDescriptionList]',
  host: { class: 'kyo-description-list' },
})
export class KyoDescriptionList {}
