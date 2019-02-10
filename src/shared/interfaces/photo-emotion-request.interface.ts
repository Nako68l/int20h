export interface PhotoEmotionRequest {
  image_id: string;
  request_id: string;
  time_used: number;
  faces: Face[];
}

export interface Face {
  attributes: {
    emotion: Emotion
  };
  face_rectangle: {
    width: number;
    top: number;
    left: number;
    height: number
  };
  face_token: string;
}

export interface Emotion {
  sadness: number;
  neutral: number;
  disgust: number;
  anger: number;
  surprise: number;
  fear: number;
  happiness: number;
}

export interface PhotoEmotion {
  emotion: string;
  value: number;
}
