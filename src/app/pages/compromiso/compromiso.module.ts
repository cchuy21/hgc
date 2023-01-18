import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompromisoPageRoutingModule } from './compromiso-routing.module';

import { CompromisoPage } from './compromiso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompromisoPageRoutingModule
  ],
  declarations: [CompromisoPage]
})
export class CompromisoPageModule {}
