import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresaynegocioPage } from './empresaynegocio.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaynegocioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaynegocioPageRoutingModule {}
