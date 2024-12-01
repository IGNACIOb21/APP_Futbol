import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionArbitroPage } from './configuracion-arbitro.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionArbitroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionArbitroPageRoutingModule {}
