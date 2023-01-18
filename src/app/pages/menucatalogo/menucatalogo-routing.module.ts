import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenucatalogoPage } from './menucatalogo.page';

const routes: Routes = [
  {
    path: '',
    component: MenucatalogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenucatalogoPageRoutingModule {}
