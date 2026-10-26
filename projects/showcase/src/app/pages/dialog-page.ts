import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  KyoButton,
  KyoConfirm,
  KyoDialog,
  KyoDialogClose,
  KyoDialogFooter,
  KyoField,
  KyoInput,
  KyoToast,
} from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-dialog-page',
  imports: [DocPage, DocExample, KyoDialog, KyoDialogFooter, KyoDialogClose, KyoButton, KyoField, KyoInput],
  template: `
    <app-doc-page slug="dialog">
      <app-doc-example heading="Formulaire en modale" description="Échap, clic en dehors ou Annuler ferment ; Entrée soumet." [code]="form">
        <button kyoButton (click)="open.set(true)">Nouveau patient</button>
        <kyo-dialog [(open)]="open" heading="Nouveau patient" closeLabel="Fermer">
          <form id="patient-form" class="example-stack" (submit)="save($event)">
            <div class="example-row example-row--fields">
              <kyo-field label="Prénom" required><input kyoInput name="prenom" required autofocus autocomplete="given-name" /></kyo-field>
              <kyo-field label="Nom" required><input kyoInput name="nom" required autocomplete="family-name" /></kyo-field>
            </div>
            <kyo-field label="Date de naissance"><input kyoInput type="date" name="naissance" /></kyo-field>
          </form>
          <div kyoDialogFooter>
            <button kyoButton variant="secondary" kyoDialogClose>Annuler</button>
            <button kyoButton type="submit" form="patient-form">Enregistrer</button>
          </div>
        </kyo-dialog>
      </app-doc-example>

      <app-doc-example heading="Confirmation" description="KyoConfirm : une promesse, focus sur Annuler." [code]="confirmCode">
        <button kyoButton variant="danger" (click)="remove()">Supprimer le patient</button>
        <span class="example-status">{{ lastAnswer() }}</span>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPage {
  private readonly confirm = inject(KyoConfirm);
  private readonly toast = inject(KyoToast);
  protected readonly open = signal(false);
  protected readonly lastAnswer = signal('');

  protected save(event: Event): void {
    event.preventDefault();
    this.open.set(false);
    this.toast.success('Patient enregistré');
  }

  protected async remove(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: 'Supprimer Jeanne Martin ?',
      message: 'Sa fiche, ses documents et ses demandes seront définitivement supprimés.',
      confirmLabel: 'Supprimer',
      cancelLabel: 'Annuler',
      danger: true,
    });
    this.lastAnswer.set(ok ? 'Confirmé' : 'Annulé');
  }

  protected readonly form = `<kyo-dialog [(open)]="open" heading="Nouveau patient" closeLabel="Fermer">
  <form id="patient-form" (submit)="save($event)">
    <kyo-field label="Prénom" required><input kyoInput name="prenom" required autofocus /></kyo-field>
    …
  </form>
  <div kyoDialogFooter>
    <button kyoButton variant="secondary" kyoDialogClose>Annuler</button>
    <button kyoButton type="submit" form="patient-form">Enregistrer</button>
  </div>
</kyo-dialog>`;

  protected readonly confirmCode = `confirm = inject(KyoConfirm);

const ok = await this.confirm.confirm({
  title: 'Supprimer Jeanne Martin ?',
  message: 'Sa fiche, ses documents et ses demandes seront définitivement supprimés.',
  confirmLabel: 'Supprimer',
  cancelLabel: 'Annuler',
  danger: true,
});`;
}
