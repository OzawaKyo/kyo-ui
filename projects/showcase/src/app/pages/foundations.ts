import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Swatch {
  token: string;
  label: string;
}

interface ColorGroup {
  name: string;
  swatches: Swatch[];
}

const tones = ['success', 'warning', 'danger', 'info'] as const;

@Component({
  selector: 'app-foundations',
  template: `
    <header class="doc__header">
      <h1>Fondations</h1>
      <p class="doc__lead">
        Un style épuré : surfaces neutres, un seul accent, bordures fines, ombres discrètes. Tout
        passe par des variables CSS préfixées <code>--kyo-</code>, organisées en trois niveaux.
      </p>
    </header>

    <section class="doc__section">
      <h2>Architecture des tokens</h2>
      <ol class="tiers">
        <li>
          <strong>Primitives</strong>
          <code>--kyo-gray-500</code>, <code>--kyo-brand-600</code>, <code>--kyo-space-4</code>
          <span>Valeurs brutes. Jamais utilisées directement par les composants.</span>
        </li>
        <li>
          <strong>Sémantiques</strong>
          <code>--kyo-fg-muted</code>, <code>--kyo-accent</code>, <code>--kyo-danger-subtle</code>
          <span>Le rôle d'une couleur. C'est ce niveau qui change entre clair et sombre.</span>
        </li>
        <li>
          <strong>Composant</strong>
          <code>--kyo-button-bg</code>, <code>--kyo-card-padding</code>
          <span>Points de personnalisation publics, documentés sur chaque fiche.</span>
        </li>
      </ol>
    </section>

    <section class="doc__section">
      <h2>Principes & problématiques anticipées</h2>
      <div class="principles">
        @for (p of principles; track p.title) {
          <article>
            <h3>{{ p.title }}</h3>
            <p>{{ p.body }}</p>
          </article>
        }
      </div>
    </section>

    <section class="doc__section">
      <h2>Couleurs</h2>
      <p class="doc__note">Valeurs du thème courant : changez le thème dans la barre du haut.</p>
      @for (group of colorGroups; track group.name) {
        <h3 class="foundation__subtitle">{{ group.name }}</h3>
        <ul class="swatches">
          @for (s of group.swatches; track s.token) {
            <li>
              <span class="swatch" [style.background]="'var(' + s.token + ')'"></span>
              <span class="swatch__label">{{ s.label }}</span>
              <code>{{ s.token }}</code>
            </li>
          }
        </ul>
      }
      <h3 class="foundation__subtitle">Palette de marque</h3>
      <ul class="ramp">
        @for (step of brandSteps; track step) {
          <li [style.background]="'var(--kyo-brand-' + step + ')'">
            <span>{{ step }}</span>
          </li>
        }
      </ul>
    </section>

    <section class="doc__section">
      <h2>Typographie</h2>
      <p class="doc__note">
        Police système par défaut (aucune webfont imposée). Tailles en rem pour respecter le zoom
        et la taille de police de l'utilisateur.
      </p>
      <ul class="type-scale">
        @for (t of typeScale; track t.token) {
          <li>
            <code>{{ t.token }} · {{ t.value }}</code>
            <span [style.font-size]="'var(' + t.token + ')'">Une interface claire et sobre</span>
          </li>
        }
      </ul>
    </section>

    <section class="doc__section">
      <h2>Espacements</h2>
      <p class="doc__note">Grille de 4px.</p>
      <ul class="space-scale">
        @for (s of spaceScale; track s.token) {
          <li>
            <code>{{ s.token }}</code>
            <span class="space-scale__bar" [style.inline-size]="'var(' + s.token + ')'"></span>
            <span class="space-scale__value">{{ s.value }}</span>
          </li>
        }
      </ul>
    </section>

    <section class="doc__section">
      <h2>Rayons & élévation</h2>
      <ul class="tiles">
        @for (r of radii; track r) {
          <li>
            <span class="tile" [style.border-radius]="'var(--kyo-radius-' + r + ')'"></span>
            <code>--kyo-radius-{{ r }}</code>
          </li>
        }
      </ul>
      <ul class="tiles">
        @for (s of shadows; track s) {
          <li>
            <span class="tile tile--raised" [style.box-shadow]="'var(--kyo-shadow-' + s + ')'"></span>
            <code>--kyo-shadow-{{ s }}</code>
          </li>
        }
      </ul>
    </section>

    <section class="doc__section">
      <h2>Contrôles, mouvement, empilement</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Token</th><th>Valeur</th><th>Usage</th></tr>
          </thead>
          <tbody>
            @for (row of misc; track row.token) {
              <tr>
                <td><code>{{ row.token }}</code></td>
                <td><code>{{ row.value }}</code></td>
                <td>{{ row.usage }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoundationsPage {
  protected readonly principles = [
    {
      title: 'Surcharge sans guerre de spécificité',
      body: "Tout le CSS est dans la cascade layer « kyo ». N'importe quel style de l'application, même un simple sélecteur de classe, l'emporte. Tailwind ou d'autres layers déclarés après aussi.",
    },
    {
      title: 'CSS livré à part des composants',
      body: "Les styles sont des fichiers .css de la lib, pas des styles Angular encapsulés : pas d'injection runtime, compatible SSR, utilisable sur des directives et des éléments natifs, et importable composant par composant.",
    },
    {
      title: 'Clair / sombre natif',
      body: "Chaque couleur sémantique utilise light-dark(). Le thème suit l'OS par défaut, se force avec data-kyo-theme sur <html> ou sur n'importe quel sous-arbre.",
    },
    {
      title: 'Rebranding en une variable',
      body: 'Les états (hover, fonds subtils, bordures teintées) sont dérivés par color-mix(). Changer --kyo-brand-* ou --kyo-accent suffit à rethémer la lib.',
    },
    {
      title: 'Densité',
      body: 'Les hauteurs de contrôle sont des tokens résolus localement : data-kyo-density="compact" sur un tableau ou une sidebar suffit à la resserrer.',
    },
    {
      title: 'RTL',
      body: 'Uniquement des propriétés logiques (padding-inline, margin-inline-start…). Les rares cas non logiques (chevron du select, pastille du switch) passent par :dir(rtl).',
    },
    {
      title: 'Accessibilité par défaut',
      body: "Éléments natifs d'abord, focus visible au clavier, contrastes AA visés, prefers-reduced-motion respecté, mode contraste forcé de Windows pris en compte.",
    },
    {
      title: 'Formulaires sans adaptateur',
      body: 'Input, checkbox et switch sont des éléments natifs stylés : ngModel, reactive forms et signal forms fonctionnent sans ControlValueAccessor à maintenir.',
    },
    {
      title: 'Préparé pour les overlays',
      body: "Une échelle de z-index est réservée dès maintenant (dropdown → tooltip) pour que menus, modales et toasts futurs ne se chevauchent jamais mal.",
    },
    {
      title: 'Pas de collision de noms',
      body: 'Classes .kyo-*, variables --kyo-*, sélecteurs kyo-* / [kyo*] et exports TypeScript préfixés Kyo (KyoButton, KyoInput) pour cohabiter avec le code de l’application.',
    },
  ];

  protected readonly colorGroups: ColorGroup[] = [
    {
      name: 'Surfaces',
      swatches: [
        { token: '--kyo-bg', label: 'Fond de page' },
        { token: '--kyo-bg-subtle', label: 'Fond discret' },
        { token: '--kyo-bg-muted', label: 'Fond appuyé' },
        { token: '--kyo-surface', label: 'Surface' },
        { token: '--kyo-surface-raised', label: 'Surface surélevée' },
      ],
    },
    {
      name: 'Texte & bordures',
      swatches: [
        { token: '--kyo-fg', label: 'Texte' },
        { token: '--kyo-fg-muted', label: 'Texte secondaire' },
        { token: '--kyo-fg-subtle', label: 'Placeholder' },
        { token: '--kyo-fg-disabled', label: 'Désactivé' },
        { token: '--kyo-border', label: 'Bordure' },
        { token: '--kyo-border-strong', label: 'Bordure forte' },
      ],
    },
    {
      name: 'Accent',
      swatches: [
        { token: '--kyo-accent', label: 'Accent' },
        { token: '--kyo-accent-hover', label: 'Survol' },
        { token: '--kyo-accent-active', label: 'Pression' },
        { token: '--kyo-accent-text', label: 'Texte accent' },
        { token: '--kyo-accent-subtle', label: 'Fond accent' },
        { token: '--kyo-focus-ring-color', label: 'Anneau de focus' },
      ],
    },
    ...tones.map((tone) => ({
      name: tone.charAt(0).toUpperCase() + tone.slice(1),
      swatches: [
        { token: `--kyo-${tone}`, label: 'Base' },
        { token: `--kyo-${tone}-text`, label: 'Texte' },
        { token: `--kyo-${tone}-subtle`, label: 'Fond' },
        { token: `--kyo-${tone}-border`, label: 'Bordure' },
      ],
    })),
  ];

  protected readonly brandSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  protected readonly typeScale = [
    { token: '--kyo-text-4xl', value: '2.25rem' },
    { token: '--kyo-text-3xl', value: '1.875rem' },
    { token: '--kyo-text-2xl', value: '1.5rem' },
    { token: '--kyo-text-xl', value: '1.25rem' },
    { token: '--kyo-text-lg', value: '1.125rem' },
    { token: '--kyo-text-md', value: '1rem' },
    { token: '--kyo-text-sm', value: '0.875rem' },
    { token: '--kyo-text-xs', value: '0.75rem' },
  ];

  protected readonly spaceScale = [
    ['1', '0.25rem'],
    ['2', '0.5rem'],
    ['3', '0.75rem'],
    ['4', '1rem'],
    ['5', '1.25rem'],
    ['6', '1.5rem'],
    ['8', '2rem'],
    ['10', '2.5rem'],
    ['12', '3rem'],
    ['16', '4rem'],
  ].map(([step, value]) => ({ token: `--kyo-space-${step}`, value }));

  protected readonly radii = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];
  protected readonly shadows = ['xs', 'sm', 'md', 'lg'];

  protected readonly misc = [
    { token: '--kyo-control-height-sm', value: '2rem (compact 1.75rem)', usage: 'Boutons et champs sm' },
    { token: '--kyo-control-height-md', value: '2.5rem (compact 2rem)', usage: 'Taille par défaut' },
    { token: '--kyo-control-height-lg', value: '3rem (compact 2.5rem)', usage: 'Boutons lg' },
    { token: '--kyo-radius-control', value: 'var(--kyo-radius-md)', usage: 'Boutons, champs' },
    { token: '--kyo-radius-container', value: 'var(--kyo-radius-lg)', usage: 'Cartes, alertes' },
    { token: '--kyo-duration-fast', value: '100ms', usage: 'Survol, couleurs (0ms si mouvement réduit)' },
    { token: '--kyo-duration-normal', value: '150ms', usage: 'Bascules' },
    { token: '--kyo-duration-slow', value: '250ms', usage: 'Entrées/sorties d’overlays' },
    { token: '--kyo-ease-standard', value: 'cubic-bezier(0.2, 0, 0, 1)', usage: 'Courbe par défaut' },
    { token: '--kyo-z-dropdown', value: '1000', usage: 'Menus, listes déroulantes' },
    { token: '--kyo-z-sticky', value: '1100', usage: 'En-têtes collants' },
    { token: '--kyo-z-modal', value: '1300', usage: 'Dialogues' },
    { token: '--kyo-z-toast', value: '1500', usage: 'Notifications' },
    { token: '--kyo-z-tooltip', value: '1600', usage: 'Infobulles, toujours au-dessus' },
  ];
}
