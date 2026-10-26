import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
} from '@angular/core';

export type KyoAvatarSize = 'sm' | 'md' | 'lg';

/** First letter of the first and last words, e.g. "Jeanne de Martin" → "JM". */
export function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}

@Component({
  selector: 'kyo-avatar',
  template: `
    @if (src() && !failed()) {
      <img [src]="src()" alt="" (error)="failed.set(true)" />
    } @else {
      {{ initials() }}
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kyo-avatar',
    '[attr.data-size]': 'size()',
    '[attr.role]': 'decorative() ? null : "img"',
    '[attr.aria-label]': 'decorative() ? null : name()',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
  },
})
export class KyoAvatar {
  readonly name = input('');
  readonly src = input<string>();
  readonly size = input<KyoAvatarSize>('md');
  /** True when the name is already displayed next to the avatar, which is the usual case. */
  readonly decorative = input(true, { transform: booleanAttribute });

  /** Resets on each new src, so a later valid photo is shown again. */
  protected readonly failed = linkedSignal({ source: this.src, computation: () => false });
  protected readonly initials = computed(() => initialsOf(this.name()));
}
