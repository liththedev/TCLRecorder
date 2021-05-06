import { Component, OnInit } from '@angular/core'
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

  shiftUp(image: number) {
    if (image === 0 || this.events.eventsExist()) return
    let images = this.events.images;
    const imageToShift = images.splice(image, 1)[0]
    images.splice(image - 1, 0, imageToShift)
    this.events.images = images
  }

  shiftDown(image: number) {
    if (image === this.events.images.length - 1 || this.events.eventsExist()) return
    let images = this.events.images;
    const imageToShift = images.splice(image, 1)[0]
    images.splice(image + 1, 0, imageToShift)
    this.events.images = images
  }

  recordDeath(image: number, event: MouseEvent) {
    let progress = prompt("%") || "0"
    this.events.recordDeath(image, event.offsetX, event.offsetY, Number.parseFloat(progress))
    console.log(this.events.eventsByImage)
  }
}
