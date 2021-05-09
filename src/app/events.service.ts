import { Injectable } from '@angular/core';
import { EventType, FileData, TCLEvent } from './types';
import { stopwatch } from 'durations';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _images: FileData[] = []
  private _eventsByImage: TCLEvent[][] = []
  private _globalEvents: TCLEvent[] = []
  private _allEvents: TCLEvent[] = []

  private _stopwatch: any = stopwatch()

  constructor() { }

  get images() {
    return this._images
  }

  set images(images: FileData[]) {
    this._images = images
    this.resetEvents()
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

  set allEvents(events: TCLEvent[]) {
    this.resetEvents()
    this._allEvents = events
    events.forEach(event => {
      if (event.type === EventType.Death) {
        if (event.image >= this.images.length) {
          console.warn(`found events for unknown image ${event}`);
        } else {
          this.eventsByImage[event.image].push(event)
        }
      } else {
        this.globalEvents.push(event)
      }
    })
  }

  get stopwatch() {
    return this._stopwatch
  }

  recordDeath(image: number, x: number, y: number) {
    const timestamp = this.stopwatch.duration().seconds()
    const progress = prompt("%")
    if (!progress) return
    const event = {
      timestamp,
      image,
      x,
      y,
      type: EventType.Death,
      progress: Number.parseFloat(progress)
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
      type: EventType.CP1,
      progress: NaN
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
      type: EventType.CP2,
      progress: NaN
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
      type: EventType.Finish,
      progress: NaN
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

  resetEvents() {
    this._eventsByImage = []
    for (let i = 0; i < this.images.length; i++) {
      this._eventsByImage.push([])
    }
    this._globalEvents = []
    this._allEvents = []
  }

  eventsExist() {
    return this.allEvents.length > 0
  }

  imagesExist() {
    return this.images.length > 0
  }
}
