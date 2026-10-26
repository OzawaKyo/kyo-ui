import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';

export type ThemePreference = 'system' | 'light' | 'dark';
export type DensityPreference = 'comfortable' | 'compact';
export type DirectionPreference = 'ltr' | 'rtl';

const STORAGE_KEY = 'kyo-showcase-preferences';

interface Stored {
  theme: ThemePreference;
  density: DensityPreference;
  dir: DirectionPreference;
}

function load(): Partial<Stored> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

/** Showcase toolbar state, mirrored onto <html> so the library tokens react to it. */
@Injectable({ providedIn: 'root' })
export class Preferences {
  private readonly root = inject(DOCUMENT).documentElement;
  private readonly stored = load();

  readonly theme = signal<ThemePreference>(this.stored.theme ?? 'system');
  readonly density = signal<DensityPreference>(this.stored.density ?? 'comfortable');
  readonly dir = signal<DirectionPreference>(this.stored.dir ?? 'ltr');

  constructor() {
    effect(() => {
      const theme = this.theme();
      const density = this.density();
      const dir = this.dir();

      if (theme === 'system') this.root.removeAttribute('data-kyo-theme');
      else this.root.setAttribute('data-kyo-theme', theme);

      if (density === 'compact') this.root.setAttribute('data-kyo-density', 'compact');
      else this.root.removeAttribute('data-kyo-density');

      this.root.setAttribute('dir', dir);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, density, dir }));
      } catch {
        // Storage unavailable (private mode, blocked cookies): preferences just don't persist.
      }
    });
  }
}
