# Kyo UI

**Clean, accessible Angular components built on CSS design tokens.**

[![npm](https://img.shields.io/npm/v/@kyo-ui/angular?color=2563eb)](https://www.npmjs.com/package/@kyo-ui/angular)
[![license](https://img.shields.io/npm/l/@kyo-ui/angular?color=2563eb)](https://github.com/OzawaKyo/kyo-ui/blob/main/LICENSE)
[![Angular](https://img.shields.io/badge/Angular-22.2%2B-2563eb)](https://angular.dev)

![Kyo UI components in light and dark themes](https://raw.githubusercontent.com/OzawaKyo/kyo-ui/main/docs/kyo-ui-preview.png)

- **Native elements first.** Inputs, selects, checkboxes, radios and switches are directives on the real elements, so `ngModel`, reactive forms and signal forms work with no `ControlValueAccessor`.
- **Light and dark** out of the box, following the OS or forced per subtree.
- **Easy to brand.** Swap the brand palette and every hover, subtle and focus color follows.
- **Overridable without `!important`.** All styles live in one CSS cascade layer.
- **Accessible by default.** Real labels, ARIA wiring, keyboard support, visible focus, reduced motion and forced colors (Windows high contrast).
- **Compact density and RTL** with no extra code.
- **Signals and standalone.** OnPush everywhere, zoneless ready, import only what you use.

## Components

| Category | Components |
| --- | --- |
| Actions | Button (variants, sizes, loading, icon only, link, full width) |
| Forms | Field & Input (label, hint, error), styled Select, Input group, Checkbox, Radio, Switch, Choice card, File drop |
| Display | Avatar, Badge, Card, Description list, Icon (Lucide set), List |
| Navigation | Tabs, Stepper |
| Feedback | Alert, Toast (service), Progress, Spinner, Empty state |
| Overlays | Dialog, Confirm (service) |

## Installation

```bash
npm install @kyo-ui/angular
```

Add the stylesheet to `angular.json`, before your own styles:

```json
"styles": [
  "node_modules/@kyo-ui/angular/styles/kyo.css",
  "src/styles.css"
]
```

Optional: `styles/base.css` sets document defaults (font, colors, `box-sizing`) for apps fully built on Kyo.

## Usage

Every component is standalone: import what you use.

```ts
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KyoButton, KyoField, KyoInput } from '@kyo-ui/angular';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, KyoButton, KyoField, KyoInput],
  template: `
    <kyo-field label="Email" hint="We never share it." [error]="emailError()">
      <input kyoInput type="email" [(ngModel)]="email" required />
    </kyo-field>
    <button kyoButton [loading]="saving()" (click)="save()">Save</button>
  `,
})
export class Profile {
  email = '';
  readonly saving = signal(false);
  readonly emailError = signal<string | null>(null);
  save() { /* … */ }
}
```

### A few more

```html
<!-- Native select, with a styled option list in Chromium -->
<kyo-field label="Country">
  <select kyoInput [(ngModel)]="country">
    <option>France</option>
    <option>Belgium</option>
  </select>
</kyo-field>

<!-- Search field with an icon -->
<kyo-input-group>
  <kyo-icon name="search" />
  <input kyoInput type="search" aria-label="Search" />
</kyo-input-group>

<!-- Tabs with full keyboard support -->
<kyo-tabs [(selected)]="tab" label="Patient file">
  <kyo-tab value="info" label="Info">…</kyo-tab>
  <kyo-tab value="documents" label="Documents" [badge]="3">…</kyo-tab>
</kyo-tabs>

<!-- Modal dialog on the native <dialog> -->
<kyo-dialog [(open)]="open" heading="New patient">
  …
  <div kyoDialogFooter>
    <button kyoButton variant="secondary" kyoDialogClose>Cancel</button>
    <button kyoButton>Save</button>
  </div>
</kyo-dialog>
```

```ts
// Notifications and confirmations are services: nothing to place in the template
const toast = inject(KyoToast);
toast.success('Patient saved');

const ok = await inject(KyoConfirm).confirm({
  title: 'Delete this patient?',
  message: 'Their documents will be deleted too.',
  confirmLabel: 'Delete',
  danger: true,
});
```

## Theming

```css
/* Brand: override the palette, derived colors follow */
:root {
  --kyo-brand-500: oklch(0.6 0.2 300);
  --kyo-brand-600: oklch(0.52 0.2 300);
}

/* Any component token, on any element */
.my-toolbar {
  --kyo-button-radius: 999px;
}
```

| Attribute | Effect |
| --- | --- |
| `data-kyo-theme="light"` / `"dark"` | Forces a theme on `<html>` or any subtree (default: follows the OS) |
| `data-kyo-density="compact"` | Smaller controls and spacing |
| `dir="rtl"` | Mirrored layout (logical properties everywhere) |

Tokens come in three tiers: primitives (`--kyo-gray-500`), semantic (`--kyo-accent`, `--kyo-fg-muted`) and component (`--kyo-button-bg`). Each component's tokens are listed in the showcase.

> **Global resets.** Kyo's styles live in the `kyo` cascade layer, so any unlayered rule in your app wins, including a global `:focus-visible { outline: … }`. Exclude text fields, which draw their own focus: `:focus-visible:not(.kyo-input, .kyo-input option) { … }`.

## Translations

Built-in accessible labels default to English. Override them where you use the component, for example `closeLabel` on `kyo-dialog`, `label` on `kyo-spinner`, `doneLabel` on `kyo-stepper`, `cancelLabel` on `KyoConfirm`, or once with `KyoToast.setDismissLabel()`.

## Icons

The default set is a selection of [Lucide](https://lucide.dev) icons. Register more, or override some, with `provideKyoIcons()`:

```ts
providers: [
  provideKyoIcons({
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  }),
],
```

## Browser support

Current versions of Chrome, Edge, Firefox and Safari (Safari 17.5 or later). The styled option list of `<select>` needs Chromium; other browsers show their native list.

## Links

- [Source code and showcase](https://github.com/OzawaKyo/kyo-ui)
- [Releases](https://github.com/OzawaKyo/kyo-ui/releases)
- [Report an issue](https://github.com/OzawaKyo/kyo-ui/issues)

## License

[MIT](https://github.com/OzawaKyo/kyo-ui/blob/main/LICENSE). The bundled icons come from Lucide, under the ISC license.
