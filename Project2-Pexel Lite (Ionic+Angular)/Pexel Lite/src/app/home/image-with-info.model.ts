import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageWithInfo {
  id: string;
  name: string;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: string;
  liked: boolean;

  constructor() {
    this.id = '';
    this.name = '';
    this.width = 0;
    this.height = 0;
    this.url = '';
    this.photographer = '';
    this.photographer_url = '';
    this.photographer_id = 0;
    this.avg_color = '';
    this.src = '';
    this.liked = false;
  }
}
