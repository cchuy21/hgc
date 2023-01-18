import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OportunidadesPageRoutingModule } from './oportunidades-routing.module';

import { OportunidadesPage } from './oportunidades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OportunidadesPageRoutingModule
  ],
  declarations: [OportunidadesPage]
})
export class OportunidadesPageModule {}
