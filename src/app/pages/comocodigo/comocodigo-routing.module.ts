import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComocodigoPage } from './comocodigo.page';

const routes: Routes = [
  {
    path: '',
    component: ComocodigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComocodigoPageRoutingModule {}
