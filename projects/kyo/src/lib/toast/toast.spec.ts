import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KyoToast } from './toast';

describe('KyoToast', () => {
  afterEach(() => vi.useRealTimers());

  // Synchronous render: whenStable() would wait on timers that fake timers never fire.
  function render() {
    TestBed.inject(ApplicationRef).tick();
    return [...document.querySelectorAll<HTMLElement>('.kyo-toast')];
  }

  it('shows toasts with their tone and dismisses them after their duration', async () => {
    vi.useFakeTimers();
    const toast = TestBed.inject(KyoToast);
    toast.success('Saved');
    toast.error('Upload failed');

    let items = render();
    expect(items.map((t) => t.textContent?.trim())).toEqual(['Saved', 'Upload failed']);
    expect(items[1].dataset['tone']).toBe('danger');
    expect(items[1].getAttribute('role')).toBe('alert');
    expect(items[0].hasAttribute('role')).toBe(false);

    vi.advanceTimersByTime(3000);
    items = render();
    expect(items.map((t) => t.textContent?.trim())).toEqual(['Upload failed']);

    vi.advanceTimersByTime(3000);
    expect(render()).toHaveLength(0);
  });

  it('mounts the live region before the first toast so it gets announced', () => {
    TestBed.inject(KyoToast);
    const region = document.querySelector('kyo-toaster');
    expect(region?.getAttribute('aria-live')).toBe('polite');
  });

  it('pauses auto-dismiss while hovered or focused', () => {
    vi.useFakeTimers();
    TestBed.inject(KyoToast).show('Saved');
    const [item] = render();
    const region = item.closest('kyo-toaster')!;

    vi.advanceTimersByTime(2000);
    region.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(5000);
    expect(render()).toHaveLength(1);

    item.querySelector<HTMLButtonElement>('.kyo-toast__close')!.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    region.dispatchEvent(new MouseEvent('mouseleave'));
    vi.advanceTimersByTime(5000);
    expect(render()).toHaveLength(1);

    region.dispatchEvent(new FocusEvent('focusout', { relatedTarget: document.body }));
    vi.advanceTimersByTime(999);
    expect(render()).toHaveLength(1);
    vi.advanceTimersByTime(1);
    expect(render()).toHaveLength(0);
  });

  it('can be dismissed from its close button', async () => {
    TestBed.inject(KyoToast).show('Copied', { duration: 0 });
    const [item] = render();
    item.querySelector<HTMLButtonElement>('.kyo-toast__close')!.click();
    expect(render()).toHaveLength(0);
  });

  it('lives inside the topmost open dialog so it stays visible and interactive', async () => {
    const dialog = document.createElement('dialog');
    dialog.setAttribute('open', '');
    document.body.append(dialog);

    TestBed.inject(KyoToast).show('Link copied', { duration: 0 });
    render();
    expect(dialog.querySelector('kyo-toaster')).not.toBeNull();

    // "Save, toast, close": the toast must not disappear with the dialog
    dialog.removeAttribute('open');
    dialog.dispatchEvent(new Event('close'));
    expect(document.querySelector('kyo-toaster')?.parentElement).toBe(document.body);
    dialog.remove();
  });
});
