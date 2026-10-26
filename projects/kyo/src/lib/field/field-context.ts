import { InjectionToken, Signal } from '@angular/core';

/** Contract between a field and the control it wraps, kept separate to avoid an import cycle. */
export interface KyoFieldContext {
  readonly describedBy: Signal<string | null>;
  readonly invalid: Signal<boolean>;
  registerControl(id: Signal<string>): void;
}

export const KYO_FIELD = new InjectionToken<KyoFieldContext>('KYO_FIELD');
