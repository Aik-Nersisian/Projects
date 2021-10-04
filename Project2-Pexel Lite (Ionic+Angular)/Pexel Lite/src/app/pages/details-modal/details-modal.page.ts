import { AvatarServiceService } from './../../api/avatars/avatar-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.page.html',
  styleUrls: ['./details-modal.page.scss'],
})
export class DetailsModalPage implements OnInit {
  @Input() id: string;
  @Input() src: string;
  @Input() name: string;
  @Input() photographer_url: string;
  @Input() photographer: string;
  @Input() height: number;
  @Input() width: number;
  @Input() avg_color: string;

  svg: any;
  constructor(
    private modalCtr: ModalController,
    private avatarService: AvatarServiceService
  ) {}

  ngOnInit() {
    console.log(this.avg_color);
    let background = '23' + this.avg_color.slice(1, 7);
    this.svg =
      this.avatarService.getAvatar(this.photographer_url) + '?colors[]=teal';
  }

  async close() {
    await this.modalCtr.dismiss();
  }

  async openPhotographerPage(url) {
    await Browser.open({ url: url });
  }
}
