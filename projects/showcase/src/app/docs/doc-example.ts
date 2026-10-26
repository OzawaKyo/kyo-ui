import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { KyoButton } from '@kyo-ui/angular';

@Component({
  selector: 'app-doc-example',
  imports: [KyoButton],
  template: `
    <header class="example__header">
      <h3>{{ heading() }}</h3>
      @if (description()) {
        <p>{{ description() }}</p>
      }
    </header>
    <div class="example__preview" [class.example__preview--stack]="stack()">
      <ng-content />
    </div>
    @if (code()) {
      <div class="example__code">
        <pre><code>{{ code() }}</code></pre>
        <button kyoButton variant="ghost" size="sm" class="example__copy" (click)="copy()">
          {{ copied() ? 'Copié' : 'Copier' }}
        </button>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'example' },
})
export class DocExample {
  readonly heading = input.required<string>();
  readonly description = input<string>();
  readonly code = input<string>();
  /** Lays the preview out vertically instead of in a wrapping row. */
  readonly stack = input(false);

  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code() ?? '');
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // Clipboard can be blocked (insecure context, permissions): the code stays selectable.
    }
  }
}
