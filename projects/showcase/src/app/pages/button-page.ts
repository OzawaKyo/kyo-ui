import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KyoButton, KyoIcon } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-button-page',
  imports: [DocPage, DocExample, KyoButton, KyoIcon],
  template: `
    <app-doc-page slug="button">
      <app-doc-example heading="Variantes" description="Une seule action primary par zone, secondary pour les alternatives, ghost pour les actions tertiaires." [code]="variants">
        <button kyoButton>Enregistrer</button>
        <button kyoButton variant="secondary">Annuler</button>
        <button kyoButton variant="ghost">En savoir plus</button>
        <button kyoButton variant="danger">Supprimer</button>
      </app-doc-example>

      <app-doc-example heading="Tailles" description="sm 2rem · md 2.5rem · lg 3rem, réduites en densité compacte." [code]="sizes">
        <button kyoButton size="sm">Small</button>
        <button kyoButton size="md">Medium</button>
        <button kyoButton size="lg">Large</button>
      </app-doc-example>

      <app-doc-example heading="États" [code]="states">
        <button kyoButton disabled>Désactivé</button>
        <button kyoButton [loading]="saving()" (click)="save()">
          {{ saving() ? 'Enregistrement…' : 'Cliquer pour charger' }}
        </button>
        <a kyoButton variant="secondary" href="#">Lien</a>
      </app-doc-example>

      <app-doc-example heading="Avec icônes" description="kyo-icon se dimensionne seul ; iconOnly rend le bouton carré (aria-label obligatoire)." [code]="icons">
        <button kyoButton><kyo-icon name="plus" /> Nouveau patient</button>
        <button kyoButton variant="secondary"><kyo-icon name="send" /> Envoyer une demande</button>
        <button kyoButton variant="ghost" iconOnly aria-label="Modifier"><kyo-icon name="pencil" /></button>
        <button kyoButton variant="ghost" size="sm" iconOnly aria-label="Supprimer"><kyo-icon name="trash" /></button>
      </app-doc-example>

      <app-doc-example heading="Lien et pleine largeur" description="link pour une action discrète dans du texte ; block pour un bouton principal sur mobile." [code]="linkBlock" [stack]="true">
        <span>
          <button kyoButton variant="link">Voir la fiche complète</button>
          ·
          <button kyoButton variant="link" style="--kyo-button-fg: var(--kyo-danger-text)">Supprimer ce patient</button>
        </span>
        <button kyoButton size="lg" block><kyo-icon name="upload" /> Ajouter le fichier</button>
      </app-doc-example>

      <app-doc-example heading="Surcharge locale" description="Les tokens composant se surchargent avec du CSS ordinaire, sans !important." [code]="override">
        <button kyoButton class="pill">Pilule</button>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPage {
  protected readonly saving = signal(false);

  protected save(): void {
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 1500);
  }

  protected readonly variants = `<button kyoButton>Enregistrer</button>
<button kyoButton variant="secondary">Annuler</button>
<button kyoButton variant="ghost">En savoir plus</button>
<button kyoButton variant="danger">Supprimer</button>`;

  protected readonly sizes = `<button kyoButton size="sm">Small</button>
<button kyoButton size="md">Medium</button>
<button kyoButton size="lg">Large</button>`;

  protected readonly states = `<button kyoButton disabled>Désactivé</button>
<button kyoButton [loading]="saving()" (click)="save()">Enregistrer</button>
<a kyoButton variant="secondary" href="/docs">Lien</a>`;

  protected readonly icons = `<button kyoButton><kyo-icon name="plus" /> Nouveau patient</button>
<button kyoButton variant="ghost" iconOnly aria-label="Modifier"><kyo-icon name="pencil" /></button>`;

  protected readonly linkBlock = `<button kyoButton variant="link">Voir la fiche complète</button>
<button kyoButton variant="link" style="--kyo-button-fg: var(--kyo-danger-text)">Supprimer ce patient</button>
<button kyoButton size="lg" block><kyo-icon name="upload" /> Ajouter le fichier</button>`;

  protected readonly override = `.pill {
  --kyo-button-radius: var(--kyo-radius-full);
  --kyo-button-padding-inline: var(--kyo-space-6);
}

<button kyoButton class="pill">Pilule</button>`;
}
