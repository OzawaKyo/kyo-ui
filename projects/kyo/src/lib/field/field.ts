import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  Signal,
} from '@angular/core';
import { uniqueId } from '../core/id';
import { KYO_FIELD, KyoFieldContext } from './field-context';

@Component({
  selector: 'kyo-field',
  template: `
    @if (label()) {
      <label class="kyo-field__label" [attr.for]="controlId()">
        {{ label() }}
        @if (required()) {
          <span class="kyo-field__required" aria-hidden="true">*</span>
        }
      </label>
    }
    <ng-content />
    @if (error()) {
      <p class="kyo-field__error" [id]="errorId">{{ error() }}</p>
    } @else if (hint()) {
      <p class="kyo-field__hint" [id]="hintId">{{ hint() }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: KYO_FIELD, useExisting: KyoField }],
  host: {
    class: 'kyo-field',
    '[attr.data-invalid]': 'invalid() || null',
  },
})
export class KyoField implements KyoFieldContext {
  readonly label = input<string>();
  readonly hint = input<string>();
  /** When set, replaces the hint and marks the control as invalid. */
  readonly error = input<string | null>();
  /** Displays the required marker. Put `required` on the control itself for validation. */
  readonly required = input(false, { transform: booleanAttribute });

  private readonly id = uniqueId('kyo-field');
  protected readonly hintId = `${this.id}-hint`;
  protected readonly errorId = `${this.id}-error`;

  private readonly control = signal<Signal<string> | undefined>(undefined);
  protected readonly controlId = computed(() => this.control()?.() ?? null);

  readonly invalid = computed(() => !!this.error());
  readonly describedBy = computed(() => {
    if (this.error()) return this.errorId;
    if (this.hint()) return this.hintId;
    return null;
  });

  registerControl(id: Signal<string>): void {
    this.control.set(id);
  }
}
