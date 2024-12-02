import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaArbitroPage } from './agenda-arbitro.page';

const routes: Routes = [
  {
    path: '',
    component: AgendaArbitroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaArbitroPageRoutingModule {}
