import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, mergeMap, pluck, tap, throttleTime } from 'rxjs/operators';
import { PhotoSearchService } from '../../../../shared/services/photo-search/photo-search.service';
import { getFlickrPhotoUrl } from '../../../../shared/helpers/helper-functions';
import { Photo } from '../../../../shared/interfaces/photos.interface';
import { flatten } from '@angular/compiler';
import { PhotoEmotionsService } from '../../../../shared/services/photo-emotions/photo-emotions.service';

@Component({
  selector: 'app-photos-infinite-scroll',
  templateUrl: './photos-infinite-scroll.component.html',
  styleUrls: ['./photos-infinite-scroll.component.scss']
})
export class PhotosInfiniteScrollComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  batch = 10;
  photosetEnd = false;
  photosEnd = false;

  offset = new BehaviorSubject<number>(1);
  // infinite: Observable<Photo[]>;
  photos: Photo[] = [];

  constructor(
    private photoSearchService: PhotoSearchService,
    private photoEmotionsService: PhotoEmotionsService,
  ) {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(offset => this.getBatch(offset)),
      // scan((acc, batch) => {
      //   console.log('acc batch', acc, batch);
      //   return { ...acc, ...batch };
      // }, {}));
    ).subscribe(async batch => {
      const batchArray = Object.values(batch);
      for (const photo of batchArray) {
        photo.emotion = await this.photoEmotionsService.getPhotoEmotion(photo.url).pipe(pluck('emotion')).toPromise() as string;
        this.photos.push(photo);
        console.log('this.photos', this.photos);
      }
    });
  }

  ngOnInit() {
  }

  getBatch(offset): Observable<{ [id: number]: Photo }> {
    const photoSources: Observable<Photo[]>[] = [];

    if (!this.photosetEnd) {
      photoSources.push(
        this.photoSearchService.getPhotoset(offset, this.batch).pipe(
          tap(source => this.photosetEnd = this.isSourceEnd(source)),
          pluck('photo')
        )
      );
    }
    if (!this.photosEnd) {
      photoSources.push(
        this.photoSearchService.getPhotos(offset, this.batch).pipe(
          tap(source => this.photosEnd = this.isSourceEnd(source)),
          pluck('photo')
        )
      );
    }

    if (!photoSources.length) {
      return;
    }

    return this.mergeSources(photoSources);
  }

  mergeSources(photoSources: Observable<Photo[]>[]): Observable<{ [id: number]: Photo }> {
    return forkJoin(photoSources).pipe(
      map(photos => this.mapToUniquePhotos(photos)),
    );
  }

  mapToUniquePhotos = (photos: Photo[][]): { [id: number]: Photo } => {
    const flattenPhotos = flatten(photos);
    return flattenPhotos.reduce((acc, photo: Photo) => {
      const id = photo.id;
      photo.url = getFlickrPhotoUrl(photo);
      return { ...acc, [id]: photo };
    }, {});
  };

  isSourceEnd({ page, perpage, total }) {
    console.log('total', page, total);
    return page * perpage >= total;
  }

  nextBatch(event, offset) {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${ end }, '>=', ${ total }`);
    if (end === total) {
      this.offset.next(offset);
    }
  }

  trackByFn(photo: Photo) {
    console.log('ph', photo);
    return photo.id;
  }
}
