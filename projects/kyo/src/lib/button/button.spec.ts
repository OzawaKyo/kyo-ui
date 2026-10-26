import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KyoButton, KyoButtonSize, KyoButtonVariant } from './button';

@Component({
  imports: [KyoButton],
  template: `
    <button kyoButton [variant]="variant()" [size]="size()" [loading]="loading()" (click)="clicks = clicks + 1">
      Save
    </button>
  `,
})
class Host {
  readonly variant = signal<KyoButtonVariant>('primary');
  readonly size = signal<KyoButtonSize>('md');
  readonly loading = signal(false);
  clicks = 0;
}

async function setup() {
  const fixture = TestBed.createComponent(Host);
  await fixture.whenStable();
  const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
  return { fixture, host: fixture.componentInstance, button };
}

describe('KyoButton', () => {
  it('exposes variant and size as data attributes', async () => {
    const { fixture, host, button } = await setup();
    expect(button.classList).toContain('kyo-button');
    expect(button.dataset['variant']).toBe('primary');
    expect(button.dataset['size']).toBe('md');

    host.variant.set('ghost');
    host.size.set('lg');
    await fixture.whenStable();
    expect(button.dataset['variant']).toBe('ghost');
    expect(button.dataset['size']).toBe('lg');
  });

  it('marks itself busy and swallows clicks while loading', async () => {
    const { fixture, host, button } = await setup();
    host.loading.set(true);
    await fixture.whenStable();

    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.querySelector('kyo-spinner')).not.toBeNull();
    button.click();
    expect(host.clicks).toBe(0);

    host.loading.set(false);
    await fixture.whenStable();
    button.click();
    expect(host.clicks).toBe(1);
  });
});
