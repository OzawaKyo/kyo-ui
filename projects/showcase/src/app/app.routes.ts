import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { COMPONENT_DOCS } from './docs/registry';

/** One lazy page per documented component, keyed by registry slug. */
const pages: Record<string, () => Promise<Type<unknown>>> = {
  alert: () => import('./pages/alert-page').then((m) => m.AlertPage),
  avatar: () => import('./pages/avatar-page').then((m) => m.AvatarPage),
  badge: () => import('./pages/badge-page').then((m) => m.BadgePage),
  button: () => import('./pages/button-page').then((m) => m.ButtonPage),
  card: () => import('./pages/card-page').then((m) => m.CardPage),
  checkbox: () => import('./pages/checkbox-page').then((m) => m.CheckboxPage),
  'choice-card': () => import('./pages/choice-card-page').then((m) => m.ChoiceCardPage),
  'description-list': () =>
    import('./pages/description-list-page').then((m) => m.DescriptionListPage),
  dialog: () => import('./pages/dialog-page').then((m) => m.DialogPage),
  'empty-state': () => import('./pages/empty-state-page').then((m) => m.EmptyStatePage),
  field: () => import('./pages/field-page').then((m) => m.FieldPage),
  'file-drop': () => import('./pages/file-drop-page').then((m) => m.FileDropPage),
  icon: () => import('./pages/icon-page').then((m) => m.IconPage),
  'input-group': () => import('./pages/input-group-page').then((m) => m.InputGroupPage),
  list: () => import('./pages/list-page').then((m) => m.ListPage),
  progress: () => import('./pages/progress-page').then((m) => m.ProgressPage),
  radio: () => import('./pages/radio-page').then((m) => m.RadioPage),
  spinner: () => import('./pages/spinner-page').then((m) => m.SpinnerPage),
  stepper: () => import('./pages/stepper-page').then((m) => m.StepperPage),
  switch: () => import('./pages/switch-page').then((m) => m.SwitchPage),
  tabs: () => import('./pages/tabs-page').then((m) => m.TabsPage),
  toast: () => import('./pages/toast-page').then((m) => m.ToastPage),
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'components' },
  {
    path: 'foundations',
    title: 'Fondations — Kyo UI',
    loadComponent: () => import('./pages/foundations').then((m) => m.FoundationsPage),
  },
  {
    path: 'components',
    title: 'Composants — Kyo UI',
    loadComponent: () => import('./pages/components-index').then((m) => m.ComponentsIndexPage),
  },
  ...COMPONENT_DOCS.map((doc) => ({
    path: `components/${doc.slug}`,
    title: `${doc.name} — Kyo UI`,
    loadComponent: pages[doc.slug],
  })),
  { path: '**', redirectTo: 'components' },
];
