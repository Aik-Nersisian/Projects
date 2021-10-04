import { Component, ViewChild } from '@angular/core';
import { TestService } from '../../api/test.service';
import { Router } from '@angular/router';
import { IonContent, Platform } from '@ionic/angular';
import { ImageWithInfo } from 'src/app/home/image-with-info.model';
import { SqlStorageService } from '../../sql/sql-storage.service';
import { ToastController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { ModalController } from '@ionic/angular';
import { DetailsModalPage } from '../details-modal/details-modal.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('search') search: any;

  searchName: string;
  searchNameOld: string;
  data: any = [];
  page = 1;
  maximumPages = 80;
  photographer_url: string;
  flag: boolean;
  scrolled: boolean;
  name: string;
  images = [];

  oneTime: boolean;

  dataTest: boolean = true;

  modalDataResponse: any;

  constructor(
    public modalCtrl: ModalController,
    public toastController: ToastController,
    private testService: TestService,
    private router: Router,
    public imageObj: ImageWithInfo,
    private sqlD: SqlStorageService,
    public platform: Platform
  ) {
    this.searchName = '';
    this.searchNameOld = '';
    this.flag = false;
    this.scrolled = false;
    this.name = '';
    this.oneTime = true;
    this.platform
      .ready()
      .then(() => {
        this.sqlD.createDB();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  flagosh: boolean = true;
  async ionViewWillEnter() {
    await this.sqlD.getRows().then((res) => {
      this.data = res;
    });
  }

  ionViewDidEnter() {
    if (!this.flagosh && this.searchName != '') {
      this.images.length = 0;

      this.page = 1;

      this.searchPhotos();
    }
  }

  ionViewDidLeave() {
    this.flagosh = false;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No matches',
      duration: 900,
      cssClass: 'toast-message',
    });

    toast.present();
  }

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

  searchPhotos() {
    if (this.searchName) {
      this.dataTest = false;
      this.images.length = 0;
      this.page = 1;

      if (this.searchName != '') {
        this.testService.getData(this.searchName, this.page).subscribe(
          (res) => {
            if (res.photos.length == 0) {
              this.dataTest = true;
              this.presentToast();
              return;
            }
            res.photos.forEach((element) => {
              this.dataTest = false;
              this.imageObj = new ImageWithInfo();
              this.name = element.url.slice(29);
              this.name = this.name.replace(/[^\w\s]/gi, ' ');
              this.name = this.name.replace(/[^A-Za-z]/g, ' ');
              this.name = this.name.trim();
              this.imageObj.name =
                this.name.charAt(0).toUpperCase() + this.name.slice(1);
              this.imageObj.id = element.id;
              this.imageObj.src = element.src.landscape;
              this.imageObj.photographer_url = element.photographer_url;
              this.imageObj.photographer = element.photographer;
              this.imageObj.height = element.height;
              this.imageObj.width = element.width;
              this.imageObj.avg_color = element.avg_color;
              this.imageObj.liked = this.checkIfLiked(this.imageObj.id);
              this.images.push(this.imageObj);
            });
            this.dataTest = true;
          },
          (error) => {
            console.log(error);
          }
        );
      }
      Keyboard.hide();
    } else {
      this.dataTest = true;
    }
  }

  checkIfLiked(id): boolean {
    let flag = false;

    this.data.forEach((element) => {
      if (element.id == id) {
        flag = true;
      }
    });

    return flag;
  }

  searchPhotosWhenScrolled(infiniteScroll?) {
    this.testService.getData(this.searchName, this.page).subscribe(
      (res) => {
        res.photos.forEach((element) => {
          this.imageObj = new ImageWithInfo();
          this.name = element.url.slice(29);
          this.name = this.name.replace(/[^\w\s]/gi, ' ');
          this.name = this.name.replace(/[^A-Za-z]/g, ' ');
          this.name = this.name.trim();
          this.imageObj.name =
            this.name.charAt(0).toUpperCase() + this.name.slice(1);

          this.imageObj.id = element.id;
          this.imageObj.src = element.src.landscape;
          this.imageObj.photographer_url = element.photographer_url;
          this.imageObj.photographer = element.photographer;
          this.imageObj.liked = false;
          this.imageObj.height = element.height;

          this.imageObj.width = element.width;
          this.imageObj.avg_color = element.avg_color;

          this.images.push(this.imageObj);
        });

        if (infiniteScroll) {
          infiniteScroll.target.complete();
          this.flag = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //showDetails(imageId) {
  //this.router.navigate(['image-details', imageId]);
  //}

  loadMore(infiniteScroll) {
    this.page++;
    this.flag = true;

    this.searchPhotosWhenScrolled(infiniteScroll);

    if (this.page === this.maximumPages) {
      infiniteScroll.target.disabled = true;
    }
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }

  test(image) {
    console.log('function Test called');
    if (!image.liked) {
      console.log('Not Liked- Liking....');
      image.liked = true;
      this.insertRowTestLike(image);
    } else {
      this.data.forEach((element) => {
        if (element.id == image.id) {
          image.liked = false;
          this.sqlD.deleteRow(element);

          console.log('Liked- Removing....');
        }
      });
    }

    this.sqlD.getRows().then((res) => {
      this.data = res;
    });
  }

  insertRowTestLike(image) {
    this.sqlD.insertRow(
      image.id,
      image.name,
      image.photographer,
      image.photographer_url,
      image.src,
      image.liked,
      image.height,
      image.width,
      image.avg_color
    );
  }

  scroll(event) {
    if (event.detail.scrollTop == 0) {
      this.scrolled = false;
    } else {
      this.scrolled = true;
    }
  }
}
