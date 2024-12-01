import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeArbitroPage } from './home-arbitro.page';

const routes: Routes = [
  {
    path: '',
    component: HomeArbitroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeArbitroPageRoutingModule {}
