import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticaArbitroPageRoutingModule } from './estadistica-arbitro-routing.module';

import { EstadisticaArbitroPage } from './estadistica-arbitro.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticaArbitroPageRoutingModule,
    SharedModule
  ],
  declarations: [EstadisticaArbitroPage]
})
export class EstadisticaArbitroPageModule {}
