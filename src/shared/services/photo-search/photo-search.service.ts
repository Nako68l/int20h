import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FLICKR_REQUEST_METHOD } from '../../enums/flickr/flickr-request-method.enum';
import { evoFlickrAlbumId, evoFlickrTag, evoFlickrUserId } from '../../hard-data/hard-ids';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { AlbumPhotos, Photos, Photoset, PhotosPagination } from '../../interfaces/photos.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoSearchService {

  flickr: any;

  constructor(
    private http: HttpClient
  ) {
  }

  getPhotos(page, per_page): Observable<PhotosPagination> {
    const params = {
      ...this.defaultParams,
      method: FLICKR_REQUEST_METHOD.PhotosSearch,
      tags: evoFlickrTag,
      page,
      per_page
    };
    return this.http.get<Photos>(environment.flickrApiUrl, { params })
      .pipe(pluck('photos'));
  }

  getPhotoset(page, per_page): Observable<Photoset> {
    const params = {
      ...this.defaultParams,
      method: FLICKR_REQUEST_METHOD.AlbumPhotos,
      photoset_id: evoFlickrAlbumId,
      user_id: evoFlickrUserId,
      page,
      per_page
    };
    return this.http.get<AlbumPhotos>(environment.flickrApiUrl, { params })
      .pipe(pluck('photoset'));
  }

  get defaultParams() {
    return {
      api_key: environment.flickrApiKey,
      format: 'json',
      nojsoncallback: '1',
    };
  }
}
