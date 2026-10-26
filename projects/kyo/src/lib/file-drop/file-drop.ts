import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { uniqueId } from '../core/id';
import { KyoIcon } from '../icon/icon';
import { KyoSpinner } from '../spinner/spinner';

export interface KyoFileRejection {
  file: File;
  reason: 'type' | 'size';
}

/** Same rules as the `accept` attribute: extensions, exact MIME types and `type/*` wildcards. */
export function matchesAccept(file: File, accept: string): boolean {
  const rules = accept
    .split(',')
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean);
  if (!rules.length) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return rules.some((rule) => {
    if (rule.startsWith('.')) return name.endsWith(rule);
    if (rule.endsWith('/*')) return type.startsWith(rule.slice(0, -1));
    return type === rule;
  });
}

/**
 * Click-to-browse and drag-and-drop file picker. Validates type and size, then emits;
 * uploading is up to the consumer (set `busy` meanwhile).
 */
@Component({
  selector: 'kyo-file-drop',
  imports: [KyoIcon, KyoSpinner],
  template: `
    <label class="kyo-file-drop__zone">
      <input
        #input
        type="file"
        class="kyo-visually-hidden"
        [accept]="accept()"
        [multiple]="multiple()"
        [disabled]="disabled() || busy()"
        [attr.aria-describedby]="hint() ? hintId : null"
        (change)="onInput(input)"
      />
      @if (busy()) {
        <kyo-spinner size="sm" label="" />
      } @else {
        <kyo-icon name="upload" />
      }
      <span class="kyo-file-drop__text"><ng-content>{{ label() }}</ng-content></span>
      @if (hint()) {
        <span class="kyo-file-drop__hint" [id]="hintId">{{ hint() }}</span>
      }
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kyo-file-drop',
    '[attr.data-over]': 'over() || null',
    '[attr.data-busy]': 'busy() || null',
    '[attr.data-disabled]': 'disabled() || null',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
  },
})
export class KyoFileDrop {
  /** Same syntax as the native attribute, e.g. "image/*,.pdf". Also enforced on drop. */
  readonly accept = input('');
  readonly multiple = input(false, { transform: booleanAttribute });
  /** Maximum size per file, in bytes. */
  readonly maxSize = input<number>();
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Shows a spinner and blocks new files, e.g. while uploading. */
  readonly busy = input(false, { transform: booleanAttribute });
  readonly label = input('Drop a file here or click to browse');
  readonly hint = input<string>();

  readonly filesSelected = output<File[]>();
  readonly filesRejected = output<KyoFileRejection[]>();

  protected readonly over = signal(false);
  protected readonly hintId = uniqueId('kyo-file-drop-hint');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected onInput(input: HTMLInputElement): void {
    this.handle(input.files);
    input.value = ''; // allows picking the same file again
  }

  protected onDragOver(event: DragEvent): void {
    // Always cancel, otherwise the browser opens the dropped file and leaves the page
    event.preventDefault();
    if (this.disabled() || this.busy()) {
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'none';
      return;
    }
    this.over.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    if (!this.host.contains(event.relatedTarget as Node | null)) this.over.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.over.set(false);
    if (this.disabled() || this.busy()) return;
    this.handle(event.dataTransfer?.files ?? null);
  }

  private handle(list: FileList | null): void {
    let files = Array.from(list ?? []);
    if (!this.multiple()) files = files.slice(0, 1);
    if (!files.length) return;

    const accepted: File[] = [];
    const rejected: KyoFileRejection[] = [];
    const maxSize = this.maxSize();
    for (const file of files) {
      if (!matchesAccept(file, this.accept())) rejected.push({ file, reason: 'type' });
      else if (maxSize !== undefined && file.size > maxSize) rejected.push({ file, reason: 'size' });
      else accepted.push(file);
    }
    if (accepted.length) this.filesSelected.emit(accepted);
    if (rejected.length) this.filesRejected.emit(rejected);
  }
}
