import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KyoChoice, KyoSwitch } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-switch-page',
  imports: [DocPage, DocExample, KyoSwitch, KyoChoice],
  template: `
    <app-doc-page slug="switch">
      <app-doc-example heading="États" [code]="states">
        <label kyoChoice><input type="checkbox" kyoSwitch /> Inactif</label>
        <label kyoChoice><input type="checkbox" kyoSwitch checked /> Actif</label>
        <label kyoChoice><input type="checkbox" kyoSwitch disabled /> Désactivé</label>
      </app-doc-example>

      <app-doc-example heading="Effet immédiat" description="Le réglage s'applique dès la bascule, sans bouton de validation." [code]="live">
        <label kyoChoice>
          <input type="checkbox" kyoSwitch [checked]="wifi()" (change)="wifi.set(!wifi())" />
          Wi-Fi
        </label>
        <span class="example-status">{{ wifi() ? 'Connecté' : 'Déconnecté' }}</span>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchPage {
  protected readonly wifi = signal(true);

  protected readonly states = `<label kyoChoice><input type="checkbox" kyoSwitch /> Inactif</label>
<label kyoChoice><input type="checkbox" kyoSwitch checked /> Actif</label>
<label kyoChoice><input type="checkbox" kyoSwitch disabled /> Désactivé</label>`;

  protected readonly live = `<label kyoChoice>
  <input type="checkbox" kyoSwitch [checked]="wifi()" (change)="wifi.set(!wifi())" />
  Wi-Fi
</label>`;
}
