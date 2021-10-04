import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  NgZone,
} from '@angular/core';
import { TestService } from '../api/test.service';
import { Router } from '@angular/router';
import { IonContent, IonIcon, Platform } from '@ionic/angular';
import { ImageWithInfo } from './image-with-info.model';
import { createAnimation, Animation } from '@ionic/core';
import { AnimationController } from '@ionic/angular';
import { SqlStorageService } from '../sql/sql-storage.service';
import { ChangeDetectorRef } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { DetailsModalPage } from './../pages/details-modal/details-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('list', { read: ElementRef }) list: ElementRef;
  @ViewChild('loadingIcon', { read: ElementRef }) loadingIcon: ElementRef;
  @ViewChild('heart-outline') heartIcon: IonIcon;

  data: any = [];
  page = 1;
  maximumPages = 80;
  photographer_url: string;
  scrolled: boolean;
  name: string;
  images = [];
  createAnimation: any;
  dataTest: boolean = false;
  liked: boolean = false;
  likedCheck: boolean = false;
  source: string = '../../assets/icons/md-heart-empty.svg';
  flagosh: boolean = true;

  iconName: string;
  modalDataResponse: any;

  mainImages = [];
  imagess = [];
  constructor(
    private zone: NgZone,
    private changeDetection: ChangeDetectorRef,
    private sqlD: SqlStorageService,
    private animationCtrl: AnimationController,
    private testService: TestService,
    private router: Router,
    public imageObj: ImageWithInfo,
    public platform: Platform,
    public modalCtrl: ModalController
  ) {
    this.scrolled = false;
    this.name = '';
    this.platform
      .ready()
      .then(() => {
        this.sqlD.createDB();
      })
      .catch((error) => {
        console.log(error);
      });
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

  // test(image) {
  //   this.insertRow(image);
  // } for the "click-like"

  ionViewDidLeave() {
    this.flagosh = false;
    this.scrolled = false;
  }

  async ionViewWillEnter() {
    this.dataTest = false;
    if (this.flagosh) this.getCuratedPhotos();

    await this.sqlD.getRows().then((res) => {
      this.data = res;
    });

    if (!this.flagosh) {
      this.dataTest = false;
      this.images.length = 0;
      this.page = 1;
      this.getCuratedPhotos();
    }
    //this.mainImages = this.images
  }

  // ionViewDidEnter() {

  // }

  // checkImages() {
  //   this.sqlD.getRows().then((res) => {
  //     this.data = res;
  //     console.log(this.data);
  //     for (let i = 0; i < this.data.length; i++) {
  //       console.log('firstLoop');
  //       console.log(this.images.length);
  //       for (let k = 0; k < this.images.length; k++) {
  //         console.log('secondLoop');
  //         if (this.images[k].id == this.data[i].id) {
  //           this.images[k].liked = true;
  //           console.log(this.images[k].id + ' is Liked');
  //         } else {
  //           this.images[k].liked = false;
  //           console.log(this.images[k].id + ' is not Liked');
  //         }
  //       }
  //     }
  //   });
  // }

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

  // startLoad() {
  //   const loadingAnimation = this.animationCtrl
  //     .create('loading-animation')
  //     .addElement(this.list.nativeElement)
  //     .duration(1500)
  //     .fromTo('opacity', '1', '0.5');

  //   loadingAnimation.play();
  // }

  getCuratedPhotos(infiniteScroll?) {
    console.log('getCurrated photos function page - ' + this.page);
    this.testService.getCurratedImages(this.page).subscribe(
      (res) => {
        res.photos.forEach((element) => {
          this.changeDetection.detectChanges();
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
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }

        // this.images.forEach((element) => {
        //   console.log('images ifLiked:' + element.liked);
        // });
      },

      (error) => {
        console.log(error);
      }
    );
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

  // showDetails(imageId) {
  //   this.router.navigate(['tab-nav/home/image-details', imageId]);
  // }

  loadMore(infiniteScroll) {
    this.page++;
    console.log('loadMore function page - ' + this.page);
    this.getCuratedPhotos(infiniteScroll);
    if (this.page === this.maximumPages) {
      infiniteScroll.target.disabled = true;
    }
  }

  scroll(event) {
    if (event.detail.scrollTop == 0) {
      this.scrolled = false;
    } else {
      this.scrolled = true;
    }
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }

  insertRowTestLike(image) {
    image.liked = true;

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

    this.sqlD.getRows();
  }
}

// insertRow(image, sliding) {
//   image.liked = true;

//   this.sqlD.insertRow(
//     image.id,
//     image.name,
//     image.photographer,
//     image.photographer_url,
//     image.src,
//     image.liked
//   );

//   this.sqlD.getRows();
//   sliding.close();
// }

// flagog: boolean = false;
// getImagesFavs(id) {
//   this.sqlD.getRows().then((res) => {
//     this.data = res;
//   });

//   this.data.forEach((el) => {
//     if (el.id == id) {
//       console.log('fav id: ' + el.id + ' : ' + 'image id: ' + id);
//       this.flagog = true;
//     } else this.flagog = false;
//   });
// }

// checkImages() {
//   if (this.data.length != 0) {
//     for (let i = 0; i < this.data.length; i++) {
//       for (let k = 0; k < this.images.length; k++) {
//         if (this.images[k].id == this.data[i].id) {
//           this.images[k].liked = true;
//           console.log(this.images[k].id + ' is Liked');
//         } else {
//           this.images[k].liked = false;
//           console.log(this.images[k].id + ' is not Liked');
//         }
//       }
//     }
//   }
// }
// checkLikes(image): boolean {
//   let flag = false;

//   this.data.forEach((element) => {
//     console.log(element);
//     if (image.id == element.id) {
//       console.log('liked');
//       flag = true;
//     }
//   });
//   return flag;
//   if (this.data.length != 0) {
//     for (let i = 0; i < this.images.length; i++) {
//       for (let k = 0; k < this.data.length; k++) {
//         if (this.images[i].id == this.data[i].id) {
//           if (this.data[i].liked) {
//             this.images[i].liked = true;
//           }
//         }
//       }
//     }
//   }
// }
