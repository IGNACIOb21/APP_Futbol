import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsArbitroPage } from './tabs-arbitro.page';

const routes: Routes = [
    {

    path: '',
    component: TabsArbitroPage,
    children: [
  {
      path: '',
      redirectTo: 'home-arbitro',  // Redirige a 'home' por defecto
      pathMatch: 'full'
    },
    {
      path: 'home-arbitro',
      loadChildren: () => import('./../home-arbitro/home-arbitro.module').then(m => m.HomeArbitroPageModule)
    },
    
    {
      path: 'configuracion-arbitro',
      loadChildren: () => import('./../configuracion-arbitro/configuracion-arbitro.module').then(m => m.ConfiguracionArbitroPageModule)
    },
    {
      path: 'estadistica-arbitro',
      loadChildren: () => import('./../estadistica-arbitro/estadistica-arbitro.module').then(m => m.EstadisticaArbitroPageModule)
    },
    {
      path: 'agenda-arbitro',
      loadChildren: () => import('./../agenda-arbitro/agenda-arbitro.module').then(m => m.AgendaArbitroPageModule)
    },
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsArbitroPageRoutingModule {}
