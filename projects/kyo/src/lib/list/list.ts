import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: '[kyoList]',
  host: {
    class: 'kyo-list',
    '[attr.data-divided]': 'divided() || null',
  },
})
export class KyoList {
  /** Separates items with a border instead of a gap. */
  readonly divided = input(false, { transform: booleanAttribute });
}

/**
 * A row of a list. Interactive on <a> and <button>.
 * Use `.kyo-list-item__content`, `__title`, `__description` and `__actions` inside.
 */
@Directive({
  selector: '[kyoListItem]',
  host: {
    class: 'kyo-list-item',
    '[attr.aria-current]': 'active() ? "true" : null',
  },
})
export class KyoListItem {
  /** Marks the current item, e.g. the selected record in a master/detail layout. */
  readonly active = input(false, { transform: booleanAttribute });
}
