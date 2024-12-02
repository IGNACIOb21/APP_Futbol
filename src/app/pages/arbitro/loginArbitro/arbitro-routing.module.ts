// arbitro-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbitroPage } from './arbitro.page';
const routes: Routes = [
  {
    path: '',
    component: ArbitroPage
  },
  {
    path: 'registro',
    loadChildren: () => import('./../../auth/registro/registro.module').then( m => m.RegistroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], // Solo exporta el RouterModule
})
export class ArbitroPageRoutingModule {}

