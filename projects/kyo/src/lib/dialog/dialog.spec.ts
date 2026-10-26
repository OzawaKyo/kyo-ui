import { ApplicationRef, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KyoConfirm } from './confirm';
import { KyoDialog, KyoDialogClose, KyoDialogFooter } from './dialog';

// jsdom does not implement modal dialogs.
beforeAll(() => {
  const proto = HTMLDialogElement.prototype;
  proto.showModal ??= function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  proto.close ??= function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

@Component({
  imports: [KyoDialog, KyoDialogFooter, KyoDialogClose],
  template: `
    <kyo-dialog [(open)]="open" heading="New patient" (closed)="closedCount = closedCount + 1">
      Body
      <div kyoDialogFooter><button kyoDialogClose>Cancel</button></div>
    </kyo-dialog>
  `,
})
class Host {
  readonly open = signal(false);
  closedCount = 0;
}

async function setup() {
  const fixture = TestBed.createComponent(Host);
  await fixture.whenStable();
  const dialog: HTMLDialogElement = fixture.nativeElement.querySelector('dialog');
  return { fixture, host: fixture.componentInstance, dialog };
}

describe('KyoDialog', () => {
  it('opens and closes the native dialog from the model', async () => {
    const { fixture, host, dialog } = await setup();
    expect(dialog.open).toBe(false);

    host.open.set(true);
    await fixture.whenStable();
    expect(dialog.open).toBe(true);
    expect(dialog.getAttribute('aria-labelledby')).toBe(dialog.querySelector('h2')!.id);

    host.open.set(false);
    await fixture.whenStable();
    expect(dialog.open).toBe(false);
    expect(host.closedCount).toBe(1);
  });

  it('closes from kyoDialogClose and the header button', async () => {
    const { fixture, host, dialog } = await setup();
    host.open.set(true);
    await fixture.whenStable();

    dialog.querySelector<HTMLButtonElement>('[kyoDialogClose]')!.click();
    await fixture.whenStable();
    expect(host.open()).toBe(false);
    expect(dialog.open).toBe(false);

    host.open.set(true);
    await fixture.whenStable();
    dialog.querySelector<HTMLButtonElement>('.kyo-dialog__close')!.click();
    await fixture.whenStable();
    expect(host.open()).toBe(false);
  });

  it('closes on a backdrop click but not when a press starts inside', async () => {
    const { fixture, host, dialog } = await setup();
    host.open.set(true);
    await fixture.whenStable();
    const body = dialog.querySelector('.kyo-dialog__body')!;

    body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(host.open()).toBe(true);

    dialog.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(host.open()).toBe(false);
  });
});

describe('KyoConfirm', () => {
  async function ask(answerWith: 'confirm' | 'cancel') {
    const result = TestBed.inject(KyoConfirm).confirm({
      title: 'Delete this patient?',
      message: 'Their documents will be deleted too.',
      confirmLabel: 'Delete',
      cancelLabel: 'Keep',
      danger: true,
    });
    await TestBed.inject(ApplicationRef).whenStable();
    const dialog = document.body.querySelector('kyo-confirm-dialog dialog')!;
    const [cancel, confirm] = [...dialog.querySelectorAll<HTMLButtonElement>('.kyo-dialog__footer button')];
    expect(cancel.textContent).toContain('Keep');
    expect(confirm.dataset['variant']).toBe('danger');
    expect(dialog.getAttribute('role')).toBe('alertdialog');
    expect(document.getElementById(dialog.getAttribute('aria-describedby')!)?.textContent).toContain('documents');
    expect(dialog.querySelector('.kyo-dialog__close')?.getAttribute('aria-label')).toBe('Keep');
    (answerWith === 'confirm' ? confirm : cancel).click();
    await TestBed.inject(ApplicationRef).whenStable();
    return result;
  }

  it('resolves true on confirm, false on cancel, and cleans up', async () => {
    await expect(ask('confirm')).resolves.toBe(true);
    await expect(ask('cancel')).resolves.toBe(false);
    await new Promise((r) => setTimeout(r));
    expect(document.body.querySelector('kyo-confirm-dialog')).toBeNull();
  });
});
