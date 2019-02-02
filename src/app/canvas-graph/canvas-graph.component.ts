import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas-graph',
  templateUrl: './canvas-graph.component.html',
  styleUrls: ['./canvas-graph.component.css']
})

export class CanvasGraphComponent implements OnInit {
  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;
  price = 20;
  canvasEl: HTMLCanvasElement;

  data = {
    title: "Time Series Graph",
    xLabel: 'Time in Secs',
    yLabel: 'Value',
    dataPoints: [{ x: '1', y: 90 }, { x: '2', y: 82 },
    { x: '3', y: 100 },
    { x: '4', y: 95 },
    { x: '5', y: 94 },
    { x: '6', y: 85 },
    { x: '7', y: 92.2 },
    { x: '8', y: 86.5 },
    { x: '9', y: 89.2 },
    { x: '9', y: 81 },
    { x: '10', y: 93.1 },
    { x: '11', y: 92 }]

  }


  constructor() { }

  ngOnInit() {
    this.price = 200;
  }

  ngAfterViewInit() {
    var margin = { top: 40, left: 75, right: 0, bottom: 75 };
    var chartHeight, chartWidth, yMax, xMax, data;
    var maxYValue = 0;
    var ratio = 0;
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    this.canvasEl.width = 600;
    this.canvasEl.height = 500;
    chartHeight = this.canvasEl.height;
    chartWidth = this.canvasEl.width;
    xMax = chartWidth - (margin.left + margin.right);
    yMax = chartHeight - (margin.top + margin.bottom);
    ratio = yMax / maxYValue;
    this.cx.fillRect(margin.left, margin.top, xMax - margin.left, yMax - margin.top);
    this.renderText(chartHeight, chartWidth, margin, yMax, xMax, this.data);
    this.renderLinesAndLabels(chartHeight, chartWidth, margin, yMax, xMax, this.data, maxYValue, ratio);
    this.renderData(xMax, this.data,margin,maxYValue,ratio);
    this.cx.fillStyle = 'black';
    // this.cx.fillStyle = "white";
    // this.cx.fillRect(0, 0, 600, 500);
    // this.cx.strokeStyle = "red";
  }


  renderText(chartHeight, chartWidth, margin, yMax, xMax, data) {
    var labelFont = (data.labelFont != null) ? data.labelFont : '20pt Arial';
    this.cx.font = labelFont;
    this.cx.textAlign = "center";

    //Title
    var txtSize = this.cx.measureText(data.title);
    this.cx.fillText(data.title, (chartWidth / 2), (margin.top / 2));

    //X-axis text
    txtSize = this.cx.measureText(data.xLabel);
    this.cx.fillText(data.xLabel, margin.left + (xMax / 2) - (txtSize.width / 2), yMax + (margin.bottom / 1.2));

    //Y-axis text
    this.cx.save();
    this.cx.rotate(-Math.PI / 2);
    this.cx.font = labelFont;
    this.cx.fillText(data.yLabel, (yMax / 2) * -1, margin.left / 4);
    this.cx.restore();
  }
  renderLinesAndLabels(chartHeight, chartWidth, margin, yMax, xMax, data, maxYValue, ratio) {
    var yInc = yMax / data.dataPoints.length;
    var yPos = 0;
    var yLabelInc = (maxYValue * ratio) / data.dataPoints.length;
    var xInc = this.getXInc(xMax, data);
    var xPos = margin.left;
    for (var i = 0; i < data.dataPoints.length; i++) {
      yPos += (i == 0) ? margin.top : yInc;
      //Draw horizontal lines
      this.drawLine(margin.left, yPos, xMax, yPos, '#fff');

      //y axis labels
      this.cx.font = (data.dataPointFont != null) ? data.dataPointFont : '10pt Calibri';
      var txt = Math.round(maxYValue - ((i == 0) ? 0 : yPos / ratio)).toString();
      var txtSize = this.cx.measureText(txt);
      this.cx.fillText(txt, margin.left - ((txtSize.width >= 14) ? txtSize.width : 10) - 7, yPos + 4);
      console.log(txt);
      //x axis labels
      txt = data.dataPoints[i].x;
      txtSize = this.cx.measureText(txt);
    
      this.cx.fillText(txt, xPos, yMax + (margin.bottom / 3));
      xPos += xInc;
    }

  }

  renderData(xMax, data,margin,maxYValue,ratio){
    var xInc = this.getXInc(xMax, data);
    var prevX = 0,
        prevY = 0;
        for (var i = 0; i < data.dataPoints.length; i++) {
          var pt = data.dataPoints[i];
          var ptY = (maxYValue - pt.y) * ratio;
          if (ptY < margin.top) ptY = margin.top;
          var ptX = (i * xInc) + margin.left;
  
          if (i > 0) {
            //Draw connecting lines
           this.drawLine(ptX, ptY, prevX, prevY, '#fff', 2);
          }

        }
  }
  drawLine(startX?, startY?, endX?, endY?, strokeStyle?, lineWidth?) {
    if (strokeStyle != null) this.cx.strokeStyle = strokeStyle;
    if (lineWidth != null) this.cx.lineWidth = lineWidth;
    this.cx.beginPath();
    this.cx.moveTo(startX, startY);
    this.cx.lineTo(endX, endY);
    this.cx.stroke();
    this.cx.closePath();
  }
  getMaxDataYValue(data, maxYValue) {
    for (var i = 0; i < data.dataPoints.length; i++) {
      if (data.dataPoints[i].y > maxYValue) maxYValue = data.dataPoints[i].y;
    }
  };
  getXInc(xMax, data) {
    return Math.round(xMax / data.dataPoints.length) - 1;
  };




}
