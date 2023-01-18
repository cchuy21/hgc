import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverycodePage } from './recoverycode.page';

const routes: Routes = [
  {
    path: '',
    component: RecoverycodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverycodePageRoutingModule {}
