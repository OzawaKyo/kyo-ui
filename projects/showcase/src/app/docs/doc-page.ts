import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { KyoBadge } from '@kyo-ui/angular';
import { findDoc, PACKAGE_NAME } from './registry';

@Component({
  selector: 'app-doc-page',
  imports: [KyoBadge],
  template: `
    <header class="doc__header">
      <p class="doc__eyebrow">
        <span kyoBadge tone="accent">{{ doc().kind === 'component' ? 'Composant' : 'Directive' }}</span>
      </p>
      <h1>{{ doc().name }}</h1>
      <p class="doc__lead">{{ doc().summary }} {{ doc().description }}</p>
      <dl class="doc__meta">
        <div>
          <dt>Sélecteur</dt>
          <dd><code>{{ doc().selector }}</code></dd>
        </div>
        <div>
          <dt>Import</dt>
          <dd><code>{{ importLine() }}</code></dd>
        </div>
        <div>
          <dt>Styles</dt>
          <dd><code>{{ packageName }}/styles/components/{{ doc().stylesheet }}</code></dd>
        </div>
      </dl>
    </header>

    <section class="doc__section">
      <h2>Exemples</h2>
      <ng-content />
    </section>

    @if (doc().inputs.length) {
      <section class="doc__section">
        <h2>Inputs</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Nom</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
            </thead>
            <tbody>
              @for (entry of doc().inputs; track entry.name) {
                <tr>
                  <td><code>{{ entry.name }}</code></td>
                  <td><code>{{ entry.type }}</code></td>
                  <td>@if (entry.default) {<code>{{ entry.default }}</code>} @else {—}</td>
                  <td>{{ entry.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    }

    @if (doc().outputs.length) {
      <section class="doc__section">
        <h2>Outputs</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Nom</th><th>Payload</th><th>Description</th></tr>
            </thead>
            <tbody>
              @for (entry of doc().outputs; track entry.name) {
                <tr>
                  <td><code>{{ entry.name }}</code></td>
                  <td><code>{{ entry.type }}</code></td>
                  <td>{{ entry.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    }

    <section class="doc__section">
      <h2>Specs & tokens CSS</h2>
      <p class="doc__note">
        Surchargez ces variables sur l'élément ou sur un ancêtre. Elles pointent vers les tokens
        sémantiques : changer le thème ou la densité les met à jour automatiquement.
      </p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Variable</th><th>Défaut</th><th>Rôle</th></tr>
          </thead>
          <tbody>
            @for (token of doc().tokens; track token.name) {
              <tr>
                <td><code>{{ token.name }}</code></td>
                <td><code>{{ token.default }}</code></td>
                <td>{{ token.description }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>

    <section class="doc__section">
      <h2>Accessibilité</h2>
      <ul class="doc__list">
        @for (rule of doc().a11y; track rule) {
          <li>{{ rule }}</li>
        }
      </ul>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'doc' },
})
export class DocPage {
  readonly slug = input.required<string>();

  protected readonly packageName = PACKAGE_NAME;
  protected readonly doc = computed(() => findDoc(this.slug()));
  protected readonly importLine = computed(
    () => `import { ${this.doc().exports.join(', ')} } from '${PACKAGE_NAME}';`,
  );
}
