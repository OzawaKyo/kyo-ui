import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KyoChoice, KyoRadio } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-radio-page',
  imports: [DocPage, DocExample, KyoRadio, KyoChoice],
  template: `
    <app-doc-page slug="radio">
      <app-doc-example heading="Oui / Non" [code]="yesNo" [stack]="true">
        <fieldset class="example-fieldset">
          <legend>Suivi orthophonique en cours ?</legend>
          <label kyoChoice><input type="radio" kyoRadio name="ortho" value="oui" (change)="answer.set('Oui')" /> Oui</label>
          <label kyoChoice><input type="radio" kyoRadio name="ortho" value="non" (change)="answer.set('Non')" /> Non</label>
        </fieldset>
        <span class="example-status">Réponse : {{ answer() ?? '—' }}</span>
      </app-doc-example>

      <app-doc-example heading="États" [code]="states">
        <label kyoChoice><input type="radio" kyoRadio name="etat" /> Libre</label>
        <label kyoChoice><input type="radio" kyoRadio name="etat" checked /> Sélectionné</label>
        <label kyoChoice><input type="radio" kyoRadio name="etat-off" disabled /> Désactivé</label>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioPage {
  protected readonly answer = signal<string | null>(null);

  protected readonly yesNo = `<fieldset>
  <legend>Suivi orthophonique en cours ?</legend>
  <label kyoChoice><input type="radio" kyoRadio name="ortho" value="oui" /> Oui</label>
  <label kyoChoice><input type="radio" kyoRadio name="ortho" value="non" /> Non</label>
</fieldset>`;

  protected readonly states = `<input type="radio" kyoRadio name="etat" />
<input type="radio" kyoRadio name="etat" checked />
<input type="radio" kyoRadio disabled />`;
}
