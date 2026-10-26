import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KyoTone } from '../core/tone';
import { KyoAlert } from './alert';

@Component({
  imports: [KyoAlert],
  template: `
    <kyo-alert [tone]="tone()" title="Heads up" dismissible (dismiss)="dismissed = true">
      Body
    </kyo-alert>
  `,
})
class Host {
  readonly tone = signal<KyoTone>('info');
  dismissed = false;
}

describe('KyoAlert', () => {
  it('uses a polite role for informative tones and an assertive one for urgent tones', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const alert: HTMLElement = fixture.nativeElement.querySelector('kyo-alert');
    expect(alert.getAttribute('role')).toBe('status');

    fixture.componentInstance.tone.set('danger');
    await fixture.whenStable();
    expect(alert.getAttribute('role')).toBe('alert');
  });

  it('emits dismiss from the labelled close button', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const close: HTMLButtonElement = fixture.nativeElement.querySelector('.kyo-alert__close');
    expect(close.getAttribute('aria-label')).toBe('Dismiss');

    close.click();
    expect(fixture.componentInstance.dismissed).toBe(true);
  });
});
