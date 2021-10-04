import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: '563492ad6f91700001000001f14143e2a4ee4d32bbdd518760bc2432',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getData(search, page): Observable<any> {
    const url =
      'https://api.pexels.com/v1/search?query=' +
      search +
      '&page=' +
      page +
      '&per_page=' +
      30;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error.message || 'Server Error');
  }

  getImage(imageId) {
    const imageUrl = 'https://api.pexels.com/v1/photos/' + imageId;

    return this.http
      .get<any>(imageUrl, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCurratedImages(page) {
    const url =
      'https://api.pexels.com/v1/curated?' + 'page=' + page + '&per_page=' + 30;

    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
