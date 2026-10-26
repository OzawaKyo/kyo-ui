import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { KyoInput } from '@kyo-ui/angular';
import {
  DensityPreference,
  DirectionPreference,
  Preferences,
  ThemePreference,
} from './core/preferences';
import { COMPONENT_DOCS } from './docs/registry';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, KyoInput],
  selector: 'app-root',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly prefs = inject(Preferences);
  protected readonly docs = COMPONENT_DOCS;

  protected setTheme(value: string): void {
    this.prefs.theme.set(value as ThemePreference);
  }

  protected setDensity(value: string): void {
    this.prefs.density.set(value as DensityPreference);
  }

  protected setDir(value: string): void {
    this.prefs.dir.set(value as DirectionPreference);
  }
}
