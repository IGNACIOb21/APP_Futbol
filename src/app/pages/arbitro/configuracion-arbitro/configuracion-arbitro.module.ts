import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionArbitroPageRoutingModule } from './configuracion-arbitro-routing.module';

import { ConfiguracionArbitroPage } from './configuracion-arbitro.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionArbitroPageRoutingModule,
    SharedModule
  ],
  declarations: [ConfiguracionArbitroPage]
})
export class ConfiguracionArbitroPageModule {}
