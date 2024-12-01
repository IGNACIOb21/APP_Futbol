import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileArbitroPage } from './profile-arbitro.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileArbitroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileArbitroPageRoutingModule {}
