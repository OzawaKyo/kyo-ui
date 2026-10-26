import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KyoButton, KyoField, KyoIcon, KyoInput, KyoInputGroup, KyoToast } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-input-group-page',
  imports: [DocPage, DocExample, KyoInputGroup, KyoInput, KyoIcon, KyoButton, KyoField],
  template: `
    <app-doc-page slug="input-group">
      <app-doc-example heading="Recherche" [code]="search" [stack]="true">
        <kyo-input-group class="example-field">
          <kyo-icon name="search" />
          <input kyoInput type="search" placeholder="Rechercher un patient" aria-label="Rechercher un patient" />
        </kyo-input-group>
      </app-doc-example>

      <app-doc-example heading="Lien à copier" description="Champ en lecture seule et bouton intégré." [code]="copy" [stack]="true">
        <kyo-field label="Lien patient" class="example-field">
          <kyo-input-group>
            <kyo-icon name="link" />
            <input #link kyoInput readonly [value]="url" />
            <button kyoButton size="sm" (click)="copyLink(link.value)">
              <kyo-icon name="copy" /> Copier
            </button>
          </kyo-input-group>
        </kyo-field>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupPage {
  private readonly toast = inject(KyoToast);
  protected readonly url = 'https://cabinet.example.fr/d/7f3a9c';

  protected async copyLink(value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      this.toast.success('Lien copié');
    } catch {
      this.toast.error('Copie impossible, sélectionnez le lien manuellement.');
    }
  }

  protected readonly search = `<kyo-input-group>
  <kyo-icon name="search" />
  <input kyoInput type="search" placeholder="Rechercher un patient" aria-label="Rechercher un patient" />
</kyo-input-group>`;

  protected readonly copy = `<kyo-field label="Lien patient">
  <kyo-input-group>
    <kyo-icon name="link" />
    <input kyoInput readonly [value]="url" />
    <button kyoButton size="sm" (click)="copy()"><kyo-icon name="copy" /> Copier</button>
  </kyo-input-group>
</kyo-field>`;
}
