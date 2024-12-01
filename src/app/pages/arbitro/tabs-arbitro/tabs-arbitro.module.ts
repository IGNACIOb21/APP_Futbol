import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsArbitroPageRoutingModule } from './tabs-arbitro-routing.module';

import { TabsArbitroPage } from './tabs-arbitro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsArbitroPageRoutingModule
  ],
  declarations: [TabsArbitroPage]
})
export class TabsArbitroPageModule {}
