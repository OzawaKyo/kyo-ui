import { Directive } from '@angular/core';

/** Styles a native checkbox. Set `[indeterminate]` directly, it is a native property. */
@Directive({
  selector: 'input[type=checkbox][kyoCheckbox]',
  host: { class: 'kyo-checkbox' },
})
export class KyoCheckbox {}

/** Inline label wrapping a checkbox or a switch. */
@Directive({
  selector: 'label[kyoChoice]',
  host: { class: 'kyo-choice' },
})
export class KyoChoice {}
