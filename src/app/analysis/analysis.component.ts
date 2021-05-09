import { Component, OnInit } from '@angular/core';
import Plotly from 'plotly.js-dist'
import { EventsService } from '../events.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  constructor(public events: EventsService) { }

  ngOnInit(): void {
    this.loadImage()
   }

  async loadImage() {
    for (let i = 0; i < this.events.images.length; i++) {
    let x = this.events.eventsByImage[i].map(event => event.x)
    let y = this.events.eventsByImage[i].map(event => event.y)
    
    const img = new Image()
    const promise = new Promise(resolve => {
      img.onload = function() {
        let self = this as any
        resolve({width: self.width, height: self.height})
      }
    })
    img.src = this.events.images[i] as string

    const dimens : any = await promise
    const BUCKETS = 1000
    const yBuckets = Math.round(Math.sqrt(BUCKETS/(dimens.width/dimens.height)))
    const xBuckets = Math.round(BUCKETS / yBuckets)
    console.log({xBuckets, yBuckets})

    var trace1 = {
      x: x,
      y: y,
      mode: 'markers',
      name: 'points',
      marker: {
        color: 'rgb(256,0,0)',
        size: 2,
        symbol: 'circle',
      },
      type: 'scatter'
    };
    var trace2 = {
      x: x,
      y: y,
      name: 'density',
      ncontours: 100,
      colorscale: [[0, 'rgba(255, 255, 255, 0)'],
                   [0.33, 'rgba(255, 255, 0, 0.16)'],
                   [0.66, 'rgba(255, 0, 0, 0.33)'],
                  [1, 'rgba(0, 0, 0, 0.5)']],
      showscale: false,
      opacity: 0.7,
      type: 'histogram2dcontour',
      nbinsx: Math.round(dimens.width / 50),
      nbinsy: Math.round(dimens.height / 50),
      line: {
        width: 0
      }
    };
    var trace3 = {
      name: 'map',
      type: 'image',
      hoverinfo: 'none',
      source: this.events.images[i],
    };
    var data = [trace1, trace2, trace3];
    var layout = {
      showlegend: false,
      autosize: false,
      height: dimens.height,
      width: dimens.width,
      hovermode: 'closest',
      xaxis: {
        visible: false,
        rangemode: "nonnegative",
        range: [0, dimens.width],
      },
      yaxis: {
        visible: false,
        rangemode: "nonnegative",
        range: [dimens.height, 0],
      },
      bargap: 0,
      margin: {
        t: 0,
        b: 0,
        l: 0,
        r: 0,
      }
    };
    Plotly.newPlot('myDiv' + i, data, layout);
    }
  }

}
