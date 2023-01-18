import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciaexitoPageRoutingModule } from './iniciaexito-routing.module';

import { IniciaexitoPage } from './iniciaexito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciaexitoPageRoutingModule
  ],
  declarations: [IniciaexitoPage]
})
export class IniciaexitoPageModule {}
