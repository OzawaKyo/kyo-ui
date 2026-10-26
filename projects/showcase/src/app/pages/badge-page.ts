import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KyoBadge, KyoTone } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-badge-page',
  imports: [DocPage, DocExample, KyoBadge],
  template: `
    <app-doc-page slug="badge">
      <app-doc-example heading="Tons" [code]="tonesCode">
        @for (tone of tones; track tone) {
          <span kyoBadge [tone]="tone">{{ tone }}</span>
        }
      </app-doc-example>

      <app-doc-example heading="En contexte" [code]="contextCode">
        <span>Commande #1042</span>
        <span kyoBadge tone="success">Livrée</span>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgePage {
  protected readonly tones: KyoTone[] = ['neutral', 'accent', 'success', 'warning', 'danger', 'info'];

  protected readonly tonesCode = `<span kyoBadge>neutral</span>
<span kyoBadge tone="accent">accent</span>
<span kyoBadge tone="success">success</span>
<span kyoBadge tone="warning">warning</span>
<span kyoBadge tone="danger">danger</span>
<span kyoBadge tone="info">info</span>`;

  protected readonly contextCode = `<span>Commande #1042</span>
<span kyoBadge tone="success">Livrée</span>`;
}
