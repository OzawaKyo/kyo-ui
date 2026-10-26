import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

export interface KyoStep {
  label: string;
  done?: boolean;
  /** Not reachable yet, e.g. until the previous step is completed. */
  disabled?: boolean;
}

@Component({
  selector: 'kyo-stepper',
  template: `
    <nav [attr.aria-label]="label()">
      <ol class="kyo-stepper__list">
        @for (step of steps(); track $index; let i = $index) {
          <li class="kyo-stepper__item" [attr.data-done]="step.done || null">
            <button
              type="button"
              class="kyo-stepper__step"
              [disabled]="step.disabled"
              [attr.aria-current]="i === current() ? 'step' : null"
              (click)="current.set(i)"
            >
              <span class="kyo-stepper__marker">
                @if (step.done) {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                } @else {
                  {{ i + 1 }}
                }
              </span>
              <span class="kyo-stepper__label">{{ step.label }}</span>
              @if (step.done) {
                <span class="kyo-visually-hidden">({{ doneLabel() }})</span>
              }
            </button>
          </li>
        }
      </ol>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kyo-stepper' },
})
export class KyoStepper {
  readonly steps = input.required<KyoStep[]>();
  /** Index of the current step. */
  readonly current = model(0);
  readonly label = input('Steps');
  /** Announced after a completed step's label (i18n). */
  readonly doneLabel = input('completed');
}
