import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsModalPageRoutingModule } from './details-modal-routing.module';

import { DetailsModalPage } from './details-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsModalPageRoutingModule
  ],
  declarations: [DetailsModalPage]
})
export class DetailsModalPageModule {}
