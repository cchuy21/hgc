import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverycodePageRoutingModule } from './recoverycode-routing.module';

import { RecoverycodePage } from './recoverycode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverycodePageRoutingModule
  ],
  declarations: [RecoverycodePage]
})
export class RecoverycodePageModule {}
