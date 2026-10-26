import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  input,
  isDevMode,
  Provider,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { KYO_DEFAULT_ICONS } from './icons';

export type KyoIconSet = Readonly<Record<string, string>>;

export const KYO_ICONS = new InjectionToken<KyoIconSet>('KYO_ICONS', {
  providedIn: 'root',
  factory: () => KYO_DEFAULT_ICONS,
});

/**
 * Registers extra icons (inner SVG markup, 24x24 viewBox) on top of those already available.
 * The markup is trusted as is: only pass constants from your own code.
 */
export function provideKyoIcons(icons: KyoIconSet): Provider {
  return {
    provide: KYO_ICONS,
    useFactory: () => ({
      ...(inject(KYO_ICONS, { skipSelf: true, optional: true }) ?? KYO_DEFAULT_ICONS),
      ...icons,
    }),
  };
}

@Component({
  selector: 'kyo-icon',
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
      aria-hidden="true"
      [innerHTML]="markup()"
    ></svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kyo-icon',
    '[style.--kyo-icon-size]': 'cssSize()',
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() || null',
    '[attr.aria-hidden]': 'label() ? null : "true"',
  },
})
export class KyoIcon {
  readonly name = input.required<string>();
  /** A number in pixels or any CSS length. Defaults to 1.25em, following the text size. */
  readonly size = input<number | string>();
  /** Makes the icon meaningful to screen readers. Leave empty for decorative icons. */
  readonly label = input<string>();

  private readonly icons = inject(KYO_ICONS);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly markup = computed(() => {
    const body = this.icons[this.name()];
    if (body === undefined) {
      if (isDevMode()) console.warn(`[kyo-icon] Unknown icon "${this.name()}".`);
      return '';
    }
    // Icons come from the registry, which only holds developer-provided constants.
    return this.sanitizer.bypassSecurityTrustHtml(body);
  });

  protected readonly cssSize = computed(() => {
    const size = this.size();
    if (size === undefined) return null;
    return typeof size === 'number' ? `${size}px` : size;
  });
}
