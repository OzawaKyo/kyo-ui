import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KyoButton, KyoProgress } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-progress-page',
  imports: [DocPage, DocExample, KyoProgress, KyoButton],
  template: `
    <app-doc-page slug="progress">
      <app-doc-example heading="Déterminée" [code]="determinate" [stack]="true">
        <kyo-progress [value]="sent()" [max]="4" label="Documents envoyés" />
        <div class="example-row">
          <span class="example-status">{{ sent() }} sur 4 envoyés</span>
          <button kyoButton size="sm" variant="secondary" (click)="sent.set((sent() + 1) % 5)">Suivant</button>
        </div>
      </app-doc-example>

      <app-doc-example heading="Indéterminée" description="Durée inconnue : value à null." [code]="indeterminate" [stack]="true">
        <kyo-progress label="Synchronisation" />
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressPage {
  protected readonly sent = signal(1);

  protected readonly determinate = `<kyo-progress [value]="sent()" [max]="4" label="Documents envoyés" />`;
  protected readonly indeterminate = `<kyo-progress label="Synchronisation" />`;
}
