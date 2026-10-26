import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KyoCard, KyoCardHeader, KyoDescriptionList } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-description-list-page',
  imports: [DocPage, DocExample, KyoDescriptionList, KyoCard, KyoCardHeader],
  template: `
    <app-doc-page slug="description-list">
      <app-doc-example heading="Fiche patient" description="Sous 24rem de large, la liste empile libellés et valeurs, même dans une carte étroite." [code]="basic" [stack]="true">
        <kyo-card>
          <div kyoCardHeader><h3>Informations de base</h3></div>
          <dl kyoDescriptionList>
            <dt>Date de naissance</dt>
            <dd>12/03/2017 (9 ans)</dd>
            <dt>Email</dt>
            <dd>parents.martin&#64;example.fr</dd>
            <dt>Téléphone</dt>
            <dd>06 12 34 56 78</dd>
            <dt>Suivi depuis le</dt>
            <dd>04/09/2025</dd>
          </dl>
        </kyo-card>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListPage {
  protected readonly basic = `<dl kyoDescriptionList>
  <dt>Date de naissance</dt>
  <dd>12/03/2017 (9 ans)</dd>
  <dt>Email</dt>
  <dd>parents.martin@example.fr</dd>
</dl>`;
}
