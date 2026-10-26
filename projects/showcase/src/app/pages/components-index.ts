import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  KyoAlert,
  KyoBadge,
  KyoButton,
  KyoCard,
  KyoCheckbox,
  KyoChoice,
  KyoField,
  KyoInput,
  KyoSpinner,
  KyoSwitch,
} from '@kyo-ui/angular';
import { COMPONENT_DOCS } from '../docs/registry';

@Component({
  selector: 'app-components-index',
  imports: [
    RouterLink,
    KyoAlert,
    KyoBadge,
    KyoButton,
    KyoCard,
    KyoCheckbox,
    KyoChoice,
    KyoField,
    KyoInput,
    KyoSpinner,
    KyoSwitch,
  ],
  template: `
    <header class="doc__header">
      <h1>Composants</h1>
      <p class="doc__lead">
        {{ docs.length }} composants, tous construits sur les mêmes tokens. Chaque fiche détaille
        l'API, les variables CSS surchargeables et les règles d'accessibilité.
      </p>
    </header>

    <ul class="gallery">
      @for (doc of docs; track doc.slug) {
        <li>
          <a class="gallery__item" [routerLink]="doc.slug">
            <div class="gallery__preview" inert>
              @switch (doc.slug) {
                @case ('button') {
                  <button kyoButton size="sm">Primary</button>
                  <button kyoButton size="sm" variant="secondary">Secondary</button>
                }
                @case ('badge') {
                  <span kyoBadge tone="success">Actif</span>
                  <span kyoBadge tone="warning">En attente</span>
                  <span kyoBadge>Brouillon</span>
                }
                @case ('card') {
                  <kyo-card class="gallery__card">
                    <div kyoCardHeader><h3>Titre</h3></div>
                    <span class="gallery__muted">Contenu</span>
                  </kyo-card>
                }
                @case ('field') {
                  <kyo-field label="Email" class="gallery__field">
                    <input kyoInput placeholder="vous@exemple.fr" tabindex="-1" />
                  </kyo-field>
                }
                @case ('checkbox') {
                  <label kyoChoice><input type="checkbox" kyoCheckbox checked tabindex="-1" /> Option</label>
                }
                @case ('switch') {
                  <label kyoChoice><input type="checkbox" kyoSwitch checked tabindex="-1" /> Activé</label>
                }
                @case ('alert') {
                  <kyo-alert tone="success" class="gallery__alert">Enregistré</kyo-alert>
                }
                @case ('spinner') {
                  <kyo-spinner label="" />
                  <kyo-spinner size="lg" label="" />
                }
              }
            </div>
            <div class="gallery__body">
              <h2>{{ doc.name }}</h2>
              <p>{{ doc.summary }}</p>
            </div>
          </a>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsIndexPage {
  protected readonly docs = COMPONENT_DOCS;
}
