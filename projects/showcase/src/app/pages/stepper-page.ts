import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { KyoButton, KyoStep, KyoStepper } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-stepper-page',
  imports: [DocPage, DocExample, KyoStepper, KyoButton],
  template: `
    <app-doc-page slug="stepper">
      <app-doc-example heading="Parcours patient" description="L'étape 2 se débloque une fois l'étape 1 terminée." [code]="basic" [stack]="true">
        <kyo-stepper [steps]="steps()" [(current)]="current" label="Étapes" doneLabel="terminée" />
        <div class="example-row">
          @if (current() === 0) {
            <button kyoButton (click)="finishForm()">Valider mes informations</button>
          } @else {
            <button kyoButton variant="secondary" (click)="reset()">Recommencer</button>
          }
        </div>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperPage {
  protected readonly current = signal(0);
  private readonly formDone = signal(false);
  protected readonly steps = computed<KyoStep[]>(() => [
    { label: 'Vos informations', done: this.formDone() },
    { label: 'Vos documents', disabled: !this.formDone() },
  ]);

  protected finishForm(): void {
    this.formDone.set(true);
    this.current.set(1);
  }

  protected reset(): void {
    this.formDone.set(false);
    this.current.set(0);
  }

  protected readonly basic = `steps = computed<KyoStep[]>(() => [
  { label: 'Vos informations', done: this.formDone() },
  { label: 'Vos documents', disabled: !this.formDone() },
]);

<kyo-stepper [steps]="steps()" [(current)]="current" label="Étapes" doneLabel="terminée" />`;
}
