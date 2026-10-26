import { computed, Directive, inject, input } from '@angular/core';
import { uniqueId } from '../core/id';
import { KYO_FIELD } from './field-context';

/**
 * Styles a native text control. Being a plain element, it works as is with ngModel,
 * reactive forms and signal forms: no ControlValueAccessor involved.
 */
@Directive({
  selector: 'input[kyoInput], textarea[kyoInput], select[kyoInput]',
  host: {
    class: 'kyo-input',
    '[id]': 'resolvedId()',
    '[attr.aria-describedby]': 'field?.describedBy() ?? null',
    '[attr.aria-invalid]': 'field?.invalid() ? "true" : null',
  },
})
export class KyoInput {
  protected readonly field = inject(KYO_FIELD, { optional: true });

  readonly id = input<string>();
  private readonly generatedId = uniqueId('kyo-input');
  protected readonly resolvedId = computed(() => this.id() || this.generatedId);

  constructor() {
    this.field?.registerControl(this.resolvedId);
  }
}
