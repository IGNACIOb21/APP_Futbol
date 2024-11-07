import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule, // Asegúrate de importar HttpClientModule
    HomePageRoutingModule,
    // para usar los servicios de shered
    SharedModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
