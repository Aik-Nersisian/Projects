// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: 'home',
//     loadChildren: () =>
//       import('./home/home.module').then((m) => m.HomePageModule),
//   },
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full',
//   },
//   {
//     path: 'image-details/:imageId',
//     loadChildren: () =>
//       import('./pages/image-details/image-details.module').then(
//         (m) => m.ImageDetailsPageModule
//       ),
//   },
//   {
//     path: 'favourite-images',
//     loadChildren: () =>
//       import('./pages/favourite-images/favourite-images.module').then(
//         (m) => m.FavouriteImagesPageModule
//       ),
//   },
//   {
//     path: 'tabnav',
//     loadChildren: () =>
//       import('./pages/tabnav/tabnav.module').then((m) => m.TabnavPageModule),
//   },
//   {
//     path: 'search',
//     loadChildren: () =>
//       import('./pages/search/search.module').then((m) => m.SearchPageModule),
//   },
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
//   ],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabnav/tabnav.module').then((m) => m.TabnavPageModule),
  },
  {
    path: 'image-details/:imageId',
    loadChildren: () =>
      import('./pages/image-details/image-details.module').then(
        (m) => m.ImageDetailsPageModule
      ),
  },
  {
    path: 'skeleton',
    loadChildren: () => import('./pages/skeleton/skeleton.module').then( m => m.SkeletonPageModule)
  },
  {
    path: 'details-modal',
    loadChildren: () => import('./pages/details-modal/details-modal.module').then( m => m.DetailsModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
