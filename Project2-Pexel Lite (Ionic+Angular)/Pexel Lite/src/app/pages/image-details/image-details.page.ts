import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/api/test.service';
import { StorageService } from 'src/app/storage/storage.service';
import { LoadingController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { SqlStorageService } from '../../sql/sql-storage.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.page.html',
  styleUrls: ['./image-details.page.scss'],
})
export class ImageDetailsPage implements OnInit {
  imageId: string;
  src: string;
  photographer: string;
  photographer_url: string;
  width: number;
  height: number;
  showButton: boolean;
  images: any[];
  imageName: string;
  liked: boolean;

  avg_color: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private storageService: StorageService,
    private loadingController: LoadingController,
    private router: Router,
    private sqlD: SqlStorageService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.imageId = this.activatedRoute.snapshot.paramMap.get('imageId');

    this.testService.getImage(this.imageId).subscribe(
      (data) => {
        this.imageName = data.url.slice(29);
        this.imageName = this.imageName.replace(/[^\w\s]/gi, ' ');
        this.imageName = this.imageName.replace(/[^A-Za-z]/g, ' ');
        this.imageName =
          this.imageName.charAt(0).toUpperCase() + this.imageName.slice(1);
        this.imageName = this.imageName.trim();
        this.src = data.src.landscape;
        this.liked = data.liked;
        this.photographer = data.photographer;
        this.photographer_url = data.photographer_url;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveNewImage() {
    var id = this.imageId;
    this.storageService.saveNewImage(id, this.src);
    this.router.navigate(['tab-nav']);
  }

  insertRow() {
    this.liked = true;
    console.log(
      this.imageId,
      this.imageName,
      this.photographer,
      this.photographer_url,
      this.src,
      this.liked
    );
    this.sqlD.insertRow(
      this.imageId,
      this.imageName,
      this.photographer,
      this.photographer_url,
      this.src,
      this.liked,
      this.height,
      this.width,
      this.avg_color
    );

    this.sqlD.getRows();
    this.router.navigate(['tab-nav']);
  }
}
