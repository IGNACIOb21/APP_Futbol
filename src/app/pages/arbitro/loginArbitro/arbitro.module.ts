// arbitro.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ArbitroPageRoutingModule } from './arbitro-routing.module';
import { ArbitroPage } from './arbitro.page';
import { SharedModule } from 'src/app/shared/shared.module'; // Importa SharedModule
import { AuthPageRoutingModule } from '../../auth/auth-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArbitroPageRoutingModule,
    AuthPageRoutingModule,
    SharedModule, // Aquí se importa el SharedModule
  ],
  declarations: [ArbitroPage]
})
export class ArbitroPageModule {}
