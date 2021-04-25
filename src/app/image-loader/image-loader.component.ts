import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { ImageSource } from '../types';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent implements OnInit {

  @Output()
  imagesLoadedEvent = new EventEmitter<any[]>()

  constructor() {
   }

  ngOnInit(): void {
  }

  onFileSelected(event: Event): void {
    let images: ImageSource[] = []
    const files = (event.target as HTMLInputElement).files || []
    for (let i = 0; i < files.length; i++) {
      const element = files[i]
      const reader = new FileReader()
      reader.onload = e => {
        if (e.target?.result) {
          images.push(e.target.result)

          // actually emit after the last image loads
          if (images.length === files.length){
            this.imagesLoadedEvent.emit(images);
          } 
        }
      }
      reader.readAsDataURL(element)
    }
  }
}