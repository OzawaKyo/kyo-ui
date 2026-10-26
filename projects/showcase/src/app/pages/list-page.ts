import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KyoAvatar, KyoBadge, KyoButton, KyoIcon, KyoList, KyoListItem } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-list-page',
  imports: [DocPage, DocExample, KyoList, KyoListItem, KyoAvatar, KyoBadge, KyoButton, KyoIcon],
  template: `
    <app-doc-page slug="list">
      <app-doc-example heading="Liste sélectionnable" description="Comme la liste des patients : une ligne courante." [code]="selectable" [stack]="true">
        <ul kyoList class="example-field">
          @for (patient of patients; track patient.name) {
            <li>
              <button kyoListItem [active]="selected() === patient.name" (click)="selected.set(patient.name)">
                <kyo-avatar [name]="patient.name" size="sm" />
                <span class="kyo-list-item__content">
                  <span class="kyo-list-item__title">{{ patient.name }}</span>
                  <span class="kyo-list-item__description">{{ patient.meta }}</span>
                </span>
                @if (patient.pending) {
                  <span kyoBadge tone="warning">En attente</span>
                }
              </button>
            </li>
          }
        </ul>
      </app-doc-example>

      <app-doc-example heading="Lignes avec actions" description="Liste séparée, comme les documents d'un patient." [code]="actions" [stack]="true">
        <ul kyoList divided class="example-field">
          @for (doc of documents; track doc.name) {
            <li kyoListItem>
              <kyo-icon name="file" />
              <span class="kyo-list-item__content">
                <span class="kyo-list-item__title">{{ doc.name }}</span>
                <span class="kyo-list-item__description">{{ doc.meta }}</span>
              </span>
              <span class="kyo-list-item__actions">
                <button kyoButton variant="ghost" size="sm" iconOnly [attr.aria-label]="'Télécharger ' + doc.name"><kyo-icon name="download" /></button>
                <button kyoButton variant="ghost" size="sm" iconOnly [attr.aria-label]="'Supprimer ' + doc.name"><kyo-icon name="trash" /></button>
              </span>
            </li>
          }
        </ul>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPage {
  protected readonly selected = signal('Léo Dubois');
  protected readonly patients = [
    { name: 'Jeanne Martin', meta: '9 ans · 3 documents', pending: false },
    { name: 'Léo Dubois', meta: '6 ans · 1 document', pending: true },
    { name: 'Inès Moreau', meta: '11 ans · 5 documents', pending: false },
  ];
  protected readonly documents = [
    { name: 'Ordonnance.pdf', meta: '12/10/2026 · Envoyé par le patient' },
    { name: 'Bilan-2025.pdf', meta: '04/09/2025 · Ajouté par le cabinet' },
  ];

  protected readonly selectable = `<ul kyoList>
  <li>
    <button kyoListItem [active]="selected() === patient.id" (click)="select(patient)">
      <kyo-avatar [name]="patient.name" size="sm" />
      <span class="kyo-list-item__content">
        <span class="kyo-list-item__title">{{ patient.name }}</span>
        <span class="kyo-list-item__description">9 ans · 3 documents</span>
      </span>
    </button>
  </li>
</ul>`;

  protected readonly actions = `<ul kyoList divided>
  <li kyoListItem>
    <kyo-icon name="file" />
    <span class="kyo-list-item__content">…</span>
    <span class="kyo-list-item__actions">
      <button kyoButton variant="ghost" size="sm" iconOnly aria-label="Télécharger"><kyo-icon name="download" /></button>
    </span>
  </li>
</ul>`;
}
