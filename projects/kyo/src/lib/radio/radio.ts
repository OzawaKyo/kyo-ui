import { Directive } from '@angular/core';

/** Styles a native radio button. Group radios in a fieldset with a legend. */
@Directive({
  selector: 'input[type=radio][kyoRadio]',
  host: { class: 'kyo-radio' },
})
export class KyoRadio {}
