import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KyoCheckbox, KyoChoiceCard, KyoRadio } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-choice-card-page',
  imports: [DocPage, DocExample, KyoChoiceCard, KyoCheckbox, KyoRadio],
  template: `
    <app-doc-page slug="choice-card">
      <app-doc-example heading="Option détaillée" description="Une case à cocher avec un titre et une explication." [code]="detailed" [stack]="true">
        <label kyoChoiceCard class="example-field">
          <input type="checkbox" kyoCheckbox checked />
          <span class="kyo-choice-card__content">
            <span class="kyo-choice-card__label">Formulaire à remplir</span>
            <span class="kyo-choice-card__description">Le patient complète les champs « Demandé au patient » de sa fiche.</span>
          </span>
        </label>
      </app-doc-example>

      <app-doc-example heading="Liste de documents" description="Plusieurs cartes empilées pour composer une demande." [code]="list" [stack]="true">
        <div class="example-stack example-field">
          @for (doc of documents; track doc.label) {
            <label kyoChoiceCard>
              <input type="checkbox" kyoCheckbox [checked]="doc.checked" />
              <span class="kyo-choice-card__content">
                <span class="kyo-choice-card__label">{{ doc.label }}</span>
                <span class="kyo-choice-card__description">{{ doc.hint }}</span>
              </span>
            </label>
          }
        </div>
      </app-doc-example>

      <app-doc-example heading="Choix en ligne" description="Radios présentées en pastilles." [code]="inline">
        @for (option of ['Oui', 'Non', 'Ne sait pas']; track option) {
          <label kyoChoiceCard>
            <input type="radio" kyoRadio name="inline" [checked]="option === 'Oui'" />
            {{ option }}
          </label>
        }
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceCardPage {
  protected readonly documents = [
    { label: 'Ordonnance', hint: 'Prescription du médecin, moins de 3 mois.', checked: true },
    { label: 'Bilan précédent', hint: 'Si un bilan psychomoteur a déjà été réalisé.', checked: false },
    { label: 'Attestation de mutuelle', hint: 'Recto verso.', checked: false },
  ];

  protected readonly detailed = `<label kyoChoiceCard>
  <input type="checkbox" kyoCheckbox />
  <span class="kyo-choice-card__content">
    <span class="kyo-choice-card__label">Formulaire à remplir</span>
    <span class="kyo-choice-card__description">Le patient complète les champs…</span>
  </span>
</label>`;

  protected readonly list = `@for (doc of documents; track doc.label) {
  <label kyoChoiceCard>
    <input type="checkbox" kyoCheckbox [checked]="doc.checked" />
    …
  </label>
}`;

  protected readonly inline = `<label kyoChoiceCard>
  <input type="radio" kyoRadio name="reponse" /> Oui
</label>`;
}
