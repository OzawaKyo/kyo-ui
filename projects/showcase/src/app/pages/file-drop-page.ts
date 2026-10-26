import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { KyoFileDrop, KyoFileRejection, KyoToast } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

const MAX_SIZE = 20 * 1024 * 1024;

@Component({
  selector: 'app-file-drop-page',
  imports: [DocPage, DocExample, KyoFileDrop],
  template: `
    <app-doc-page slug="file-drop">
      <app-doc-example heading="Dépôt de documents" description="Simule un envoi de 1,5 s. Essayez un .txt pour voir un rejet." [code]="basic" [stack]="true">
        <kyo-file-drop
          accept="image/*,.pdf,.doc,.docx,.odt"
          [maxSize]="maxSize"
          multiple
          [busy]="uploading()"
          label="Glissez des fichiers ici ou cliquez pour parcourir"
          hint="PDF, photo ou document Word, 20 Mo maximum"
          (filesSelected)="upload($event)"
          (filesRejected)="reject($event)"
        />
        @if (uploaded().length) {
          <ul class="example-files">
            @for (name of uploaded(); track $index) {
              <li>{{ name }}</li>
            }
          </ul>
        }
      </app-doc-example>

      <app-doc-example heading="Désactivé" [code]="disabled" [stack]="true">
        <kyo-file-drop disabled label="Dépôt fermé" />
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDropPage {
  private readonly toast = inject(KyoToast);
  protected readonly maxSize = MAX_SIZE;
  protected readonly uploading = signal(false);
  protected readonly uploaded = signal<string[]>([]);

  protected upload(files: File[]): void {
    this.uploading.set(true);
    setTimeout(() => {
      this.uploaded.update((list) => [...list, ...files.map((f) => f.name)]);
      this.uploading.set(false);
      this.toast.success(files.length > 1 ? `${files.length} fichiers envoyés` : 'Fichier envoyé');
    }, 1500);
  }

  protected reject(rejections: KyoFileRejection[]): void {
    for (const { file, reason } of rejections) {
      this.toast.error(
        reason === 'size' ? `${file.name} dépasse 20 Mo.` : `${file.name} : format non accepté.`,
      );
    }
  }

  protected readonly basic = `<kyo-file-drop
  accept="image/*,.pdf,.doc,.docx,.odt"
  [maxSize]="20 * 1024 * 1024"
  multiple
  [busy]="uploading()"
  hint="PDF, photo ou document Word, 20 Mo maximum"
  (filesSelected)="upload($event)"
  (filesRejected)="reject($event)"
/>`;

  protected readonly disabled = `<kyo-file-drop disabled label="Dépôt fermé" />`;
}
