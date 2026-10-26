import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { KyoTone } from '../core/tone';

@Component({
  selector: 'kyo-alert',
  template: `
    <svg
      class="kyo-alert__icon"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (tone()) {
        @case ('success') {
          <circle cx="10" cy="10" r="7.25" />
          <path d="M7 10.25l2 2 4-4.5" />
        }
        @case ('warning') {
          <path d="M8.7 3.5a1.5 1.5 0 0 1 2.6 0l5.8 10.25a1.5 1.5 0 0 1-1.3 2.25H4.2a1.5 1.5 0 0 1-1.3-2.25z" />
          <path d="M10 8v3.25M10 13.5v.01" />
        }
        @case ('danger') {
          <circle cx="10" cy="10" r="7.25" />
          <path d="M7.75 7.75l4.5 4.5M12.25 7.75l-4.5 4.5" />
        }
        @default {
          <circle cx="10" cy="10" r="7.25" />
          <path d="M10 9.25v4M10 6.5v.01" />
        }
      }
    </svg>
    <div class="kyo-alert__content">
      @if (title()) {
        <p class="kyo-alert__title">{{ title() }}</p>
      }
      <div class="kyo-alert__description"><ng-content /></div>
    </div>
    @if (dismissible()) {
      <button
        type="button"
        class="kyo-alert__close"
        [attr.aria-label]="dismissLabel()"
        (click)="dismiss.emit()"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kyo-alert',
    '[attr.data-tone]': 'tone()',
    '[attr.role]': 'role()',
  },
})
export class KyoAlert {
  readonly tone = input<KyoTone>('info');
  readonly title = input<string>();
  readonly dismissible = input(false, { transform: booleanAttribute });
  readonly dismissLabel = input('Dismiss');
  /** Emitted when the close button is pressed. Removing the alert is up to the consumer. */
  readonly dismiss = output<void>();

  /** Urgent tones interrupt screen readers, the others are announced politely. */
  protected readonly role = computed(() =>
    this.tone() === 'danger' || this.tone() === 'warning' ? 'alert' : 'status',
  );
}
