import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  postImage(image: FormData) {
    console.log(image)
    return this.http.post("https://iyghe2c2kl.execute-api.ap-south-1.amazonaws.com/default/server-less-image-upload-dev-upload"
    ,image)
  }
}
