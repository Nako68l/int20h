import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosInfiniteScrollComponent } from './photos-infinite-scroll.component';

describe('PhotosInfiniteScrollComponent', () => {
  let component: PhotosInfiniteScrollComponent;
  let fixture: ComponentFixture<PhotosInfiniteScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosInfiniteScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
