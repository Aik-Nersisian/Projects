import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsModalPage } from './details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsModalPageRoutingModule {}
