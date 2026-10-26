import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { KyoButton, KyoDialog, KyoToast } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-toast-page',
  imports: [DocPage, DocExample, KyoButton, KyoDialog],
  template: `
    <app-doc-page slug="toast">
      <app-doc-example heading="Tons" [code]="tones">
        <button kyoButton variant="secondary" (click)="toast.success('Patient enregistré')">Succès</button>
        <button kyoButton variant="secondary" (click)="toast.error('L’envoi n’a pas fonctionné.')">Erreur</button>
        <button kyoButton variant="secondary" (click)="toast.show('Lien copié')">Neutre</button>
        <button kyoButton variant="secondary" (click)="toast.show('Synchronisation terminée', { tone: 'info', duration: 5000 })">Info</button>
      </app-doc-example>

      <app-doc-example heading="Au-dessus d'une modale" description="Le toast reste visible et cliquable même avec une modale ouverte." [code]="overDialog">
        <button kyoButton (click)="dialogOpen.set(true)">Ouvrir une modale</button>
        <kyo-dialog [(open)]="dialogOpen" heading="Lien prêt à envoyer" size="sm">
          <button kyoButton (click)="toast.success('Lien copié')">Copier le lien</button>
        </kyo-dialog>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastPage {
  protected readonly toast = inject(KyoToast);
  protected readonly dialogOpen = signal(false);

  protected readonly tones = `toast = inject(KyoToast);

this.toast.success('Patient enregistré');
this.toast.error('L’envoi n’a pas fonctionné.');
this.toast.show('Lien copié');
this.toast.show('Synchronisation terminée', { tone: 'info', duration: 5000 });`;

  protected readonly overDialog = `<kyo-dialog [(open)]="open" heading="Lien prêt à envoyer">
  <button kyoButton (click)="toast.success('Lien copié')">Copier le lien</button>
</kyo-dialog>`;
}
