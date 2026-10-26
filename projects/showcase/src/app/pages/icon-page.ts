import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KYO_DEFAULT_ICONS, KyoIcon } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-icon-page',
  imports: [DocPage, DocExample, KyoIcon],
  template: `
    <app-doc-page slug="icon">
      <app-doc-example heading="Jeu par défaut" description="Icônes Lucide incluses dans la lib." [code]="basic">
        <ul class="icon-grid">
          @for (name of names; track name) {
            <li><kyo-icon [name]="name" /><code>{{ name }}</code></li>
          }
        </ul>
      </app-doc-example>

      <app-doc-example heading="Taille et couleur" description="La taille suit le texte, la couleur hérite de currentColor." [code]="sizing">
        <kyo-icon name="users" [size]="16" />
        <kyo-icon name="users" />
        <kyo-icon name="users" size="2rem" />
        <span class="example-accent"><kyo-icon name="check-circle" label="Validé" /> Validé</span>
      </app-doc-example>

      <app-doc-example heading="Ajouter des icônes" [code]="extend">
        <span class="example-status">Déclarer ses propres icônes au niveau de l'application ou d'une route.</span>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPage {
  protected readonly names = Object.keys(KYO_DEFAULT_ICONS);

  protected readonly basic = `<kyo-icon name="search" />`;

  protected readonly sizing = `<kyo-icon name="users" [size]="16" />
<kyo-icon name="users" />
<kyo-icon name="users" size="2rem" />
<kyo-icon name="check-circle" label="Validé" />`;

  protected readonly extend = `// app.config.ts
providers: [
  provideKyoIcons({
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  }),
]`;
}
