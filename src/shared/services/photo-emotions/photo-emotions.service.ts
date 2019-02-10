import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Face, PhotoEmotion, PhotoEmotionRequest } from '../../interfaces/photo-emotion-request.interface';
import { environment } from '../../../environments/environment';
import { map, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PhotoEmotionsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getPhotoEmotion(image_url): Observable<PhotoEmotion> {
    const params = {
      ...this.defaultBody,
      image_url,
      // return_attributes: FACEPP_RETURN_ATTRIBUTE.Emotion
      return_attributes: 'emotion'
    };
    return this.http.post<PhotoEmotionRequest>(environment.faceppApiUrl, {}, { params }).pipe(
    // return this.http.post<PhotoEmotionRequest>('/api/facepp/v3/detect?api_key=x4tBNQQSe8zpwEZTm0DHVaX73B9z2AO7&api_secret=CZXWq66VkaefFBiCX1FMWdz_Y8lQMxTB&image_url=https://farm6.staticflickr.com/5747/30323171370_edf2e3f800.jpg&return_attributes=emotion', {}).pipe(
      pluck('faces'),
      map((faces: Face[]) => this.getBiggestFacesEmotion(faces))
    );
  }

  getBiggestFacesEmotion = faces => {
    let photoBiggestEmotion = {
      emotion: '',
      value: 0
    };
    faces.forEach(face => {
      const faceEmotion = this.getFaceEmotion(face);
      if (faceEmotion.value > photoBiggestEmotion.value) {
        photoBiggestEmotion = faceEmotion;
      }
    });
    return photoBiggestEmotion;
  };


  getFaceEmotion(face: Face) {
    const emotionObj = face.attributes.emotion;
    const emotionMap = new Map(Object.entries(emotionObj));
    let biggestEmotion = {
      emotion: '',
      value: 0
    };
    emotionMap.forEach((value: number, emotion) => {
      if (value > biggestEmotion.value) {
        biggestEmotion = { emotion, value };
      }
    });
    return biggestEmotion;
  }

  get defaultBody() {
    return {
      api_key: environment.faceppApiKey,
      api_secret: environment.faceppApiSecret,
    };
  }
}
