import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { EventsService } from '../events.service';
import { ImageSource } from '../types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private events: EventsService) {
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
          // todo: handle errors
          if (images.length === files.length){
            this.events.images = images;
          } 
        }
      }
      reader.readAsDataURL(element)
    }
  }

  downloadEvents() {
    const contents = _.chain(this.events.events)
      .flatten()
      .sortBy(event => event.timestamp)
      .map(event => 
        `${event.timestamp.getTime()},${event.image},${event.x},${event.y},${event.type}`)
      .join('\n')
      .value()
    const blob = new Blob([contents], {type: 'text/csv'})
    const url = window.URL.createObjectURL(blob)
    let anchor = document.createElement("a")
    anchor.download = "events.csv"
    anchor.href = url
    anchor.click()
    window.URL.revokeObjectURL(url)
  }
}
