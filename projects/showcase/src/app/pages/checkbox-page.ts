import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { KyoCheckbox, KyoChoice } from '@kyo-ui/angular';
import { DocExample } from '../docs/doc-example';
import { DocPage } from '../docs/doc-page';

@Component({
  selector: 'app-checkbox-page',
  imports: [DocPage, DocExample, KyoCheckbox, KyoChoice],
  template: `
    <app-doc-page slug="checkbox">
      <app-doc-example heading="États" [code]="states">
        <label kyoChoice><input type="checkbox" kyoCheckbox /> Décochée</label>
        <label kyoChoice><input type="checkbox" kyoCheckbox checked /> Cochée</label>
        <label kyoChoice><input type="checkbox" kyoCheckbox [indeterminate]="true" /> Indéterminée</label>
        <label kyoChoice><input type="checkbox" kyoCheckbox disabled /> Désactivée</label>
      </app-doc-example>

      <app-doc-example heading="Groupe avec « tout sélectionner »" description="L'état indéterminé reflète une sélection partielle." [code]="group" [stack]="true">
        <fieldset class="example-fieldset">
          <legend>Notifications</legend>
          <label kyoChoice>
            <input type="checkbox" kyoCheckbox [checked]="allChecked()" [indeterminate]="someChecked()" (change)="toggleAll()" />
            Tout sélectionner
          </label>
          @for (item of items(); track item.label; let i = $index) {
            <label kyoChoice class="example-nested">
              <input type="checkbox" kyoCheckbox [checked]="item.checked" (change)="toggle(i)" />
              {{ item.label }}
            </label>
          }
        </fieldset>
      </app-doc-example>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPage {
  protected readonly items = signal([
    { label: 'Email', checked: true },
    { label: 'SMS', checked: false },
    { label: 'Push', checked: false },
  ]);
  protected readonly allChecked = computed(() => this.items().every((i) => i.checked));
  protected readonly someChecked = computed(
    () => !this.allChecked() && this.items().some((i) => i.checked),
  );

  protected toggle(index: number): void {
    this.items.update((items) =>
      items.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item)),
    );
  }

  protected toggleAll(): void {
    const next = !this.allChecked();
    this.items.update((items) => items.map((item) => ({ ...item, checked: next })));
  }

  protected readonly states = `<label kyoChoice><input type="checkbox" kyoCheckbox /> Décochée</label>
<label kyoChoice><input type="checkbox" kyoCheckbox checked /> Cochée</label>
<label kyoChoice><input type="checkbox" kyoCheckbox [indeterminate]="true" /> Indéterminée</label>
<label kyoChoice><input type="checkbox" kyoCheckbox disabled /> Désactivée</label>`;

  protected readonly group = `<fieldset>
  <legend>Notifications</legend>
  <label kyoChoice>
    <input type="checkbox" kyoCheckbox [checked]="allChecked()" [indeterminate]="someChecked()" (change)="toggleAll()" />
    Tout sélectionner
  </label>
  ...
</fieldset>`;
}
