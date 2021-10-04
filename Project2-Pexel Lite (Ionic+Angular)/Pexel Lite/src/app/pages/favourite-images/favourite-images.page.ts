import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { SqlStorageService } from '../../sql/sql-storage.service';
import { ModalController } from '@ionic/angular';
import { DetailsModalPage } from '../details-modal/details-modal.page';

@Component({
  selector: 'app-favourite-images',
  templateUrl: './favourite-images.page.html',
  styleUrls: ['./favourite-images.page.scss'],
})
export class FavouriteImagesPage {
  @ViewChild(IonContent) content: IonContent;
  images: any;
  name_model: string;
  row_data: any = [];
  updateActive: boolean = false;
  dataTest: boolean;
  scrolled: boolean;

  constructor(
    public platform: Platform,
    private router: Router,
    private sqlD: SqlStorageService,
    public modalCtrl: ModalController
  ) {
    this.platform
      .ready()
      .then(() => {
        this.sqlD.createDB();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async ionViewWillEnter() {
    this.getRows();

    //this.images = this.storage.getAllImages();
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }

  scroll(event) {
    if (event.detail.scrollTop == 0) {
      this.scrolled = false;
    } else {
      this.scrolled = true;
    }
  }

  // deleteAllImages() {
  //   this.alertController
  //     .create({
  //       header: 'Danger!!!',
  //       message: 'Are sure you want to delete ALL TASKS?? ',
  //       buttons: [
  //         {
  //           text: 'delete',
  //           handler: () => {
  //             this.storage.deleteAllImages();
  //             this.images = this.storage.getAllImages();
  //           },
  //         },
  //         'Cancel',
  //       ],
  //     })
  //     .then((alert) => {
  //       alert.present();
  //     });
  // }

  // removeImage(imageToDelete: Image) {
  //   this.alertController
  //     .create({
  //       header: 'Danger!!!',
  //       message: 'Are sure you want to delete?? ',
  //       buttons: [
  //         {
  //           text: 'delete',
  //           handler: () => {
  //             this.storage.deleteOneImage(imageToDelete);
  //             this.images = this.storage.getAllImages();
  //           },
  //         },
  //         'Cancel',
  //       ],
  //     })
  //     .then((alert) => {
  //       alert.present();
  //     });
  // }

  // showDetails(imageId) {
  //   this.router.navigate(['tab-nav/favourite-images/image-details', imageId]);
  // }

  async showDetails(image) {
    const modal = await this.modalCtrl.create({
      component: DetailsModalPage,
      componentProps: {
        id: image.id,
        src: image.src,
        name: image.name,
        photographer_url: image.photographer_url,
        photographer: image.photographer,
        height: image.height,
        width: image.width,
        avg_color: image.avg_color,
      },
    });

    return await modal.present();
  }

  // ionViewWillEnter() {
  //   this.platform.ready().then(() => {
  //     this.createDB();
  //     this.createTable();
  //     this.getRows();
  //   });
  // }

  async getRows() {
    await this.sqlD.getRows().then((res) => {
      this.row_data = res;
    });
  }

  deleteRow(item) {
    this.sqlD.deleteRow(item);
    this.getRows();
  }

  enableUpdate(item) {
    this.sqlD.enableUpdate(item);
  }
}
