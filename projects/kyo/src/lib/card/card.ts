import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

@Directive({
  selector: '[kyoCardHeader]',
  host: { class: 'kyo-card__header' },
})
export class KyoCardHeader {}

@Directive({
  selector: '[kyoCardFooter]',
  host: { class: 'kyo-card__footer' },
})
export class KyoCardFooter {}

@Component({
  selector: 'kyo-card',
  template: `
    <ng-content select="[kyoCardHeader]" />
    <div class="kyo-card__body"><ng-content /></div>
    <ng-content select="[kyoCardFooter]" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kyo-card' },
})
export class KyoCard {}
