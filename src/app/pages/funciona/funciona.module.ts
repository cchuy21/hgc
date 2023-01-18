import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuncionaPageRoutingModule } from './funciona-routing.module';

import { FuncionaPage } from './funciona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuncionaPageRoutingModule
  ],
  declarations: [FuncionaPage]
})
export class FuncionaPageModule {}
