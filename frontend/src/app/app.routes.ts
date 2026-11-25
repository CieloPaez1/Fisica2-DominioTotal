import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'units',
    loadComponent: () => import('./pages/units/units.page').then(m => m.UnitsPage)
  },
  {
    path: 'speed-drill',
    loadComponent: () => import('./pages/speed-drill/speed-drill.page').then(m => m.SpeedDrillPage)
  },
  {
    path: 'tribunal',
    loadComponent: () => import('./pages/tribunal/tribunal.page').then(m => m.TribunalPage)
  },
  {
    path: 'machete',
    loadComponent: () => import('./pages/machete/machete.page').then(m => m.MachetePage)
  },
  {
    path: 'limits',
    loadComponent: () => import('./pages/limits/limits.page').then(m => m.LimitsPage)
  },
  {
    path: 'mapa',
    loadComponent: () => import('./pages/mapa/mapa.page').then(m => m.MapaPage)
  },
  {
    path: 'podcasts',
    loadComponent: () => import('./pages/podcasts/podcasts.page').then(m => m.PodcastsPage)
  },
  {
    path: 'pdfs',
    loadComponent: () => import('./pages/pdfs/pdfs.page').then(m => m.PdfsPage)
  },
  {
    path: 'errors',
    loadComponent: () => import('./pages/errors/errors.page').then(m => m.ErrorsPage)
  },
  {
    path: 'calculadora',
    loadComponent: () => import('./pages/calculadora/calculadora.page').then(m => m.CalculadoraPage)
  },
  {
    path: 'profesor',
    loadComponent: () => import('./pages/profesor/profesor.page').then(m => m.ProfesorPage)
  },
  {
    path: 'demostraciones',
    loadComponent: () => import('./pages/demostraciones/demostraciones.page').then(m => m.DemostracionesPage)
  }
];
