import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class AvatarServiceService {
  constructor(private http: HttpClient) {}

  getAvatar(seed) {
    return 'https://avatars.dicebear.com/api/bottts/' + seed + '.svg';
  }
  handleError(error) {
    return throwError(error.message || 'Server Error');
  }
}
