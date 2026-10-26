import { Directive, input } from '@angular/core';
import { KyoTone } from '../core/tone';

@Directive({
  selector: '[kyoBadge]',
  host: {
    class: 'kyo-badge',
    '[attr.data-tone]': 'tone()',
  },
})
export class KyoBadge {
  readonly tone = input<KyoTone>('neutral');
}
