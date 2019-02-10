export interface FlickrRes {
  stat: string;
}


export interface Photos extends FlickrRes {
  photos: PhotosPagination;
}

export interface PhotosPagination {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: Photo[];
  stat: string;
}

export interface Photo {
  id: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  url?: string;
  emotion?: string;
  isprimary: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface AlbumPhotos extends FlickrRes {
  photoset: Photoset;
}

export interface Photoset extends PhotosPagination {
  id: string;
  primary: string;
  owner: string;
  ownername: string;
  per_page: number;
  title: string;
}



