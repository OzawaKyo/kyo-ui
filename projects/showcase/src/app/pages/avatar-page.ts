import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KyoAvatar } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

/** Inline placeholder photo, so the showcase has no binary asset. */
const PHOTO =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#c7d2fe"/><circle cx="32" cy="25" r="12" fill="#6366f1"/><path d="M10 64a22 22 0 0 1 44 0z" fill="#6366f1"/></svg>',
  );

@Component({
  selector: 'app-avatar-page',
  imports: [DocPage, DocExample, KyoAvatar],
  template: `
    <app-doc-page slug="avatar">
      <app-doc-example heading="Tailles" [code]="sizes">
        <kyo-avatar name="Jeanne Martin" size="sm" />
        <kyo-avatar name="Jeanne Martin" />
        <kyo-avatar name="Jeanne Martin" size="lg" />
      </app-doc-example>

      <app-doc-example heading="Photo et repli" description="La photo remplace les initiales ; si elle ne charge pas, les initiales reviennent. Sans nom visible à côté, passez decorative à false pour que le nom soit lu." [code]="photoCode">
        <kyo-avatar name="Jeanne Martin" [src]="photo" [decorative]="false" />
        <kyo-avatar name="Léo Dubois" src="/introuvable.jpg" [decorative]="false" />
      </app-doc-example>

      <app-doc-example heading="Avec le nom" description="Cas courant : l'avatar est décoratif, le nom est lu." [code]="withName">
        <span class="example-person">
          <kyo-avatar name="Léo Dubois" />
          <span>Léo Dubois</span>
        </span>
      </app-doc-example>

      <app-doc-example heading="Forme carrée" description="Via le token --kyo-avatar-radius." [code]="square">
        <kyo-avatar name="Cabinet Psychomot" style="--kyo-avatar-radius: var(--kyo-radius-lg)" />
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPage {
  protected readonly sizes = `<kyo-avatar name="Jeanne Martin" size="sm" />
<kyo-avatar name="Jeanne Martin" />
<kyo-avatar name="Jeanne Martin" size="lg" />`;

  protected readonly photo = PHOTO;
  protected readonly photoCode = `<kyo-avatar name="Jeanne Martin" [src]="patient.photoUrl" />

<!-- Seul, sans nom affiché à côté : l'avatar porte le nom -->
<kyo-avatar name="Jeanne Martin" [src]="patient.photoUrl" [decorative]="false" />`;

  protected readonly withName = `<kyo-avatar name="Léo Dubois" />
<span>Léo Dubois</span>`;

  protected readonly square = `<kyo-avatar name="Cabinet" style="--kyo-avatar-radius: var(--kyo-radius-lg)" />`;
}
