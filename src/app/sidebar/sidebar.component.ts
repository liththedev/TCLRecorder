import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';
import { EventsService } from '../events.service';
import { ImageSource } from '../types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  constructor(
    public events: EventsService,
    private changeDetector: ChangeDetectorRef) {
   }

  ngOnInit(): void {
    setInterval(() => this.changeDetector.detectChanges(), 100)
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
    const contents = _.chain(this.events.allEvents)
      .sortBy(event => event.timestamp)
      .map(event => 
        `${event.timestamp},${event.image},${event.x},${event.y},${event.type},${event.progress}`)
      .join('\n')
      .value()
    const blob = new Blob([contents], {type: 'text/csv'})
    const url = window.URL.createObjectURL(blob)
    let anchor = document.createElement("a")
    let name = prompt("File name?") || "events"
    anchor.download = name + ".csv"
    anchor.href = url
    anchor.click()
    window.URL.revokeObjectURL(url)
  }

  startTimer() {
    this.events.stopwatch.start()
  }

  stopTimer() {
    this.events.stopwatch.stop()
  }

  reset() {
    if (!confirm("This will reset the timer and all event data, are you sure?")) return
    this.events.stopwatch.reset()
    this.events.resetEvents()
  }

  getTimer() {
    return this.events.stopwatch.duration().format()
  }

  recordCP1() {
    this.events.recordCP1()
  }

  recordCP2() {
    this.events.recordCP2()
  }

  recordFinish() {
    this.events.recordFinish()
    this.events.stopwatch.stop()
  }

  undo() {
    this.events.undoLastEvent()
  }
}
