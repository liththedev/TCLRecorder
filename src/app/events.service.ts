import { Injectable } from '@angular/core';
import { EventType, ImageSource, TCLEvent } from './types';
import { stopwatch } from 'durations';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _images: ImageSource[] = []
  private _eventsByImage: TCLEvent[][] = []
  private _globalEvents: TCLEvent[] = []
  private _allEvents: TCLEvent[] = []

  private _stopwatch: any = stopwatch()

  constructor() { }

  get images() {
    return this._images
  }

  set images(images: ImageSource[]) {
    this._images = images
    this._eventsByImage = []
    for (let i = 0; i < images.length; i++) {
      this._eventsByImage.push([])
    }
    console.log(this._eventsByImage)
  }

  get eventsByImage() {
    return this._eventsByImage
  }

  get globalEvents() {
    return this._globalEvents
  }

  get allEvents() {
    return this._allEvents
  }

  get stopwatch() {
    return this._stopwatch
  }

  recordDeath(image: number, x: number, y: number) {
    const event = {
      timestamp: this.stopwatch.duration().seconds(),
      image,
      x,
      y,
      type: EventType.Death
    }
    this._eventsByImage[image].push(event)
    this._allEvents.push(event)
  }

  recordCP1() {
    const event = {
      timestamp: this.stopwatch.duration().seconds(),
      image: NaN,
      x: NaN,
      y: NaN,
      type: EventType.CP1
    }
    this._globalEvents.push(event)
    this._allEvents.push(event)
  }

  recordCP2() {
    const event = {
      timestamp: this.stopwatch.duration().seconds(),
      image: NaN,
      x: NaN,
      y: NaN,
      type: EventType.CP2
    }
    this._globalEvents.push(event)
    this._allEvents.push(event)
  }

  recordFinish() {
    const event = {
      timestamp: this.stopwatch.duration().seconds(),
      image: NaN,
      x: NaN,
      y: NaN,
      type: EventType.Finish
    } 
    this._globalEvents.push(event)
    this._allEvents.push(event)
  }

  undoLastEvent() {
    if (this._allEvents.length === 0) return
    const eventToRemove = this._allEvents.pop()
    for (let i = 0; i < this.eventsByImage.length; i++) {
      _.pull(this.eventsByImage[i], eventToRemove)
    }
    _.pull(this.globalEvents, eventToRemove)
  }
}
