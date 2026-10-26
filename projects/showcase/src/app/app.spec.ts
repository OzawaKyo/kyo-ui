import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { COMPONENT_DOCS } from './docs/registry';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('lists every documented component in the navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const links = [...fixture.nativeElement.querySelectorAll('.sidebar a')].map((a: Element) =>
      a.textContent?.trim(),
    );
    for (const doc of COMPONENT_DOCS) {
      expect(links).toContain(doc.name);
    }
  });

  it('applies the theme preference to the document', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const select: HTMLSelectElement = fixture.nativeElement.querySelector('.toolbar select');
    select.value = 'dark';
    select.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    expect(document.documentElement.getAttribute('data-kyo-theme')).toBe('dark');
  });
});
