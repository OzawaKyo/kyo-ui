import { TestBed } from '@angular/core/testing';
import { initialsOf, KyoAvatar } from './avatar';

describe('initialsOf', () => {
  it('uses the first and last words', () => {
    expect(initialsOf('Jeanne Martin')).toBe('JM');
    expect(initialsOf('  jeanne   de  martin ')).toBe('JM');
    expect(initialsOf('Léa')).toBe('L');
    expect(initialsOf('')).toBe('');
  });
});

describe('KyoAvatar', () => {
  it('falls back to initials when the photo fails, and retries on a new src', async () => {
    const fixture = TestBed.createComponent(KyoAvatar);
    fixture.componentRef.setInput('name', 'Jeanne Martin');
    fixture.componentRef.setInput('src', '/broken.jpg');
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;

    host.querySelector('img')!.dispatchEvent(new Event('error'));
    await fixture.whenStable();
    expect(host.querySelector('img')).toBeNull();
    expect(host.textContent?.trim()).toBe('JM');

    fixture.componentRef.setInput('src', '/jeanne.jpg');
    await fixture.whenStable();
    expect(host.querySelector('img')?.getAttribute('src')).toBe('/jeanne.jpg');
  });

  it('is hidden from assistive tech unless it stands alone', async () => {
    const fixture = TestBed.createComponent(KyoAvatar);
    fixture.componentRef.setInput('name', 'Jeanne Martin');
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('aria-hidden')).toBe('true');

    fixture.componentRef.setInput('decorative', false);
    await fixture.whenStable();
    expect(host.getAttribute('aria-hidden')).toBeNull();
    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-label')).toBe('Jeanne Martin');
  });
});
