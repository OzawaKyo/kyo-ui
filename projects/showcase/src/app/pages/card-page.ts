import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KyoButton, KyoCard, KyoCardFooter, KyoCardHeader } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-card-page',
  imports: [DocPage, DocExample, KyoCard, KyoCardHeader, KyoCardFooter, KyoButton],
  template: `
    <app-doc-page slug="card">
      <app-doc-example heading="Complète" description="En-tête, contenu et pied d'actions." [code]="full" [stack]="true">
        <kyo-card class="example-card">
          <div kyoCardHeader>
            <h3>Abonnement</h3>
            <p>Gérez votre formule et votre facturation.</p>
          </div>
          Formule Pro, renouvelée le 1er novembre.
          <div kyoCardFooter>
            <button kyoButton variant="ghost" size="sm">Résilier</button>
            <button kyoButton size="sm">Modifier</button>
          </div>
        </kyo-card>
      </app-doc-example>

      <app-doc-example heading="Simple" [code]="simple" [stack]="true">
        <kyo-card class="example-card">Un simple conteneur.</kyo-card>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPage {
  protected readonly full = `<kyo-card>
  <div kyoCardHeader>
    <h3>Abonnement</h3>
    <p>Gérez votre formule et votre facturation.</p>
  </div>
  Formule Pro, renouvelée le 1er novembre.
  <div kyoCardFooter>
    <button kyoButton variant="ghost" size="sm">Résilier</button>
    <button kyoButton size="sm">Modifier</button>
  </div>
</kyo-card>`;

  protected readonly simple = `<kyo-card>Un simple conteneur.</kyo-card>`;
}
