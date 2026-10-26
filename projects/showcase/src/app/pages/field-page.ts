import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KyoField, KyoInput } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-field-page',
  imports: [DocPage, DocExample, KyoField, KyoInput, FormsModule],
  template: `
    <app-doc-page slug="field">
      <app-doc-example heading="Champ complet" description="Libellé, aide et marqueur requis, tous reliés au contrôle." [code]="basic" [stack]="true">
        <kyo-field label="Nom complet" hint="Tel qu'il apparaît sur vos factures." required class="example-field">
          <input kyoInput required autocomplete="name" placeholder="Jeanne Martin" />
        </kyo-field>
      </app-doc-example>

      <app-doc-example heading="Validation" description="Avec ngModel. L'erreur remplace l'aide et pose aria-invalid." [code]="validation" [stack]="true">
        <kyo-field label="Email" hint="Saisissez une adresse invalide pour voir l'erreur." [error]="emailError()" class="example-field">
          <input kyoInput type="email" [(ngModel)]="email" placeholder="vous@exemple.fr" />
        </kyo-field>
      </app-doc-example>

      <app-doc-example heading="Textarea & select" [code]="others" [stack]="true">
        <kyo-field label="Message" class="example-field">
          <textarea kyoInput rows="3" placeholder="Votre message"></textarea>
        </kyo-field>
        <kyo-field label="Pays" class="example-field">
          <select kyoInput>
            <option>France</option>
            <option>Belgique</option>
            <option>Maroc</option>
          </select>
        </kyo-field>
      </app-doc-example>

      <app-doc-example
        heading="Select avec groupes"
        description="Liste d'options stylée (Chrome, Edge) ; les autres navigateurs gardent leur liste native. Toujours un vrai select : clavier, lecteurs d'écran et formulaires inchangés."
        [code]="grouped"
        [stack]="true"
      >
        <kyo-field label="Motif de consultation" class="example-field">
          <select kyoInput>
            <optgroup label="Bilan">
              <option>Bilan psychomoteur initial</option>
              <option>Bilan de renouvellement</option>
            </optgroup>
            <optgroup label="Suivi">
              <option selected>Séance individuelle</option>
              <option>Séance de groupe</option>
              <option disabled>Séance à domicile (indisponible)</option>
            </optgroup>
          </select>
        </kyo-field>
      </app-doc-example>

      <app-doc-example heading="Désactivé, sans field" description="kyoInput fonctionne seul ; il faut alors un aria-label ou un label externe." [code]="standalone" [stack]="true">
        <input kyoInput disabled value="Lecture seule" aria-label="Exemple désactivé" class="example-field" />
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldPage {
  protected readonly email = signal('');
  protected readonly emailError = computed(() => {
    const value = this.email();
    return value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? 'Adresse email invalide.' : null;
  });

  protected readonly basic = `<kyo-field label="Nom complet" hint="Tel qu'il apparaît sur vos factures." required>
  <input kyoInput required autocomplete="name" placeholder="Jeanne Martin" />
</kyo-field>`;

  protected readonly validation = `<kyo-field label="Email" [error]="emailError()">
  <input kyoInput type="email" [(ngModel)]="email" />
</kyo-field>`;

  protected readonly others = `<kyo-field label="Message">
  <textarea kyoInput rows="3"></textarea>
</kyo-field>
<kyo-field label="Pays">
  <select kyoInput>
    <option>France</option>
  </select>
</kyo-field>`;

  protected readonly grouped = `<select kyoInput>
  <optgroup label="Bilan">
    <option>Bilan psychomoteur initial</option>
  </optgroup>
  <optgroup label="Suivi">
    <option selected>Séance individuelle</option>
    <option disabled>Séance à domicile (indisponible)</option>
  </optgroup>
</select>`;

  protected readonly standalone = `<input kyoInput disabled value="Lecture seule" aria-label="Exemple désactivé" />`;
}
