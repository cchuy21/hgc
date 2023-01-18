import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YosoyPageRoutingModule } from './yosoy-routing.module';

import { YosoyPage } from './yosoy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YosoyPageRoutingModule
  ],
  declarations: [YosoyPage]
})
export class YosoyPageModule {}
