import { ElementRef } from '@angular/core'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { EventType, ImageSource, TCLEvent } from '../types'
import * as _ from 'lodash'
import { EventsService } from '../events.service'

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent implements OnInit {

  constructor(public events: EventsService) { }

  ngOnInit(): void {
  }

  recordDeath(image: number, event: MouseEvent) {
    this.events.recordDeath(image, event.offsetX, event.offsetY)
    console.log(this.events.events)
  }

  downloadEvents() {
    const contents = _.chain(this.events.events)
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
