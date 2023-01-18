import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresaynegocioPageRoutingModule } from './empresaynegocio-routing.module';

import { EmpresaynegocioPage } from './empresaynegocio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresaynegocioPageRoutingModule
  ],
  declarations: [EmpresaynegocioPage]
})
export class EmpresaynegocioPageModule {}
