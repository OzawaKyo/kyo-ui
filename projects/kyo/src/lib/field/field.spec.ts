import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KyoField } from './field';
import { KyoInput } from './input';

@Component({
  imports: [KyoField, KyoInput],
  template: `
    <kyo-field label="Email" hint="We never share it" [error]="error()">
      <input kyoInput type="email" [id]="customId()" />
    </kyo-field>
  `,
})
class Host {
  readonly error = signal<string | null>(null);
  readonly customId = signal<string | undefined>(undefined);
}

async function setup() {
  const fixture = TestBed.createComponent(Host);
  await fixture.whenStable();
  const el: HTMLElement = fixture.nativeElement;
  return {
    fixture,
    host: fixture.componentInstance,
    label: el.querySelector('label')!,
    input: el.querySelector('input')!,
    el,
  };
}

describe('KyoField', () => {
  it('links the label to the control', async () => {
    const { label, input } = await setup();
    expect(input.id).toMatch(/^kyo-input-/);
    expect(label.htmlFor).toBe(input.id);
  });

  it('keeps an id provided by the consumer', async () => {
    const { fixture, host, label, input } = await setup();
    host.customId.set('email');
    await fixture.whenStable();
    expect(input.id).toBe('email');
    expect(label.htmlFor).toBe('email');
  });

  it('describes the control with the hint, then with the error', async () => {
    const { fixture, host, input, el } = await setup();
    const hint = el.querySelector('.kyo-field__hint')!;
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
    expect(input.hasAttribute('aria-invalid')).toBe(false);

    host.error.set('Invalid email');
    await fixture.whenStable();
    const error = el.querySelector('.kyo-field__error')!;
    expect(error.textContent).toContain('Invalid email');
    expect(input.getAttribute('aria-describedby')).toBe(error.id);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(el.querySelector('.kyo-field__hint')).toBeNull();
  });
});

describe('KyoInput', () => {
  it('works without a field', async () => {
    @Component({ imports: [KyoInput], template: `<input kyoInput />` })
    class Standalone {}

    const fixture = TestBed.createComponent(Standalone);
    await fixture.whenStable();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.classList).toContain('kyo-input');
    expect(input.hasAttribute('aria-describedby')).toBe(false);
  });
});
