export const PACKAGE_NAME = '@kyo-ui/angular';

export interface ApiEntry {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface TokenEntry {
  name: string;
  default: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  summary: string;
  description: string;
  kind: 'component' | 'directive';
  selector: string;
  exports: string[];
  stylesheet: string;
  inputs: ApiEntry[];
  outputs: ApiEntry[];
  tokens: TokenEntry[];
  a11y: string[];
}

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    slug: 'button',
    name: 'Button',
    summary: 'Déclenche une action ou une navigation.',
    description:
      "S'applique sur un <button> ou un <a> natif : focus, soumission de formulaire et navigation restent ceux du navigateur.",
    kind: 'component',
    selector: 'button[kyoButton], a[kyoButton]',
    exports: ['KyoButton'],
    stylesheet: 'button.css',
    inputs: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'ghost' | 'danger'",
        default: "'primary'",
        description: "Hiérarchie visuelle. Une seule action primaire par zone.",
      },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Hauteur du contrôle, suit la densité.' },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Affiche un spinner, pose aria-busy et ignore les clics sans perdre le focus.',
      },
    ],
    outputs: [],
    tokens: [
      { name: '--kyo-button-height', default: 'var(--kyo-control-height-md)', description: 'Hauteur (sm 2rem · md 2.5rem · lg 3rem).' },
      { name: '--kyo-button-padding-inline', default: 'var(--kyo-space-4)', description: 'Marge horizontale (sm 0.75rem · lg 1.25rem).' },
      { name: '--kyo-button-gap', default: 'var(--kyo-space-2)', description: 'Espace entre icône et libellé.' },
      { name: '--kyo-button-radius', default: 'var(--kyo-radius-control)', description: 'Rayon des coins.' },
      { name: '--kyo-button-font-size', default: 'var(--kyo-text-sm)', description: 'Taille du libellé (lg : text-md).' },
      { name: '--kyo-button-font-weight', default: 'var(--kyo-weight-medium)', description: 'Graisse du libellé.' },
      { name: '--kyo-button-bg', default: 'var(--kyo-accent)', description: 'Fond au repos.' },
      { name: '--kyo-button-bg-hover', default: 'var(--kyo-accent-hover)', description: 'Fond au survol.' },
      { name: '--kyo-button-bg-active', default: 'var(--kyo-accent-active)', description: 'Fond à la pression.' },
      { name: '--kyo-button-fg', default: 'var(--kyo-fg-on-accent)', description: 'Couleur du texte.' },
      { name: '--kyo-button-border-color', default: 'transparent', description: 'Bordure (secondary : border-strong).' },
    ],
    a11y: [
      'Utiliser <button> pour une action et <a href> pour une navigation, jamais un <div>.',
      "Un bouton avec seulement une icône doit avoir un aria-label.",
      'En chargement, le bouton reste focusable (aria-disabled) pour ne pas perdre le focus clavier.',
      'Focus visible au clavier uniquement (:focus-visible), anneau de 2px décalé.',
    ],
  },
  {
    slug: 'badge',
    name: 'Badge',
    summary: 'Étiquette courte pour un statut ou une catégorie.',
    description: "Directive sur n'importe quel élément en ligne. Non interactif.",
    kind: 'directive',
    selector: '[kyoBadge]',
    exports: ['KyoBadge'],
    stylesheet: 'badge.css',
    inputs: [
      {
        name: 'tone',
        type: "'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'",
        default: "'neutral'",
        description: 'Intention sémantique.',
      },
    ],
    outputs: [],
    tokens: [
      { name: '--kyo-badge-height', default: '1.375rem', description: 'Hauteur.' },
      { name: '--kyo-badge-padding-inline', default: 'var(--kyo-space-2)', description: 'Marge horizontale.' },
      { name: '--kyo-badge-radius', default: 'var(--kyo-radius-full)', description: 'Rayon (pilule par défaut).' },
      { name: '--kyo-badge-font-size', default: 'var(--kyo-text-xs)', description: 'Taille du texte.' },
      { name: '--kyo-badge-bg', default: 'var(--kyo-bg-muted)', description: 'Fond, dérivé du ton.' },
      { name: '--kyo-badge-fg', default: 'var(--kyo-fg-muted)', description: 'Texte, dérivé du ton.' },
      { name: '--kyo-badge-border-color', default: 'var(--kyo-border)', description: 'Bordure, dérivée du ton.' },
    ],
    a11y: [
      "La couleur ne doit jamais porter seule l'information : le texte du badge doit suffire.",
      'Les couleurs texte/fond de chaque ton visent un contraste AA (4.5:1).',
    ],
  },
  {
    slug: 'card',
    name: 'Card',
    summary: 'Conteneur qui regroupe un contenu lié.',
    description: 'En-tête et pied optionnels, projetés via les directives kyoCardHeader et kyoCardFooter.',
    kind: 'component',
    selector: 'kyo-card',
    exports: ['KyoCard', 'KyoCardHeader', 'KyoCardFooter'],
    stylesheet: 'card.css',
    inputs: [],
    outputs: [],
    tokens: [
      { name: '--kyo-card-bg', default: 'var(--kyo-surface)', description: 'Fond.' },
      { name: '--kyo-card-fg', default: 'var(--kyo-fg)', description: 'Texte.' },
      { name: '--kyo-card-border-color', default: 'var(--kyo-border)', description: 'Bordure et séparateur du pied.' },
      { name: '--kyo-card-radius', default: 'var(--kyo-radius-container)', description: 'Rayon.' },
      { name: '--kyo-card-padding', default: 'var(--kyo-space-5)', description: 'Marge interne de chaque section.' },
      { name: '--kyo-card-shadow', default: 'var(--kyo-shadow-xs)', description: 'Élévation.' },
    ],
    a11y: [
      "Donner un vrai titre (h2, h3…) dans l'en-tête, au bon niveau dans la page.",
      'Une carte entièrement cliquable doit contenir un seul lien principal, pas être un lien qui englobe des boutons.',
    ],
  },
  {
    slug: 'field',
    name: 'Field & Input',
    summary: 'Champ de saisie avec libellé, aide et erreur.',
    description:
      "kyoInput stylise un <input>, <textarea> ou <select> natif. kyo-field relie libellé, aide et erreur au contrôle. Compatible ngModel, reactive forms et signal forms sans ControlValueAccessor.",
    kind: 'component',
    selector: 'kyo-field · input[kyoInput], textarea[kyoInput], select[kyoInput]',
    exports: ['KyoField', 'KyoInput'],
    stylesheet: 'field.css, input.css',
    inputs: [
      { name: 'label', type: 'string', description: 'kyo-field : libellé, relié au contrôle via for/id.' },
      { name: 'hint', type: 'string', description: "kyo-field : texte d'aide, relié via aria-describedby." },
      { name: 'error', type: 'string | null', description: "kyo-field : message d'erreur, remplace l'aide et pose aria-invalid." },
      { name: 'required', type: 'boolean', default: 'false', description: "kyo-field : affiche l'astérisque. Mettre required sur le contrôle pour la validation." },
      { name: 'id', type: 'string', default: 'auto', description: 'kyoInput : id du contrôle, généré si absent.' },
    ],
    outputs: [],
    tokens: [
      { name: '--kyo-input-height', default: 'var(--kyo-control-height-md)', description: 'Hauteur (sauf textarea).' },
      { name: '--kyo-input-padding-inline', default: 'var(--kyo-space-3)', description: 'Marge horizontale.' },
      { name: '--kyo-input-radius', default: 'var(--kyo-radius-control)', description: 'Rayon.' },
      { name: '--kyo-input-font-size', default: 'var(--kyo-text-sm)', description: 'Taille du texte.' },
      { name: '--kyo-input-bg', default: 'var(--kyo-surface)', description: 'Fond.' },
      { name: '--kyo-input-fg', default: 'var(--kyo-fg)', description: 'Texte.' },
      { name: '--kyo-input-border-color', default: 'var(--kyo-border-strong)', description: 'Bordure (danger si invalide).' },
      { name: '--kyo-input-ring-color', default: 'var(--kyo-focus-ring-color)', description: 'Bordure et halo au focus.' },
      { name: '--kyo-field-gap', default: 'var(--kyo-space-1-5)', description: 'Espace libellé / contrôle / aide.' },
      { name: '--kyo-field-error-color', default: 'var(--kyo-danger-text)', description: "Couleur du message d'erreur." },
    ],
    a11y: [
      'Le libellé est un vrai <label for>, cliquable et lu par les lecteurs d’écran.',
      "L'aide puis l'erreur sont annoncées via aria-describedby, aria-invalid suit l'erreur.",
      "Le placeholder n'est jamais un substitut au libellé.",
      "L'état invalide n'est pas que rouge : le message d'erreur est textuel.",
    ],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    summary: 'Choix binaire ou multiple.',
    description: "Checkbox native stylisée. L'état indéterminé passe par la propriété native [indeterminate].",
    kind: 'directive',
    selector: 'input[type=checkbox][kyoCheckbox] · label[kyoChoice]',
    exports: ['KyoCheckbox', 'KyoChoice'],
    stylesheet: 'checkbox.css, choice.css',
    inputs: [],
    outputs: [],
    tokens: [
      { name: '--kyo-checkbox-size', default: '1rem', description: 'Taille de la case.' },
      { name: '--kyo-checkbox-radius', default: 'var(--kyo-radius-sm)', description: 'Rayon.' },
      { name: '--kyo-checkbox-bg', default: 'var(--kyo-surface)', description: 'Fond décoché.' },
      { name: '--kyo-checkbox-border-color', default: 'var(--kyo-border-strong)', description: 'Bordure décochée.' },
      { name: '--kyo-checkbox-checked-bg', default: 'var(--kyo-accent)', description: 'Fond coché (coche blanche).' },
    ],
    a11y: [
      'Envelopper la case dans <label kyoChoice> : toute la ligne devient cliquable.',
      'Grouper des cases liées dans un <fieldset> avec <legend>.',
      'En mode contraste forcé (Windows), la case native reprend la main.',
    ],
  },
  {
    slug: 'switch',
    name: 'Switch',
    summary: "Active ou désactive un réglage avec effet immédiat.",
    description: 'Checkbox native exposée avec role="switch". Préférer une checkbox si le choix est validé par un bouton.',
    kind: 'directive',
    selector: 'input[type=checkbox][kyoSwitch]',
    exports: ['KyoSwitch', 'KyoChoice'],
    stylesheet: 'switch.css, choice.css',
    inputs: [],
    outputs: [],
    tokens: [
      { name: '--kyo-switch-width', default: '2.25rem', description: 'Largeur du rail.' },
      { name: '--kyo-switch-height', default: '1.25rem', description: 'Hauteur du rail.' },
      { name: '--kyo-switch-inset', default: '2px', description: 'Espace entre rail et pastille.' },
      { name: '--kyo-switch-track', default: 'var(--kyo-border-strong)', description: 'Rail inactif.' },
      { name: '--kyo-switch-track-checked', default: 'var(--kyo-accent)', description: 'Rail actif.' },
      { name: '--kyo-switch-thumb', default: 'var(--kyo-gray-0)', description: 'Pastille.' },
    ],
    a11y: [
      'role="switch" fait annoncer « activé / désactivé » au lieu de « coché ».',
      "Le libellé décrit le réglage (« Notifications »), pas l'action.",
      'Le sens de la pastille suit dir="rtl".',
    ],
  },
  {
    slug: 'alert',
    name: 'Alert',
    summary: 'Message contextuel mis en avant.',
    description: 'Icône, titre et contenu selon le ton. Fermeture optionnelle : la lib émet, le parent décide.',
    kind: 'component',
    selector: 'kyo-alert',
    exports: ['KyoAlert'],
    stylesheet: 'alert.css',
    inputs: [
      { name: 'tone', type: "'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'", default: "'info'", description: 'Intention, pilote icône et couleurs.' },
      { name: 'title', type: 'string', description: 'Titre en gras.' },
      { name: 'dismissible', type: 'boolean', default: 'false', description: 'Affiche le bouton de fermeture.' },
      { name: 'dismissLabel', type: 'string', default: "'Dismiss'", description: 'aria-label du bouton de fermeture (i18n).' },
    ],
    outputs: [{ name: 'dismiss', type: 'void', description: 'Émis au clic sur le bouton de fermeture.' }],
    tokens: [
      { name: '--kyo-alert-padding', default: 'var(--kyo-space-4)', description: 'Marge interne.' },
      { name: '--kyo-alert-radius', default: 'var(--kyo-radius-container)', description: 'Rayon.' },
      { name: '--kyo-alert-bg', default: 'var(--kyo-bg-subtle)', description: 'Fond, dérivé du ton.' },
      { name: '--kyo-alert-fg', default: 'var(--kyo-fg)', description: 'Texte du contenu.' },
      { name: '--kyo-alert-title-color', default: 'var(--kyo-fg)', description: 'Titre, dérivé du ton.' },
      { name: '--kyo-alert-border-color', default: 'var(--kyo-border)', description: 'Bordure, dérivée du ton.' },
      { name: '--kyo-alert-icon-color', default: 'var(--kyo-fg-muted)', description: 'Icône, dérivée du ton.' },
    ],
    a11y: [
      'danger et warning utilisent role="alert" (annonce immédiate), les autres role="status" (annonce polie).',
      'Le bouton de fermeture a un libellé accessible, à traduire via dismissLabel.',
      "Après fermeture, renvoyer le focus à un élément logique si l'alerte l'avait.",
    ],
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    summary: "Indique un chargement en cours.",
    description: 'Hérite de la couleur du texte (currentColor). Ralenti, pas figé, si l’utilisateur réduit les animations.',
    kind: 'component',
    selector: 'kyo-spinner',
    exports: ['KyoSpinner'],
    stylesheet: 'spinner.css',
    inputs: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Diamètre : 1rem · 1.25rem · 2rem.' },
      { name: 'label', type: 'string', default: "'Loading'", description: 'Texte annoncé (role="status"). Chaîne vide = décoratif.' },
    ],
    outputs: [],
    tokens: [
      { name: '--kyo-spinner-size', default: '1.25rem', description: 'Diamètre.' },
      { name: '--kyo-spinner-thickness', default: '2px', description: 'Épaisseur du trait.' },
      { name: '--kyo-spinner-color', default: 'currentColor', description: 'Arc actif.' },
      { name: '--kyo-spinner-track', default: 'currentColor à 20 %', description: 'Rail.' },
      { name: '--kyo-spinner-speed', default: '700ms', description: 'Durée d’un tour (1600ms en mouvement réduit).' },
    ],
    a11y: [
      'Avec un label, le spinner est annoncé via role="status".',
      'Dans un bouton en chargement, il est décoratif : c’est aria-busy du bouton qui informe.',
    ],
  },
];

export function findDoc(slug: string): ComponentDoc {
  const doc = COMPONENT_DOCS.find((d) => d.slug === slug);
  if (!doc) throw new Error(`Unknown component doc: ${slug}`);
  return doc;
}
