import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KyoTab, KyoTabs } from './tabs';

@Component({
  imports: [KyoTabs, KyoTab],
  template: `
    <kyo-tabs [(selected)]="selected" label="Patient">
      <kyo-tab value="infos" label="Infos">Infos panel</kyo-tab>
      <kyo-tab value="docs" label="Documents" [badge]="3">Docs panel</kyo-tab>
      <kyo-tab value="requests" label="Requests">Requests panel</kyo-tab>
    </kyo-tabs>
  `,
})
class Host {
  readonly selected = signal<string | undefined>(undefined);
}

async function setup() {
  const fixture = TestBed.createComponent(Host);
  await fixture.whenStable();
  const el: HTMLElement = fixture.nativeElement;
  const tabs = () => [...el.querySelectorAll<HTMLButtonElement>('[role=tab]')];
  const panels = () => [...el.querySelectorAll<HTMLElement>('[role=tabpanel]')];
  return { fixture, host: fixture.componentInstance, tabs, panels };
}

describe('KyoTabs', () => {
  it('selects the first tab by default and wires ARIA', async () => {
    const { tabs, panels } = await setup();
    expect(tabs().map((t) => t.getAttribute('aria-selected'))).toEqual(['true', 'false', 'false']);
    expect(tabs().map((t) => t.tabIndex)).toEqual([0, -1, -1]);
    expect(tabs()[0].getAttribute('aria-controls')).toBe(panels()[0].id);
    expect(panels()[0].getAttribute('aria-labelledby')).toBe(tabs()[0].id);
    expect(panels().map((p) => p.hidden)).toEqual([false, true, true]);
    expect(tabs()[1].textContent).toContain('3');
  });

  it('selects on click and updates the two-way binding', async () => {
    const { fixture, host, tabs, panels } = await setup();
    tabs()[1].click();
    await fixture.whenStable();
    expect(host.selected()).toBe('docs');
    expect(panels().map((p) => p.hidden)).toEqual([true, false, true]);
  });

  it('moves with arrow keys, wrapping around, and jumps with Home/End', async () => {
    const { fixture, host, tabs } = await setup();
    const press = async (key: string) => {
      tabs()[0].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      await fixture.whenStable();
    };
    await press('ArrowLeft');
    expect(host.selected()).toBe('requests');
    await press('ArrowRight');
    expect(host.selected()).toBe('infos');
    await press('End');
    expect(host.selected()).toBe('requests');
    expect(document.activeElement).toBe(tabs()[2]);
    await press('Home');
    expect(host.selected()).toBe('infos');
  });
});
