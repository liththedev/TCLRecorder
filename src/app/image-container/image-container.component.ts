import { ElementRef } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EventType, ImageSource, TCLEvent } from '../types';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent implements OnInit {

  @Input()
  images: ImageSource[] = []

  events: TCLEvent[] = []

  constructor() {}

  ngOnInit(): void {
  }

  recordEvent(image: number, event: MouseEvent) {
    this.events.push({
      timestamp: new Date(),
      image: image,
      x: event.offsetX,
      y: event.offsetY,
      type: EventType.Death
    })
  }

  downloadEvents() {
    console.log(this.events)
    const contents = this.events.map(event => 
      `${event.timestamp.getTime()},${event.image},${event.x},${event.y},${event.type}`
    ).join('\n')
    console.log(contents)
    const blob = new Blob([contents], {type: 'text/csv'})
    const url = window.URL.createObjectURL(blob)
    let anchor = document.createElement("a")
    anchor.download = "events.csv"
    anchor.href = url
    anchor.click()
    window.URL.revokeObjectURL(url)
  }

}
