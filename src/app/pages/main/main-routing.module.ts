import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  
  {
    path: 'home',
    loadChildren: () => import('./tabs-buton/tabs-buton.module').then( m => m.TabsButonPageModule)
  },  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },
  {
    path: 'agendar',
    loadChildren: () => import('./agendar/agendar.module').then( m => m.AgendarPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
