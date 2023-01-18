import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscuelaPage } from './escuela.page';

const routes: Routes = [
  {
    path: '',
    component: EscuelaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscuelaPageRoutingModule {}
