# Kyo UI

Clean, accessible Angular components built on CSS design tokens.

This workspace contains:

- `projects/kyo`: the library, published as [`@kyo-ui/angular`](projects/kyo/README.md)
- `projects/showcase`: the documentation site, with a page per component (examples, API, CSS tokens, accessibility)

## Components

Button · Badge · Card · Field & Input · Checkbox · Switch · Alert · Spinner

## Design principles

- **Tokens in three tiers**: primitives (`--kyo-gray-500`), semantic (`--kyo-accent`), component (`--kyo-button-bg`).
- **Easy overrides**: all library CSS lives in the `kyo` cascade layer, so app styles win without `!important`.
- **Light / dark** via `light-dark()`, following the OS or forced with `data-kyo-theme`.
- **Rebrand** by overriding the `--kyo-brand-*` palette, since hover and subtle colors are derived.
- **Density** (`data-kyo-density="compact"`), **RTL** (logical properties only), **reduced motion** and **forced colors** support.
- **Native elements first**: inputs, checkboxes and switches work with ngModel, reactive forms and signal forms without a ControlValueAccessor.

## Development

Requires Node 24 (see `.nvmrc`).

```bash
npm install
npm start          # showcase on http://localhost:4200 with live reload
npm run test:lib   # library unit tests
npm run build:lib  # build the package to dist/kyo
```
