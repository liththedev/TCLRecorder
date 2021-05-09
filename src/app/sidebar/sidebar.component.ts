import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';
import { EventsService } from '../events.service';
import { EventType, FileData, TCLEvent } from '../types';

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

  onImageFilesSelected(event: Event): void {
    this.loadFiles(event, true, files => this.events.images = files)
  }

  onEventFilesSelected(event: Event) {
    this.events.resetEvents()
    this.loadFiles(event, false, files => {
      let newEvents = _.chain(files)
        .flatMap(file => (file as string).split('\n'))
        .map(line => {
          let values = line.split(',')
          if (values.length < 5) {
            console.warn(`malformed input: ${line}`);
            return undefined
          }
          return {
            timestamp: Number.parseFloat(values[0]),
            image: Number.parseInt(values[1]),
            x: Number.parseInt(values[2]),
            y: Number.parseInt(values[3]),
            type: values[4] as EventType,
            progress: Number.parseFloat(values[5])
          }
        })
        .filter()
        .value()
      this.events.allEvents = newEvents as TCLEvent[]
    })
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
    let name = prompt("File name?")
    if (!name) return
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

  private loadFiles(event: Event, readAsData: boolean, callback: (files: FileData[]) => void): void {
    let files: FileData[] = []
    const fileList = (event.target as HTMLInputElement).files || []
    for (let i = 0; i < fileList.length; i++) {
      const element = fileList[i]
      const reader = new FileReader()
      reader.onload = e => {
        if (e.target?.result) {
          files.push(e.target.result)

          // actually emit after the last image loads
          // todo: handle errors
          if (files.length === fileList.length){
            callback.call(this, files)
          } 
        }
      }
      if (readAsData) 
        reader.readAsDataURL(element)
      else
        reader.readAsText(element)
    }
  }
}
