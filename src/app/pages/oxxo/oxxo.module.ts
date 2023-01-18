import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OxxoPageRoutingModule } from './oxxo-routing.module';

import { OxxoPage } from './oxxo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OxxoPageRoutingModule
  ],
  declarations: [OxxoPage]
})
export class OxxoPageModule {}
