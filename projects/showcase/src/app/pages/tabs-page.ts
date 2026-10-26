import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KyoTab, KyoTabs } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-tabs-page',
  imports: [DocPage, DocExample, KyoTabs, KyoTab],
  template: `
    <app-doc-page slug="tabs">
      <app-doc-example heading="Soulignés" description="Avec compteurs. Cliquez puis utilisez les flèches." [code]="underline" [stack]="true">
        <kyo-tabs [(selected)]="tab" label="Dossier patient">
          <kyo-tab value="fiche" label="Fiche">Informations de base et champs personnalisés.</kyo-tab>
          <kyo-tab value="documents" label="Documents" [badge]="3">Ordonnance, bilan, attestation.</kyo-tab>
          <kyo-tab value="demandes" label="Demandes" [badge]="1">Une demande en attente de réponse.</kyo-tab>
        </kyo-tabs>
        <span class="example-status">Onglet actif : {{ tab() }}</span>
      </app-doc-example>

      <app-doc-example heading="Pilules" description="Variante segmentée, pour des sous-sections." [code]="pill" [stack]="true">
        <kyo-tabs appearance="pill" label="Paramètres">
          <kyo-tab value="fiche" label="Fiche patient">Champs qui complètent la fiche de chaque patient.</kyo-tab>
          <kyo-tab value="documents" label="Documents demandés">Documents proposés lors d'une demande.</kyo-tab>
        </kyo-tabs>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage {
  protected readonly tab = signal('fiche');

  protected readonly underline = `<kyo-tabs [(selected)]="tab" label="Dossier patient">
  <kyo-tab value="fiche" label="Fiche">…</kyo-tab>
  <kyo-tab value="documents" label="Documents" [badge]="3">…</kyo-tab>
  <kyo-tab value="demandes" label="Demandes" [badge]="1">…</kyo-tab>
</kyo-tabs>`;

  protected readonly pill = `<kyo-tabs appearance="pill" label="Paramètres">
  <kyo-tab value="fiche" label="Fiche patient">…</kyo-tab>
  <kyo-tab value="documents" label="Documents demandés">…</kyo-tab>
</kyo-tabs>`;
}
