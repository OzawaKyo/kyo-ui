import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KyoSpinner } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-spinner-page',
  imports: [DocPage, DocExample, KyoSpinner],
  template: `
    <app-doc-page slug="spinner">
      <app-doc-example heading="Tailles" [code]="sizes">
        <kyo-spinner size="sm" />
        <kyo-spinner />
        <kyo-spinner size="lg" />
      </app-doc-example>

      <app-doc-example heading="Couleur héritée" description="Le spinner prend la couleur du texte parent." [code]="color">
        <span class="example-accent"><kyo-spinner label="" /> Synchronisation…</span>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerPage {
  protected readonly sizes = `<kyo-spinner size="sm" />
<kyo-spinner />
<kyo-spinner size="lg" />`;

  protected readonly color = `<span style="color: var(--kyo-accent-text)">
  <kyo-spinner label="" /> Synchronisation…
</span>`;
}
