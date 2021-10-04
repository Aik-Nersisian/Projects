import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouriteImagesPageRoutingModule } from './favourite-images-routing.module';

import { FavouriteImagesPage } from './favourite-images.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouriteImagesPageRoutingModule,
    SharedModule,
  ],
  declarations: [FavouriteImagesPage],
})
export class FavouriteImagesPageModule {}
