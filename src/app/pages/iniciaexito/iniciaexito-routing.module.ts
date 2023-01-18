import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciaexitoPage } from './iniciaexito.page';

const routes: Routes = [
  {
    path: '',
    component: IniciaexitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciaexitoPageRoutingModule {}
