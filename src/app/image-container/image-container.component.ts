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

  recordDeath(image: number, event: MouseEvent) {
    this.events.recordDeath(image, event.offsetX, event.offsetY)
    console.log(this.events.events)
  }
}
