import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas-time-series',
  templateUrl: './canvas-time-series.component.html',
  styleUrls: ['./canvas-time-series.component.css']
})
export class CanvasTimeSeriesComponent implements OnInit {
  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;
  canvasEl: any;

  margin = { top: 40, left: 75, right: 0, bottom: 75 };
  chartHeight: any;
  chartWidth: any;
  yMax: any;
  xMax: any;
  data: any;
  yInc: any;
  xInc: any;
  yPos=0;
  xPos: any;
  maxYValue = 0;
  ratio = 0;
  prevX = 0;
  prevY = 0;


  graphObject = {
    title: "Time Series Graph",
    xLabel: 'Time ',
    yLabel: 'Value',
    data: []
  }

  constructor() { }


  setChartDimension() {
    // console.log(this.canvas);
    this.getMaxDataYValue();
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    // console.log(this.cx );
    this.canvasEl.width = 600;
    this.canvasEl.height = 500;
    this.chartHeight = this.canvasEl.height;
    this.chartWidth = this.canvasEl.width;
    this.xMax = this.chartWidth - (this.margin.left + this.margin.right);
    this.yMax = this.chartHeight - (this.margin.top + this.margin.bottom);
    this.ratio = this.yMax / this.maxYValue;



  }
  setBackgroundDimension() {
    this.cx.fillRect(this.margin.left, this.margin.top, this.xMax - this.margin.left, this.yMax - this.margin.top);
    this.cx.fillStyle = 'black';
  }

  setTitle() {
    this.cx.font = '20pt Arial';
    this.cx.textAlign = 'center';
    var txtSIZE = this.cx.measureText(this.graphObject.title);
    console.log
    this.cx.fillText(this.graphObject.xLabel, this.margin.left + (this.xMax / 2) - (txtSIZE.width / 2), this.yMax + (this.margin.bottom / 1.2));
    this.cx.save();
    this.cx.rotate(-Math.PI / 2);
    this.cx.font = '20pt Arial';
    this.cx.fillText(this.graphObject.yLabel, (this.yMax / 2) * -1, this.margin.left / 4);
    this.cx.restore();
  }
  renderLinesAndLabels() {
    this.yInc = this.yMax / this.graphObject.data.length;
    var yLabelInc = (this.maxYValue * this.ratio) / this.graphObject.data.length;
    this.xInc = this.getXInc();
    this.xPos = this.margin.left;
    for (var i = 0; i < this.graphObject.data.length; i++) {
      this.yPos += (i == 0) ? this.margin.top : this.yInc;
      this.cx.font = '10pt Calibri';
      var txt = Math.round(this.maxYValue - ((i == 0) ? 0 : this.yPos / this.ratio)).toString() ;
      var txtSize = this.cx.measureText(txt);
      console.log("value",txt);
      this.cx.fillText(txt, this.margin.left - ((txtSize.width >= 14) ? txtSize.width : 10) - 7, this.yPos + 4);
      //x axis labels
      txt = this.graphObject.data[i].x;
      // txtSize = ctx.measureText(txt);
      this.cx.fillText(txt, this.xPos, this.yMax + (this.margin.bottom / 3));
      this.xPos += this.xInc;



    }
  }
  renderChartData() {
    this.xInc = this.getXInc();
    this.prevX = 0,
      this.prevY = 0;
    for (var i = 0; i < this.graphObject.data.length; i++) {
      var pt = this.graphObject.data[i];
      var ptY = (this.maxYValue - pt.y) * this.ratio;
      var ptY = ptY;
      if (ptY < this.margin.top) ptY = this.margin.top;
      var ptX = (i * this.xInc) + this.margin.left;
      var ptX = ptX;

      if (i > 0) {
        //Draw connecting lines
        // console.log(ptX, ptY, prevX, prevY);
        this.drawLine(ptX, ptY, this.prevX, this.prevY, '#fff', 2);
      }

      this.prevX = ptX;
      this.prevY = ptY;
    }
  }
  drawLine(startX?, startY?, endX?, endY?, strokeStyle?, lineWidth?) {
    this.cx.strokeStyle =strokeStyle
    this.cx.lineWidth = lineWidth;
     this.cx.beginPath();
     this.cx.moveTo(startX, startY);
     this.cx.lineTo(endX, endY);
     this.cx.stroke();
     this.cx.closePath();
  }

  getXInc() {
    return Math.round(this.xMax / this.graphObject.data.length) - 1;
  };

  ngOnInit() {

    this.graphObject.data=[{ x: '1', y: 85 }, { x: 2, y: 82 },
    { x: '3', y: 82.5 },
    { x: '4', y: 83.5 },
    { x: '5', y: 83.56 },
    { x: '6', y: 84.56 },
    { x: '7', y: 90 },
    { x: '8', y: 92.5 },
    { x: '9', y: 100 },
    { x: '10', y: 89 }];


    



  }
  ngAfterViewInit(){
    this.setChartDimension();
    this.setBackgroundDimension();
    this.setTitle();
    this.renderLinesAndLabels();
    this.renderChartData();
    this.getRandomInt();
  }
  getRandomInt(){
    var length=  this.graphObject.data.length;
    var i=length-1;
    // console.log(this.dataDef.dataPoints[length-1].x);
    
    setInterval(() => {
      var time= parseInt( this.graphObject.data[length-1].x);
      var min = Math.ceil(80);
      var max = Math.floor(100);
      var data = {
        x: time,
        y: Math.floor(Math.random() * (max - min + 1)) + min
      }
      time = time + 1;
      this.graphObject.data.splice(0,1);
      this.graphObject.data.push(data);
      this.setChartDimension();
      this.setBackgroundDimension();
      this.setTitle();
      this.renderLinesAndLabels();
      this.renderChartData();


    },1000)
  }
  getMaxDataYValue(){
    for (var i = 0; i <  this.graphObject.data.length; i++) {
      if ( this.graphObject.data[i].y > this.maxYValue) this.maxYValue = this.graphObject.data[i].y+10;
    }

  }


}
