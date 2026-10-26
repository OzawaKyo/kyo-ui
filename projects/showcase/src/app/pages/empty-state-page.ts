import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KyoButton, KyoCard, KyoEmptyState, KyoIcon, KyoSpinner } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-empty-state-page',
  imports: [DocPage, DocExample, KyoEmptyState, KyoButton, KyoIcon, KyoCard, KyoSpinner],
  template: `
    <app-doc-page slug="empty-state">
      <app-doc-example heading="Liste vide avec action" [code]="action" [stack]="true">
        <kyo-card>
          <kyo-empty-state icon="file" heading="Aucun document" description="Les documents ajoutés par le cabinet ou envoyés par le patient apparaîtront ici.">
            <button kyoButton><kyo-icon name="upload" /> Ajouter un document</button>
          </kyo-empty-state>
        </kyo-card>
      </app-doc-example>

      <app-doc-example heading="Aucune sélection" [code]="selection" [stack]="true">
        <kyo-card>
          <kyo-empty-state icon="users" description="Sélectionnez un patient ou créez-en un nouveau." />
        </kyo-card>
      </app-doc-example>

      <app-doc-example heading="Chargement" description="Le contenu projeté peut aussi être un spinner." [code]="loading" [stack]="true">
        <kyo-card>
          <kyo-empty-state description="Chargement…"><kyo-spinner size="lg" label="" /></kyo-empty-state>
        </kyo-card>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStatePage {
  protected readonly action = `<kyo-empty-state icon="file" heading="Aucun document" description="Les documents … apparaîtront ici.">
  <button kyoButton><kyo-icon name="upload" /> Ajouter un document</button>
</kyo-empty-state>`;

  protected readonly selection = `<kyo-empty-state icon="users" description="Sélectionnez un patient ou créez-en un nouveau." />`;

  protected readonly loading = `<kyo-empty-state description="Chargement…">
  <kyo-spinner size="lg" label="" />
</kyo-empty-state>`;
}
