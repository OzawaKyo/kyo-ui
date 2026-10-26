import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  input,
  model,
  viewChildren,
} from '@angular/core';
import { uniqueId } from '../core/id';

export type KyoTabsAppearance = 'underline' | 'pill';

@Component({
  selector: 'kyo-tab',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kyo-tabs__panel',
    role: 'tabpanel',
    tabindex: '0',
    '[id]': 'panelId',
    '[attr.aria-labelledby]': 'tabId',
    '[hidden]': '!selected()',
  },
})
export class KyoTab {
  private readonly tabs = inject(KyoTabs);

  readonly value = input.required<string>();
  readonly label = input.required<string>();
  /** Short count or status shown next to the label. */
  readonly badge = input<string | number>();

  readonly tabId = uniqueId('kyo-tab');
  readonly panelId = `${this.tabId}-panel`;
  protected readonly selected = computed(() => this.tabs.current() === this.value());
}

@Component({
  selector: 'kyo-tabs',
  template: `
    <div class="kyo-tabs__list" role="tablist" [attr.aria-label]="label() || null" (keydown)="onKeydown($event)">
      @for (tab of tabs(); track tab.value()) {
        <button
          #tabButton
          type="button"
          role="tab"
          class="kyo-tabs__tab"
          [id]="tab.tabId"
          [attr.aria-controls]="tab.panelId"
          [attr.aria-selected]="tab.value() === current()"
          [tabIndex]="tab.value() === current() ? 0 : -1"
          (click)="selected.set(tab.value())"
        >
          {{ tab.label() }}
          @if (tab.badge() !== undefined) {
            <span class="kyo-badge">{{ tab.badge() }}</span>
          }
        </button>
      }
    </div>
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kyo-tabs',
    '[attr.data-appearance]': 'appearance()',
  },
})
export class KyoTabs {
  /** Value of the selected tab. Defaults to the first tab. */
  readonly selected = model<string>();
  readonly appearance = input<KyoTabsAppearance>('underline');
  /** Accessible name of the tab list. */
  readonly label = input<string>();

  protected readonly tabs = contentChildren(KyoTab);
  private readonly buttons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  readonly current = computed(() => this.selected() ?? this.tabs()[0]?.value());

  /** Arrow keys move and select (automatic activation), Home/End jump to the ends. */
  protected onKeydown(event: KeyboardEvent): void {
    const tabs = this.tabs();
    const index = tabs.findIndex((t) => t.value() === this.current());
    if (index < 0) return;

    const rtl = getComputedStyle(event.target as HTMLElement).direction === 'rtl';
    const steps: Record<string, number> = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 };
    const step = steps[event.key];
    let next: number;
    if (step !== undefined) next = (index + step + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;

    event.preventDefault();
    this.selected.set(tabs[next].value());
    this.buttons()[next]?.nativeElement.focus();
  }
}
