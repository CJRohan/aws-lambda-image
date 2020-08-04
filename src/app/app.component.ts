import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImageUploadService } from './image-upload.service';
import { Response } from './response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aws-lambda'
  wrongFormat = false
  uploaded = false
  loader = false
  imageLink = "";
  message = "Colud Not Upload";
  image = new File([""], "null");


  constructor(private uploadImage: ImageUploadService) {

  }

  imageFile(event) {
    this.image = event.target.files[0];
  }

  upload(form: NgForm) {
    console.log(form)
    console.log(form.value.image)
    console.log(this.image)

    const img: String = form.value.image
    if ((img.substr(img.length - 4) !== ".jpg" && img.substr(img.length - 4) !== ".JPG") && (img.substr(img.length - 5) !== ".JPEG" && img.substr(img.length - 5) !== ".jpeg")
      && !form.invalid) {
      console.log("Wrong Format")
      this.wrongFormat = true;
    } else {
      this.wrongFormat = false;
    }

    if (!this.wrongFormat && !form.invalid) {
      this.loader = true;
      let formData = new FormData();
      formData.append("Image", this.image);
      console.log(formData);
      this.uploadImage.postImage(formData).subscribe(res => {
        console.log(res)
        this.imageLink = (<Response>res).url;
      }, error => {
        console.log(error)
        this.uploaded = true;
        this.message = "Could Not Upload"
      }, () => {
        this.uploaded = true;
        this.message = "Uploaded Successfully"
        form.reset()
      })

    }
  }

}
