import { Routes } from '@angular/router';

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
  {
    path: 'components/button',
    title: 'Button — Kyo UI',
    loadComponent: () => import('./pages/button-page').then((m) => m.ButtonPage),
  },
  {
    path: 'components/badge',
    title: 'Badge — Kyo UI',
    loadComponent: () => import('./pages/badge-page').then((m) => m.BadgePage),
  },
  {
    path: 'components/card',
    title: 'Card — Kyo UI',
    loadComponent: () => import('./pages/card-page').then((m) => m.CardPage),
  },
  {
    path: 'components/field',
    title: 'Field & Input — Kyo UI',
    loadComponent: () => import('./pages/field-page').then((m) => m.FieldPage),
  },
  {
    path: 'components/checkbox',
    title: 'Checkbox — Kyo UI',
    loadComponent: () => import('./pages/checkbox-page').then((m) => m.CheckboxPage),
  },
  {
    path: 'components/switch',
    title: 'Switch — Kyo UI',
    loadComponent: () => import('./pages/switch-page').then((m) => m.SwitchPage),
  },
  {
    path: 'components/alert',
    title: 'Alert — Kyo UI',
    loadComponent: () => import('./pages/alert-page').then((m) => m.AlertPage),
  },
  {
    path: 'components/spinner',
    title: 'Spinner — Kyo UI',
    loadComponent: () => import('./pages/spinner-page').then((m) => m.SpinnerPage),
  },
  { path: '**', redirectTo: 'components' },
];
