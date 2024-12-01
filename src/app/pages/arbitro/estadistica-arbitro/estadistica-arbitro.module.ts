import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticaArbitroPageRoutingModule } from './estadistica-arbitro-routing.module';

import { EstadisticaArbitroPage } from './estadistica-arbitro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticaArbitroPageRoutingModule
  ],
  declarations: [EstadisticaArbitroPage]
})
export class EstadisticaArbitroPageModule {}
