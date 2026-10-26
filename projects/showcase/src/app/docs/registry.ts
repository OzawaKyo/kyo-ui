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

export const CATEGORIES = [
  'Actions',
  'Formulaires',
  'Affichage',
  'Navigation',
  'Retour utilisateur',
  'Superpositions',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface ComponentDoc {
  slug: string;
  category: Category;
  name: string;
  summary: string;
  description: string;
  kind: 'component' | 'directive' | 'service';
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
    category: 'Actions',
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
        type: "'primary' | 'secondary' | 'ghost' | 'danger' | 'link'",
        default: "'primary'",
        description: "Hiérarchie visuelle. Une seule action primaire par zone. link : bouton à l'apparence d'un lien.",
      },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Hauteur du contrôle, suit la densité.' },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Affiche un spinner, pose aria-busy et ignore les clics sans perdre le focus.',
      },
      { name: 'iconOnly', type: 'boolean', default: 'false', description: 'Bouton carré ne contenant qu’une icône. aria-label obligatoire.' },
      { name: 'block', type: 'boolean', default: 'false', description: 'Occupe toute la largeur disponible.' },
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
      'Un bouton iconOnly doit avoir un aria-label ; les kyo-icon à l’intérieur restent décoratives.',
      'En chargement, le bouton reste focusable (aria-disabled) pour ne pas perdre le focus clavier.',
      'Focus visible au clavier uniquement (:focus-visible), anneau de 2px décalé.',
    ],
  },
  {
    slug: 'badge',
    category: 'Affichage',
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
    category: 'Affichage',
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
    category: 'Formulaires',
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
      { name: '--kyo-select-picker-bg', default: 'var(--kyo-surface-raised)', description: 'Select : fond de la liste d’options.' },
      { name: '--kyo-select-picker-radius', default: 'var(--kyo-radius-lg)', description: 'Select : rayon de la liste.' },
      { name: '--kyo-select-picker-shadow', default: 'var(--kyo-shadow-lg)', description: 'Select : élévation de la liste.' },
      { name: '--kyo-select-picker-max-height', default: '18rem', description: 'Select : hauteur max avant défilement.' },
      { name: '--kyo-select-option-hover-bg', default: 'var(--kyo-bg-subtle)', description: 'Select : option survolée ou au clavier.' },
      { name: '--kyo-select-option-selected-fg', default: 'var(--kyo-accent-text)', description: 'Select : option choisie (avec coche).' },
      { name: '--kyo-field-gap', default: 'var(--kyo-space-1-5)', description: 'Espace libellé / contrôle / aide.' },
      { name: '--kyo-field-error-color', default: 'var(--kyo-danger-text)', description: "Couleur du message d'erreur." },
    ],
    a11y: [
      'Le libellé est un vrai <label for>, cliquable et lu par les lecteurs d’écran.',
      "L'aide puis l'erreur sont annoncées via aria-describedby, aria-invalid suit l'erreur.",
      "Le placeholder n'est jamais un substitut au libellé.",
      "L'état invalide n'est pas que rouge : le message d'erreur est textuel.",
      'La liste du select est stylée en CSS (appearance: base-select) sans remplacer le select natif : navigation clavier, saisie pour chercher et lecteurs d’écran restent ceux du navigateur.',
    ],
  },
  {
    slug: 'checkbox',
    category: 'Formulaires',
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
    category: 'Formulaires',
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
    category: 'Retour utilisateur',
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
    category: 'Retour utilisateur',
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
  {
    slug: 'icon',
    category: 'Affichage',
    name: 'Icon',
    summary: 'Pictogramme vectoriel issu d’un registre.',
    description:
      "Jeu Lucide par défaut (trait 2px), extensible avec provideKyoIcons(). La taille suit le texte (1.25em) et la couleur hérite de currentColor.",
    kind: 'component',
    selector: 'kyo-icon',
    exports: ['KyoIcon', 'provideKyoIcons', 'KYO_ICONS', 'KYO_DEFAULT_ICONS'],
    stylesheet: 'icon.css',
    inputs: [
      { name: 'name', type: 'string', description: 'Nom de l’icône dans le registre (requis).' },
      { name: 'size', type: 'number | string', default: '1.25em', description: 'Nombre en px ou longueur CSS.' },
      { name: 'label', type: 'string', description: 'Rend l’icône porteuse de sens (role="img"). Vide = décorative.' },
    ],
    outputs: [],
    tokens: [{ name: '--kyo-icon-size', default: '1.25em', description: 'Côté de l’icône.' }],
    a11y: [
      'Décorative par défaut (aria-hidden) : le texte voisin porte le sens.',
      'Une icône seule qui informe (statut, alerte) doit recevoir un label.',
      'Le registre n’accepte que des constantes du code : son SVG est injecté sans nettoyage.',
    ],
  },
  {
    slug: 'radio',
    category: 'Formulaires',
    name: 'Radio',
    summary: 'Choix unique parmi quelques options.',
    description: 'Bouton radio natif stylisé, combinable avec uiChoice ou une choice card.',
    kind: 'directive',
    selector: 'input[type=radio][kyoRadio]',
    exports: ['KyoRadio', 'KyoChoice'],
    stylesheet: 'radio.css, choice.css',
    inputs: [],
    outputs: [],
    tokens: [
      { name: '--kyo-radio-size', default: '1rem', description: 'Diamètre.' },
      { name: '--kyo-radio-bg', default: 'var(--kyo-surface)', description: 'Fond non sélectionné.' },
      { name: '--kyo-radio-border-color', default: 'var(--kyo-border-strong)', description: 'Bordure non sélectionnée.' },
      { name: '--kyo-radio-checked-bg', default: 'var(--kyo-accent)', description: 'Fond sélectionné.' },
      { name: '--kyo-radio-dot', default: 'var(--kyo-fg-on-accent)', description: 'Pastille centrale.' },
    ],
    a11y: [
      'Même name sur tout le groupe : les flèches du clavier passent d’une option à l’autre.',
      'Grouper dans un <fieldset> avec <legend> qui pose la question.',
    ],
  },
  {
    slug: 'choice-card',
    category: 'Formulaires',
    name: 'Choice card',
    summary: 'Option cochable présentée comme une carte.',
    description:
      "Un <label> qui contient une checkbox ou une radio : toute la carte est cliquable et se met en évidence quand l’option est choisie.",
    kind: 'directive',
    selector: 'label[kyoChoiceCard]',
    exports: ['KyoChoiceCard'],
    stylesheet: 'choice-card.css',
    inputs: [],
    outputs: [],
    tokens: [
      { name: '--kyo-choice-card-padding', default: 'var(--kyo-space-3) var(--kyo-space-4)', description: 'Marge interne.' },
      { name: '--kyo-choice-card-radius', default: 'var(--kyo-radius-control)', description: 'Rayon.' },
      { name: '--kyo-choice-card-bg', default: 'var(--kyo-surface)', description: 'Fond au repos.' },
      { name: '--kyo-choice-card-border-color', default: 'var(--kyo-border-strong)', description: 'Bordure au repos.' },
      { name: '--kyo-choice-card-checked-bg', default: 'var(--kyo-accent-subtle)', description: 'Fond sélectionné.' },
      { name: '--kyo-choice-card-checked-border-color', default: 'var(--kyo-accent)', description: 'Bordure sélectionnée.' },
    ],
    a11y: [
      'Le contrôle reste natif : clavier, formulaires et lecteurs d’écran fonctionnent sans effort.',
      'L’anneau de focus est porté par la carte entière.',
    ],
  },
  {
    slug: 'input-group',
    category: 'Formulaires',
    name: 'Input group',
    summary: 'Champ avec icône ou bouton intégré.',
    description:
      "Dessine un input et ses compléments (icône de recherche, bouton Copier…) comme un seul champ. Fonctionne dans un kyo-field.",
    kind: 'component',
    selector: 'kyo-input-group',
    exports: ['KyoInputGroup'],
    stylesheet: 'input-group.css',
    inputs: [],
    outputs: [],
    tokens: [
      { name: '--kyo-input-group-height', default: 'var(--kyo-control-height-md)', description: 'Hauteur.' },
      { name: '--kyo-input-group-radius', default: 'var(--kyo-radius-control)', description: 'Rayon.' },
      { name: '--kyo-input-group-bg', default: 'var(--kyo-surface)', description: 'Fond.' },
      { name: '--kyo-input-group-border-color', default: 'var(--kyo-border-strong)', description: 'Bordure (danger si invalide).' },
      { name: '--kyo-input-group-ring-color', default: 'var(--kyo-focus-ring-color)', description: 'Bordure et halo au focus du champ.' },
    ],
    a11y: [
      'L’icône est décorative : le champ garde son propre libellé.',
      'Un bouton intégré doit avoir un texte ou un aria-label explicite.',
    ],
  },
  {
    slug: 'file-drop',
    category: 'Formulaires',
    name: 'File drop',
    summary: 'Sélection de fichiers par clic ou glisser-déposer.',
    description:
      "Valide le type (même syntaxe que accept, appliquée aussi au dépôt) et la taille, puis émet. L’envoi reste à la charge de l’application, qui passe busy pendant ce temps.",
    kind: 'component',
    selector: 'kyo-file-drop',
    exports: ['KyoFileDrop', 'KyoFileRejection', 'matchesAccept'],
    stylesheet: 'file-drop.css',
    inputs: [
      { name: 'accept', type: 'string', default: "''", description: 'Types acceptés, ex. "image/*,.pdf".' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Autorise plusieurs fichiers.' },
      { name: 'maxSize', type: 'number', description: 'Taille maximale par fichier, en octets.' },
      { name: 'busy', type: 'boolean', default: 'false', description: 'Affiche un spinner et bloque la zone.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Désactive la zone.' },
      { name: 'label', type: 'string', default: "'Drop a file here…'", description: 'Texte de la zone (ou contenu projeté).' },
      { name: 'hint', type: 'string', description: 'Contraintes affichées sous le texte.' },
    ],
    outputs: [
      { name: 'filesSelected', type: 'File[]', description: 'Fichiers valides.' },
      { name: 'filesRejected', type: 'KyoFileRejection[]', description: "Fichiers refusés, avec la raison 'type' ou 'size'." },
    ],
    tokens: [
      { name: '--kyo-file-drop-padding', default: 'var(--kyo-space-6) var(--kyo-space-4)', description: 'Marge interne.' },
      { name: '--kyo-file-drop-radius', default: 'var(--kyo-radius-container)', description: 'Rayon.' },
      { name: '--kyo-file-drop-border-color', default: 'var(--kyo-border-strong)', description: 'Bordure pointillée.' },
      { name: '--kyo-file-drop-active-border-color', default: 'var(--kyo-accent)', description: 'Bordure au survol et au dépôt.' },
      { name: '--kyo-file-drop-active-bg', default: 'var(--kyo-accent-subtle)', description: 'Fond au survol et au dépôt.' },
    ],
    a11y: [
      'Un vrai <input type="file"> dans un <label> : utilisable au clavier et sur mobile, sans glisser-déposer.',
      'Les contraintes (hint) sont reliées au champ via aria-describedby.',
      'Annoncer les rejets à l’utilisateur (alert ou toast), la zone ne le fait pas seule.',
    ],
  },
  {
    slug: 'avatar',
    category: 'Affichage',
    name: 'Avatar',
    summary: 'Initiales ou photo d’une personne.',
    description: 'Initiales calculées depuis le nom (premier et dernier mot), photo optionnelle avec repli automatique sur les initiales.',
    kind: 'component',
    selector: 'kyo-avatar',
    exports: ['KyoAvatar', 'initialsOf'],
    stylesheet: 'avatar.css',
    inputs: [
      { name: 'name', type: 'string', default: "''", description: 'Nom complet.' },
      { name: 'src', type: 'string', description: 'URL de la photo.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '1.75rem · 2.25rem · 3.25rem.' },
      { name: 'decorative', type: 'boolean', default: 'true', description: 'false si le nom n’est pas affiché à côté.' },
    ],
    outputs: [],
    tokens: [
      { name: '--kyo-avatar-size', default: '2.25rem', description: 'Diamètre (le texte suit à 38 %).' },
      { name: '--kyo-avatar-bg', default: 'var(--kyo-accent-subtle)', description: 'Fond.' },
      { name: '--kyo-avatar-fg', default: 'var(--kyo-accent-text)', description: 'Initiales.' },
      { name: '--kyo-avatar-radius', default: 'var(--kyo-radius-full)', description: 'Rayon (carré arrondi possible).' },
    ],
    a11y: [
      'Décoratif par défaut : le nom est presque toujours affiché à côté.',
      'Avec decorative="false", l’avatar est annoncé comme une image portant le nom.',
    ],
  },
  {
    slug: 'description-list',
    category: 'Affichage',
    name: 'Description list',
    summary: 'Paires libellé / valeur, comme une fiche.',
    description: 'Grille de deux colonnes sur un <dl> natif, qui s’empile quand la liste elle-même devient étroite (container query).',
    kind: 'directive',
    selector: 'dl[kyoDescriptionList]',
    exports: ['KyoDescriptionList'],
    stylesheet: 'description-list.css',
    inputs: [],
    outputs: [],
    tokens: [
      { name: '--kyo-description-list-term-width', default: 'fit-content(14rem)', description: 'Colonne des libellés : largeur du plus long, 14rem au plus.' },
      { name: '--kyo-description-list-gap', default: 'var(--kyo-space-2-5) var(--kyo-space-5)', description: 'Espacement lignes / colonnes.' },
    ],
    a11y: ['<dl>, <dt>, <dd> natifs : les lecteurs d’écran annoncent les paires.'],
  },
  {
    slug: 'list',
    category: 'Affichage',
    name: 'List',
    summary: 'Liste de lignes, sélectionnables ou avec actions.',
    description:
      'kyoList pose la liste (avec séparateurs ou non), kyoListItem une ligne. Sur <a> ou <button> la ligne devient interactive ; active marque l’élément courant.',
    kind: 'directive',
    selector: '[kyoList] · [kyoListItem]',
    exports: ['KyoList', 'KyoListItem'],
    stylesheet: 'list.css',
    inputs: [
      { name: 'divided', type: 'boolean', default: 'false', description: 'kyoList : séparateurs au lieu d’un espacement.' },
      { name: 'active', type: 'boolean', default: 'false', description: 'kyoListItem : élément courant (aria-current).' },
    ],
    outputs: [],
    tokens: [
      { name: '--kyo-list-item-padding', default: 'var(--kyo-space-2) var(--kyo-space-2-5)', description: 'Marge interne d’une ligne.' },
      { name: '--kyo-list-item-radius', default: 'var(--kyo-radius-control)', description: 'Rayon d’une ligne.' },
      { name: '--kyo-list-item-hover-bg', default: 'var(--kyo-bg-subtle)', description: 'Fond au survol.' },
      { name: '--kyo-list-item-active-bg', default: 'var(--kyo-accent-subtle)', description: 'Fond de l’élément courant.' },
    ],
    a11y: [
      'Utiliser <ul>/<li> : le nombre d’éléments est annoncé.',
      'L’élément courant est exposé via aria-current, pas seulement par la couleur.',
    ],
  },
  {
    slug: 'tabs',
    category: 'Navigation',
    name: 'Tabs',
    summary: 'Bascule entre plusieurs vues d’un même contenu.',
    description:
      'Onglets ARIA complets : flèches (inversées en RTL), Début/Fin, focus itinérant. Deux apparences : soulignée ou pilule.',
    kind: 'component',
    selector: 'kyo-tabs · kyo-tab',
    exports: ['KyoTabs', 'KyoTab'],
    stylesheet: 'tabs.css',
    inputs: [
      { name: 'selected', type: 'string (model)', default: '1er onglet', description: 'kyo-tabs : valeur de l’onglet actif, liaison [(selected)].' },
      { name: 'appearance', type: "'underline' | 'pill'", default: "'underline'", description: 'kyo-tabs : style.' },
      { name: 'label', type: 'string', description: 'kyo-tabs : nom accessible de la liste.' },
      { name: 'value', type: 'string', description: 'kyo-tab : identifiant (requis).' },
      { name: 'label', type: 'string', description: 'kyo-tab : libellé (requis).' },
      { name: 'badge', type: 'string | number', description: 'kyo-tab : compteur à côté du libellé.' },
    ],
    outputs: [],
    tokens: [
      { name: '--kyo-tab-fg', default: 'var(--kyo-fg-muted)', description: 'Texte des onglets.' },
      { name: '--kyo-tab-fg-selected', default: 'var(--kyo-accent-text)', description: 'Texte de l’onglet actif.' },
      { name: '--kyo-tab-indicator', default: 'var(--kyo-accent)', description: 'Soulignement (underline).' },
      { name: '--kyo-tab-selected-bg', default: 'var(--kyo-accent-subtle)', description: 'Fond actif (pill).' },
      { name: '--kyo-tabs-border-color', default: 'var(--kyo-border)', description: 'Ligne de base et cadre (pill).' },
    ],
    a11y: [
      'Une seule tabulation entre dans la liste, les flèches font le reste (activation automatique).',
      'Pour une navigation entre pages (URL), utiliser des liens et non des onglets.',
    ],
  },
  {
    slug: 'stepper',
    category: 'Navigation',
    name: 'Stepper',
    summary: 'Progression dans un parcours en plusieurs étapes.',
    description: 'Étapes cliquables, terminées (coche) ou verrouillées. Sur petit écran, seule l’étape courante garde son libellé.',
    kind: 'component',
    selector: 'kyo-stepper',
    exports: ['KyoStepper', 'KyoStep'],
    stylesheet: 'stepper.css',
    inputs: [
      { name: 'steps', type: 'KyoStep[]', description: '{ label, done?, disabled? } (requis).' },
      { name: 'current', type: 'number (model)', default: '0', description: 'Index de l’étape courante, liaison [(current)].' },
      { name: 'label', type: 'string', default: "'Steps'", description: 'Nom accessible de la navigation.' },
      { name: 'doneLabel', type: 'string', default: "'completed'", description: 'Annoncé après une étape terminée (i18n).' },
    ],
    outputs: [],
    tokens: [
      { name: '--kyo-stepper-marker-size', default: '1.75rem', description: 'Diamètre des pastilles.' },
      { name: '--kyo-stepper-line', default: 'var(--kyo-border-strong)', description: 'Trait et pastilles à venir.' },
      { name: '--kyo-stepper-line-done', default: 'var(--kyo-accent)', description: 'Trait après une étape terminée.' },
      { name: '--kyo-stepper-accent', default: 'var(--kyo-accent)', description: 'Étape courante et terminée.' },
    ],
    a11y: [
      'L’étape courante porte aria-current="step".',
      'Les étapes terminées sont annoncées comme telles, la coche seule ne suffit pas.',
    ],
  },
  {
    slug: 'progress',
    category: 'Retour utilisateur',
    name: 'Progress',
    summary: 'Avancement d’une tâche ou d’un parcours.',
    description: 'Barre déterminée (value / max) ou indéterminée (value à null).',
    kind: 'component',
    selector: 'kyo-progress',
    exports: ['KyoProgress'],
    stylesheet: 'progress.css',
    inputs: [
      { name: 'value', type: 'number | null', default: 'null', description: 'Valeur courante ; null = indéterminé.' },
      { name: 'max', type: 'number', default: '100', description: 'Valeur maximale.' },
      { name: 'label', type: 'string', description: 'Nom accessible (ex. « Documents envoyés »).' },
    ],
    outputs: [],
    tokens: [
      { name: '--kyo-progress-height', default: '0.375rem', description: 'Épaisseur.' },
      { name: '--kyo-progress-radius', default: 'var(--kyo-radius-full)', description: 'Rayon.' },
      { name: '--kyo-progress-track', default: 'var(--kyo-bg-muted)', description: 'Rail.' },
      { name: '--kyo-progress-fill', default: 'var(--kyo-accent)', description: 'Remplissage.' },
    ],
    a11y: [
      'role="progressbar" avec aria-valuenow / aria-valuemax.',
      'Toujours donner un label, et afficher la valeur en texte à côté si elle compte.',
    ],
  },
  {
    slug: 'toast',
    category: 'Retour utilisateur',
    name: 'Toast',
    summary: 'Notification courte et non bloquante.',
    description:
      "Service KyoToast : aucun composant à placer. Les toasts restent visibles au-dessus d’une modale ouverte et disparaissent seuls (3 s, 6 s pour une erreur).",
    kind: 'service',
    selector: 'KyoToast (service)',
    exports: ['KyoToast', 'KyoToastOptions'],
    stylesheet: 'toast.css',
    inputs: [
      { name: 'show(message, options)', type: 'number', description: 'Affiche un toast ; options : tone, duration (0 = permanent). Renvoie un id.' },
      { name: 'success(message)', type: 'number', description: 'Raccourci tone success.' },
      { name: 'error(message)', type: 'number', description: 'Raccourci tone danger, 6 s.' },
      { name: 'dismiss(id)', type: 'void', description: 'Ferme un toast.' },
      { name: 'setDismissLabel(label)', type: 'void', description: 'Libellé du bouton de fermeture (i18n), « Dismiss » par défaut.' },
    ],
    outputs: [],
    tokens: [
      { name: '--kyo-toast-bg', default: 'var(--kyo-fg)', description: 'Fond (inversé par rapport à la page).' },
      { name: '--kyo-toast-fg', default: 'var(--kyo-bg)', description: 'Texte.' },
      { name: '--kyo-toast-icon-color', default: 'selon le ton', description: 'Icône.' },
      { name: '--kyo-toast-radius', default: 'var(--kyo-radius-lg)', description: 'Rayon.' },
    ],
    a11y: [
      'Zone aria-live polie, montée dès l’injection du service pour que le premier toast soit annoncé ; les erreurs utilisent role="alert".',
      'Le compte à rebours s’arrête tant que la souris ou le focus est sur un toast.',
      'Pour une information indispensable, préférer une alerte dans la page : un toast disparaît.',
      'Chaque toast peut être fermé au clavier.',
    ],
  },
  {
    slug: 'empty-state',
    category: 'Retour utilisateur',
    name: 'Empty state',
    summary: 'Ce qu’on affiche quand il n’y a rien à afficher.',
    description: 'Icône, titre, description et actions projetées. Pour les listes vides, l’absence de sélection ou une fin de parcours.',
    kind: 'component',
    selector: 'kyo-empty-state',
    exports: ['KyoEmptyState'],
    stylesheet: 'empty-state.css',
    inputs: [
      { name: 'icon', type: 'string', description: 'Nom d’une icône du registre.' },
      { name: 'heading', type: 'string', description: 'Titre.' },
      { name: 'description', type: 'string', description: 'Texte explicatif.' },
    ],
    outputs: [],
    tokens: [
      { name: '--kyo-empty-state-padding', default: 'var(--kyo-space-12) var(--kyo-space-4)', description: 'Marge interne.' },
      { name: '--kyo-empty-state-icon-bg', default: 'var(--kyo-bg-muted)', description: 'Fond de l’icône.' },
      { name: '--kyo-empty-state-icon-color', default: 'var(--kyo-fg-muted)', description: 'Couleur de l’icône.' },
    ],
    a11y: ['Le titre est un paragraphe : ajouter un vrai titre de section autour si besoin de structure.'],
  },
  {
    slug: 'dialog',
    category: 'Superpositions',
    name: 'Dialog & Confirm',
    summary: 'Fenêtre modale, et confirmation en une ligne.',
    description:
      "kyo-dialog s’appuie sur <dialog> natif (piège à focus, Échap, arrière-plan inerte). Le service KyoConfirm remplace window.confirm() par une promesse.",
    kind: 'component',
    selector: 'kyo-dialog · [kyoDialogFooter] · [kyoDialogClose] · KyoConfirm',
    exports: ['KyoDialog', 'KyoDialogFooter', 'KyoDialogClose', 'KyoConfirm', 'KyoConfirmOptions'],
    stylesheet: 'dialog.css',
    inputs: [
      { name: 'open', type: 'boolean (model)', default: 'false', description: 'Ouverture, liaison [(open)].' },
      { name: 'heading', type: 'string', description: 'Titre affiché et nom accessible.' },
      { name: 'label', type: 'string', description: 'Nom accessible sans titre visible.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Largeur : 26 · 32 · 44rem.' },
      { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Ferme au clic en dehors.' },
      { name: 'closeLabel', type: 'string', default: "'Close'", description: 'aria-label du bouton de fermeture (i18n).' },
      { name: 'alert', type: 'boolean', default: 'false', description: 'Question urgente (role="alertdialog"), comme une confirmation.' },
      { name: 'describedBy', type: 'string', default: '—', description: 'Id du texte qui décrit la modale, lu après le titre.' },
      { name: 'KyoConfirm.confirm(options)', type: 'Promise<boolean>', description: '{ title, message?, confirmLabel?, cancelLabel?, danger? }' },
    ],
    outputs: [{ name: 'closed', type: 'void', description: 'Émis à chaque fermeture, quelle qu’en soit la cause.' }],
    tokens: [
      { name: '--kyo-dialog-width', default: '32rem', description: 'Largeur (selon size).' },
      { name: '--kyo-dialog-padding', default: 'var(--kyo-space-6)', description: 'Marge interne.' },
      { name: '--kyo-dialog-radius', default: 'var(--kyo-radius-xl)', description: 'Rayon.' },
      { name: '--kyo-dialog-bg', default: 'var(--kyo-surface-raised)', description: 'Fond.' },
      { name: '--kyo-dialog-shadow', default: 'var(--kyo-shadow-lg)', description: 'Élévation.' },
      { name: '--kyo-backdrop', default: 'noir à 40 % / 60 %', description: 'Voile derrière la modale.' },
    ],
    a11y: [
      'Focus piégé et restitué par le navigateur ; Échap ferme.',
      'Le titre nomme la fenêtre (aria-labelledby).',
      'KyoConfirm met le focus sur Annuler : un Entrée par réflexe ne valide jamais une suppression.',
      'KyoConfirm est une alertdialog dont le message est la description : titre et message sont lus ensemble.',
      'Un toast affiché juste avant de fermer la modale reste visible : il revient dans la page à la fermeture.',
      'La page derrière ne défile plus tant que la modale est ouverte.',
    ],
  },
];

export function docsByCategory(): { category: Category; docs: ComponentDoc[] }[] {
  return CATEGORIES.map((category) => ({
    category,
    docs: COMPONENT_DOCS.filter((d) => d.category === category).sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
  })).filter((group) => group.docs.length);
}

export function findDoc(slug: string): ComponentDoc {
  const doc = COMPONENT_DOCS.find((d) => d.slug === slug);
  if (!doc) throw new Error(`Unknown component doc: ${slug}`);
  return doc;
}
