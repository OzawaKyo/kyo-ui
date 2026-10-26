import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  KyoAlert,
  KyoAvatar,
  KyoBadge,
  KyoButton,
  KyoCard,
  KyoCardHeader,
  KyoCheckbox,
  KyoChoice,
  KyoChoiceCard,
  KyoDescriptionList,
  KyoEmptyState,
  KyoField,
  KyoFileDrop,
  KyoIcon,
  KyoInput,
  KyoInputGroup,
  KyoList,
  KyoListItem,
  KyoProgress,
  KyoRadio,
  KyoSpinner,
  KyoStepper,
  KyoSwitch,
} from '@kyo-ui/angular';
import { COMPONENT_DOCS, docsByCategory } from '../docs/registry';

@Component({
  selector: 'app-components-index',
  imports: [
    RouterLink,
    KyoAlert,
    KyoAvatar,
    KyoBadge,
    KyoButton,
    KyoCard,
    KyoCardHeader,
    KyoCheckbox,
    KyoChoice,
    KyoChoiceCard,
    KyoDescriptionList,
    KyoEmptyState,
    KyoField,
    KyoFileDrop,
    KyoIcon,
    KyoInput,
    KyoInputGroup,
    KyoList,
    KyoListItem,
    KyoProgress,
    KyoRadio,
    KyoSpinner,
    KyoStepper,
    KyoSwitch,
  ],
  template: `
    <header class="doc__header">
      <h1>Composants</h1>
      <p class="doc__lead">
        {{ total }} composants, tous construits sur les mêmes tokens. Chaque fiche détaille
        l'API, les variables CSS surchargeables et les règles d'accessibilité.
      </p>
    </header>

    @for (group of groups; track group.category) {
      <section class="gallery__group">
        <h2 class="gallery__category">{{ group.category }}</h2>
        <ul class="gallery">
          @for (doc of group.docs; track doc.slug) {
            <li>
              <a class="gallery__item" [routerLink]="doc.slug">
                <div class="gallery__preview" inert>
                  @switch (doc.slug) {
                    @case ('button') {
                      <button kyoButton size="sm"><kyo-icon name="plus" /> Nouveau</button>
                      <button kyoButton size="sm" variant="secondary">Annuler</button>
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
                      <kyo-field label="Email" class="gallery__wide">
                        <input kyoInput placeholder="vous@exemple.fr" />
                      </kyo-field>
                    }
                    @case ('checkbox') {
                      <label kyoChoice><input type="checkbox" kyoCheckbox checked /> Option</label>
                    }
                    @case ('radio') {
                      <label kyoChoice><input type="radio" kyoRadio name="preview" checked /> Oui</label>
                      <label kyoChoice><input type="radio" kyoRadio name="preview" /> Non</label>
                    }
                    @case ('switch') {
                      <label kyoChoice><input type="checkbox" kyoSwitch checked /> Activé</label>
                    }
                    @case ('choice-card') {
                      <label kyoChoiceCard class="gallery__wide">
                        <input type="checkbox" kyoCheckbox checked />
                        <span class="kyo-choice-card__label">Ordonnance</span>
                      </label>
                    }
                    @case ('input-group') {
                      <kyo-input-group class="gallery__wide">
                        <kyo-icon name="search" />
                        <input kyoInput placeholder="Rechercher" />
                      </kyo-input-group>
                    }
                    @case ('file-drop') {
                      <kyo-file-drop class="gallery__wide" label="Déposer un fichier" />
                    }
                    @case ('icon') {
                      <kyo-icon name="users" />
                      <kyo-icon name="file" />
                      <kyo-icon name="send" />
                      <kyo-icon name="settings" />
                    }
                    @case ('avatar') {
                      <kyo-avatar name="Jeanne Martin" size="sm" />
                      <kyo-avatar name="Léo Dubois" />
                      <kyo-avatar name="Inès Moreau" size="lg" />
                    }
                    @case ('description-list') {
                      <dl kyoDescriptionList class="gallery__wide">
                        <dt>Né le</dt>
                        <dd>12/03/2017</dd>
                        <dt>Email</dt>
                        <dd>—</dd>
                      </dl>
                    }
                    @case ('list') {
                      <ul kyoList class="gallery__wide">
                        <li kyoListItem active><kyo-avatar name="Jeanne Martin" size="sm" /> Jeanne Martin</li>
                        <li kyoListItem><kyo-avatar name="Léo Dubois" size="sm" /> Léo Dubois</li>
                      </ul>
                    }
                    @case ('tabs') {
                      <div class="gallery__tabs">
                        <span aria-selected="true">Fiche</span>
                        <span>Documents</span>
                        <span>Demandes</span>
                      </div>
                    }
                    @case ('stepper') {
                      <kyo-stepper class="gallery__wide" [steps]="previewSteps" [current]="1" />
                    }
                    @case ('dialog') {
                      <div class="gallery__dialog">
                        <strong>Supprimer ?</strong>
                        <span>
                          <button kyoButton size="sm" variant="secondary">Annuler</button>
                          <button kyoButton size="sm" variant="danger">Supprimer</button>
                        </span>
                      </div>
                    }
                    @case ('alert') {
                      <kyo-alert tone="success" class="gallery__wide">Enregistré</kyo-alert>
                    }
                    @case ('toast') {
                      <div class="kyo-toast" data-tone="success">
                        <kyo-icon name="check-circle" />
                        <span class="kyo-toast__message">Lien copié</span>
                      </div>
                    }
                    @case ('progress') {
                      <kyo-progress class="gallery__wide" [value]="60" />
                    }
                    @case ('empty-state') {
                      <kyo-empty-state icon="inbox" heading="Aucun document" class="gallery__empty" />
                    }
                    @case ('spinner') {
                      <kyo-spinner label="" />
                      <kyo-spinner size="lg" label="" />
                    }
                  }
                </div>
                <div class="gallery__body">
                  <h3>{{ doc.name }}</h3>
                  <p>{{ doc.summary }}</p>
                </div>
              </a>
            </li>
          }
        </ul>
      </section>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsIndexPage {
  protected readonly total = COMPONENT_DOCS.length;
  protected readonly groups = docsByCategory();
  protected readonly previewSteps = [{ label: 'Infos', done: true }, { label: 'Documents' }];
}
