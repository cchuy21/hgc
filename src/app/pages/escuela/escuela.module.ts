import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscuelaPageRoutingModule } from './escuela-routing.module';

import { EscuelaPage } from './escuela.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscuelaPageRoutingModule
  ],
  declarations: [EscuelaPage]
})
export class EscuelaPageModule {}
