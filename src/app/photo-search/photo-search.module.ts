import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoSearchComponent } from './photo-search.component';
import { PhotosInfiniteScrollComponent } from './components/photos-infinite-scroll/photos-infinite-scroll.component';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [PhotoSearchComponent, PhotosInfiniteScrollComponent],
  exports: [PhotoSearchComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PhotoSearchModule { }
