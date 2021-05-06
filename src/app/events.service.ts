import { Injectable } from '@angular/core';
import { EventType, ImageSource, TCLEvent } from './types';
import { stopwatch } from 'durations';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _images: ImageSource[] = []
  private _events: TCLEvent[][] = []

  private _stopwatch: any = stopwatch()

  constructor() { }

  get images() {
    return this._images
  }

  set images(images: ImageSource[]) {
    this._images = images
    this._events = []
    for (let i = 0; i < images.length; i++) {
      this._events.push([])
    }
    console.log(this._events)
  }

  get events() {
    return this._events
  }

  get stopwatch() {
    return this._stopwatch
  }

  recordDeath(image: number, x: number, y: number) {
    this._events[image].push({
      timestamp: this.stopwatch.duration().seconds(),
      image,
      x,
      y,
      type: EventType.Death
    })
  }
}
