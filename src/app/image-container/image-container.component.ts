import { ElementRef } from '@angular/core'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { EventType, ImageSource, TCLEvent } from '../types'
import * as _ from 'lodash'

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent implements OnInit {

  _images: ImageSource[] = []
  events: TCLEvent[][] = []

  constructor() {}

  ngOnInit(): void {
  }

  @Input()
  set images(value: ImageSource[]) {
    this._images = value
    this.events = new Array(value.length)
    for (let i = 0; i < value.length; i++) {
      this.events[i] = []
    }
    console.log(this.events)
  }

  get images() {
    return this._images
  }


  recordEvent(image: number, event: MouseEvent) {
    this.events[image].push({
      timestamp: new Date(),
      image: image,
      x: event.offsetX,
      y: event.offsetY,
      type: EventType.Death
    })
    console.log(this.events)
  }

  downloadEvents() {
    const contents = _.chain(this.events)
      .flatten()
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
