import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComocodigoPageRoutingModule } from './comocodigo-routing.module';

import { ComocodigoPage } from './comocodigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComocodigoPageRoutingModule
  ],
  declarations: [ComocodigoPage]
})
export class ComocodigoPageModule {}
