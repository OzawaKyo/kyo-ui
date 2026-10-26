# Kyo UI — `@kyo-ui/angular`

Clean, accessible Angular components built on CSS design tokens.

## Install

```bash
npm install @kyo-ui/angular
```

Load the stylesheet before your own styles, in `angular.json`:

```json
"styles": [
  "node_modules/@kyo-ui/angular/styles/kyo.css",
  "src/styles.css"
]
```

`styles/base.css` is optional: it sets document defaults (font, colors, box-sizing) for apps fully built on Kyo.

## Use

```ts
import { KyoButton, KyoField, KyoInput } from '@kyo-ui/angular';
```

```html
<kyo-field label="Email" [error]="emailError()">
  <input kyoInput type="email" [(ngModel)]="email" />
</kyo-field>
<button kyoButton>Save</button>
```

## Theming

- Theme: follows the OS; force it with `data-kyo-theme="light" | "dark"` on `<html>` or any subtree.
- Density: `data-kyo-density="compact"` on any subtree.
- Brand: override `--kyo-brand-50` … `--kyo-brand-950` (or just `--kyo-accent`).
- Components expose `--kyo-<component>-*` variables. All library CSS lives in the `kyo` cascade layer, so any app CSS overrides it without `!important`.
- That also applies to global resets: a rule like `:focus-visible { outline: … }` in your app beats Kyo's own focus styles. Exclude text fields, which draw their own border and halo (on the whole input group when there is one): `:focus-visible:not(.kyo-input, .kyo-input option) { … }` (options of a styled select highlight with a background instead).

## Develop

```bash
npm start          # showcase with live reload
npm run test:lib   # unit tests
npm run build:lib  # build to dist/kyo
```

Publish from `dist/kyo` with `npm publish --access public`.
