import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeArbitroPageRoutingModule } from './home-arbitro-routing.module';

import { HomeArbitroPage } from './home-arbitro.page';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    SharedModule,
    HomeArbitroPageRoutingModule
  ],
  declarations: [HomeArbitroPage]
})
export class HomeArbitroPageModule {}
