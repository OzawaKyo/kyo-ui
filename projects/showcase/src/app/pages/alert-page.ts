import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KyoAlert, KyoButton } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-alert-page',
  imports: [DocPage, DocExample, KyoAlert, KyoButton],
  template: `
    <app-doc-page slug="alert">
      <app-doc-example heading="Tons" [code]="tones" [stack]="true">
        <kyo-alert tone="info" title="Maintenance prévue">Le service sera indisponible dimanche de 2h à 4h.</kyo-alert>
        <kyo-alert tone="success" title="Profil enregistré">Vos modifications sont en ligne.</kyo-alert>
        <kyo-alert tone="warning" title="Quota presque atteint">Vous avez utilisé 90 % de votre stockage.</kyo-alert>
        <kyo-alert tone="danger" title="Paiement refusé">Vérifiez les informations de votre carte.</kyo-alert>
        <kyo-alert tone="neutral">Une note neutre, sans titre.</kyo-alert>
      </app-doc-example>

      <app-doc-example heading="Fermable" description="La lib émet dismiss ; le parent décide de retirer l'alerte." [code]="dismissible" [stack]="true">
        @if (visible()) {
          <kyo-alert tone="accent" title="Nouveauté" dismissible dismissLabel="Fermer" (dismiss)="visible.set(false)">
            Le mode compact est disponible dans vos préférences.
          </kyo-alert>
        } @else {
          <button kyoButton variant="secondary" size="sm" (click)="visible.set(true)">Réafficher</button>
        }
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPage {
  protected readonly visible = signal(true);

  protected readonly tones = `<kyo-alert tone="info" title="Maintenance prévue">…</kyo-alert>
<kyo-alert tone="success" title="Profil enregistré">…</kyo-alert>
<kyo-alert tone="warning" title="Quota presque atteint">…</kyo-alert>
<kyo-alert tone="danger" title="Paiement refusé">…</kyo-alert>
<kyo-alert tone="neutral">Une note neutre, sans titre.</kyo-alert>`;

  protected readonly dismissible = `@if (visible()) {
  <kyo-alert tone="accent" title="Nouveauté" dismissible dismissLabel="Fermer" (dismiss)="visible.set(false)">
    Le mode compact est disponible dans vos préférences.
  </kyo-alert>
}`;
}
