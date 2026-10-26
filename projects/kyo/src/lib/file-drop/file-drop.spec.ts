import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KyoFileDrop, KyoFileRejection, matchesAccept } from './file-drop';

const file = (name: string, type: string, size = 10) =>
  new File([new Uint8Array(size)], name, { type });

describe('matchesAccept', () => {
  it('handles extensions, exact MIME types and wildcards', () => {
    expect(matchesAccept(file('scan.PDF', 'application/pdf'), '.pdf')).toBe(true);
    expect(matchesAccept(file('photo.jpg', 'image/jpeg'), 'image/*,.pdf')).toBe(true);
    expect(matchesAccept(file('notes.txt', 'text/plain'), 'image/*, .pdf')).toBe(false);
    expect(matchesAccept(file('report.doc', 'application/msword'), 'application/msword')).toBe(true);
    expect(matchesAccept(file('anything.bin', ''), '')).toBe(true);
  });
});

@Component({
  imports: [KyoFileDrop],
  template: `
    <kyo-file-drop
      accept="image/*,.pdf"
      [maxSize]="100"
      multiple
      (filesSelected)="selected = $event"
      (filesRejected)="rejected = $event"
    />
  `,
})
class Host {
  selected: File[] = [];
  rejected: KyoFileRejection[] = [];
}

describe('KyoFileDrop', () => {
  it('splits dropped files into accepted and rejected', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const zone: HTMLElement = fixture.nativeElement.querySelector('kyo-file-drop');

    const files = [file('ok.pdf', 'application/pdf'), file('bad.txt', 'text/plain'), file('big.png', 'image/png', 500)];
    const drop = new Event('drop', { bubbles: true, cancelable: true }) as DragEvent;
    Object.defineProperty(drop, 'dataTransfer', { value: { files } });
    zone.dispatchEvent(drop);

    const host = fixture.componentInstance;
    expect(drop.defaultPrevented).toBe(true);
    expect(host.selected.map((f) => f.name)).toEqual(['ok.pdf']);
    expect(host.rejected.map((r) => [r.file.name, r.reason])).toEqual([
      ['bad.txt', 'type'],
      ['big.png', 'size'],
    ]);
  });

  it('exposes a labelled, keyboard-reachable native input', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type=file]');
    expect(input.closest('label')?.textContent).toContain('Drop a file here');
    expect(input.accept).toBe('image/*,.pdf');
    expect(input.multiple).toBe(true);
  });

  it('still cancels dragover when disabled so the browser does not open the file', async () => {
    const fixture = TestBed.createComponent(KyoFileDrop);
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();

    const dataTransfer = { dropEffect: 'copy' };
    const dragover = new Event('dragover', { bubbles: true, cancelable: true }) as DragEvent;
    Object.defineProperty(dragover, 'dataTransfer', { value: dataTransfer });
    fixture.nativeElement.dispatchEvent(dragover);

    expect(dragover.defaultPrevented).toBe(true);
    expect(dataTransfer.dropEffect).toBe('none');
    expect(fixture.nativeElement.hasAttribute('data-over')).toBe(false);
  });
});
