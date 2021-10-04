import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouriteImagesPage } from './favourite-images.page';

const routes: Routes = [
  {
    path: '',
    component: FavouriteImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouriteImagesPageRoutingModule {}
