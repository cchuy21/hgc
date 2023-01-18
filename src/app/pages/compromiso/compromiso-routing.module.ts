import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompromisoPage } from './compromiso.page';

const routes: Routes = [
  {
    path: '',
    component: CompromisoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompromisoPageRoutingModule {}
