import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticaArbitroPage } from './estadistica-arbitro.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticaArbitroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticaArbitroPageRoutingModule {}
