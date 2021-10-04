import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

import { TabnavPage } from './tabnav.page';

const routes: Routes = [
  {
    path: 'tab-nav',
    component: TabnavPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'favourite-images',
        loadChildren: () =>
          import('../favourite-images/favourite-images.module').then(
            (m) => m.FavouriteImagesPageModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then((m) => m.SearchPageModule),
      },
      {
        path: 'home/image-details/:imageId',
        loadChildren: () =>
          import('../image-details/image-details.module').then(
            (m) => m.ImageDetailsPageModule
          ),
      },
      {
        path: 'favourite-images/image-details/:imageId',
        loadChildren: () =>
          import('../image-details/image-details.module').then(
            (m) => m.ImageDetailsPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tab-nav/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavPageRoutingModule {}
