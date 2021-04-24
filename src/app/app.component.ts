import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TCLRecorder';

  images: any[] = []

  setImages(images: any[]) {
    this.images = images
  }
}
