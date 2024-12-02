import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroArbitroPageRoutingModule } from './registro-arbitro-routing.module';

import { RegistroArbitroPage } from './registro-arbitro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroArbitroPageRoutingModule
  ],
  declarations: [RegistroArbitroPage]
})
export class RegistroArbitroPageModule {}
