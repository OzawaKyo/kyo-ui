import { Directive } from '@angular/core';

/** A native checkbox exposed as an on/off switch to assistive technologies. */
@Directive({
  selector: 'input[type=checkbox][kyoSwitch]',
  host: {
    class: 'kyo-switch',
    role: 'switch',
  },
})
export class KyoSwitch {}
