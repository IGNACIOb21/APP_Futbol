import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroArbitroPage } from './registro-arbitro.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroArbitroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroArbitroPageRoutingModule {}
