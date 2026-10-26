import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KyoProgress } from './progress';

@Component({
  imports: [KyoProgress],
  template: `<kyo-progress [value]="value()" [max]="4" label="Documents sent" />`,
})
class Host {
  readonly value = signal<number | null>(1);
}

describe('KyoProgress', () => {
  it('exposes progressbar ARIA and switches to indeterminate on null', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const bar: HTMLElement = fixture.nativeElement.querySelector('kyo-progress');
    expect(bar.getAttribute('role')).toBe('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('1');
    expect(bar.getAttribute('aria-valuemax')).toBe('4');
    expect(bar.style.getPropertyValue('--kyo-progress-value')).toBe('25%');

    fixture.componentInstance.value.set(null);
    await fixture.whenStable();
    expect(bar.hasAttribute('aria-valuenow')).toBe(false);
    expect(bar.hasAttribute('data-indeterminate')).toBe(true);
  });

  it('clamps out-of-range values', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.value.set(7);
    await fixture.whenStable();
    const bar: HTMLElement = fixture.nativeElement.querySelector('kyo-progress');
    expect(bar.getAttribute('aria-valuenow')).toBe('4');
    expect(bar.style.getPropertyValue('--kyo-progress-value')).toBe('100%');
  });
});
