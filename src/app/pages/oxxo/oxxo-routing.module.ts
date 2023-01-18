import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OxxoPage } from './oxxo.page';

const routes: Routes = [
  {
    path: '',
    component: OxxoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OxxoPageRoutingModule {}
