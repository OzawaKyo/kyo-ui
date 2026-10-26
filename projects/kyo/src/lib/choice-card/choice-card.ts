import { Directive } from '@angular/core';

/**
 * A label wrapping a checkbox or radio, highlighted as a whole when selected.
 * Use `.kyo-choice-card__content`, `__label` and `__description` to lay out the text.
 */
@Directive({
  selector: 'label[kyoChoiceCard]',
  host: { class: 'kyo-choice-card' },
})
export class KyoChoiceCard {}
