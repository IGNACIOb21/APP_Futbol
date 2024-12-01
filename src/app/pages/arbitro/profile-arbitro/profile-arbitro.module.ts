import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileArbitroPageRoutingModule } from './profile-arbitro-routing.module';

import { ProfileArbitroPage } from './profile-arbitro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileArbitroPageRoutingModule
  ],
  declarations: [ProfileArbitroPage]
})
export class ProfileArbitroPageModule {}
