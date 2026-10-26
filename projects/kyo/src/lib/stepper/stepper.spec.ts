import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KyoStep, KyoStepper } from './stepper';

@Component({
  imports: [KyoStepper],
  template: `<kyo-stepper [steps]="steps" [(current)]="current" />`,
})
class Host {
  readonly current = signal(0);
  readonly steps: KyoStep[] = [
    { label: 'Your details', done: true },
    { label: 'Your documents' },
    { label: 'Review', disabled: true },
  ];
}

describe('KyoStepper', () => {
  it('marks the current and completed steps, and navigates on click', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const buttons = [...fixture.nativeElement.querySelectorAll('button')] as HTMLButtonElement[];

    expect(buttons[0].getAttribute('aria-current')).toBe('step');
    expect(buttons[0].textContent).toContain('(completed)');
    expect(buttons[2].disabled).toBe(true);

    buttons[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.current()).toBe(1);
    expect(buttons[1].getAttribute('aria-current')).toBe('step');
  });
});
