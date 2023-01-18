import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenucatalogoPageRoutingModule } from './menucatalogo-routing.module';

import { MenucatalogoPage } from './menucatalogo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenucatalogoPageRoutingModule
  ],
  declarations: [MenucatalogoPage]
})
export class MenucatalogoPageModule {}
