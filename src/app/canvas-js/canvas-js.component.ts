import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas-js',
  templateUrl: './canvas-js.component.html',
  styleUrls: ['./canvas-js.component.css']
})
export class CanvasJsComponent implements OnInit {
  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;
  constructor() { }
  CanvasChart: any;
  dataDef: any;
  ptX: any;
  ptY: any;
  prevX: any;
  prevY: any;


  ngOnInit() {
    // this.getRandomInt();


    this.CanvasChart = this.getChartConfig();
    this.dataDef = {
      title: "Time Series Graph",
      xLabel: 'Time ',
      yLabel: 'Value',
      renderTypes: [this.CanvasChart.renderType.lines],
      dataPoints: [{ x: '1', y: 85 }, { x: 2, y: 82 },
      { x: '3', y: 82.5 },
      { x: '4', y: 83.5 },
      { x: '5', y: 83.56 },
      { x: '6', y: 84.56 },
      { x: '7', y: 90 },
      { x: '8', y: 92.5 },
      { x: '9', y: 100 },
      { x: '10', y: 89 }]
    };
    this.CanvasChart.render(this.canvas, this.dataDef);
  }

  getChartConfig() {
    var ctx;
    var margin = { top:40, left: 75, right: 0, bottom: 75 };
    var chartHeight, chartWidth, yMax, xMax, data;
    var maxYValue = 0;
    var ratio = 0;
    var renderType = { lines: 'lines' };

    var render = function (canvasId, dataObj) {
      data = dataObj;
      getMaxDataYValue();

      this.canvasEl = canvasId.nativeElement;
      this.cx = this.canvasEl.getContext('2d');
      this.canvasEl.width = 1000;
      this.canvasEl.height = 500;
      chartHeight = this.canvasEl.height;
      chartWidth = this.canvasEl.width;
      xMax = chartWidth - (margin.left + margin.right);
      yMax = chartHeight - (margin.top + margin.bottom);
      // console.log(maxYValue);
      ratio = yMax / maxYValue;
      this.canvasEl = canvasId.nativeElement;
      ctx = this.canvasEl.getContext('2d');
      renderChart();
    };

    var renderChart = () => {
      renderBackground();
      renderText();
      renderLinesAndLabels();
      // this.getRandomInt();

      //render data based upon type of renderType(s) that client supplies
      if (data.renderTypes == undefined || data.renderTypes == null) data.renderTypes = [renderType.lines];
      for (var i = 0; i < data.renderTypes.length; i++) {
        renderData(data.renderTypes[i]);
      }
    };

    var getMaxDataYValue = function () {
      for (var i = 0; i < data.dataPoints.length; i++) {
        if (data.dataPoints[i].y > maxYValue) maxYValue = data.dataPoints[i].y+10;
      }
    };

    var renderBackground = function () {
      // var lingrad = ctx.createLinearGradient(margin.left, margin.top, xMax - margin.right, yMax);
      // lingrad.addColorStop(0.0, '#D4D4D4');
      // lingrad.addColorStop(0.2, '#fff');
      // lingrad.addColorStop(0.8, '#fff');
      // lingrad.addColorStop(1, '#D4D4D4');
      // ctx.fillStyle = lingrad;
      ctx.fillRect(margin.left, margin.top, xMax - margin.left, yMax - margin.top);
      ctx.fillStyle = 'black';
    };

    var renderText = function () {
      var labelFont = (data.labelFont != null) ? data.labelFont : '20pt Arial';
      ctx.font = labelFont;
      ctx.textAlign = "center";

      //Title
      var txtSize = ctx.measureText(data.title);
      ctx.fillText(data.title, (chartWidth / 2), (margin.top / 2));

      //X-axis text
      txtSize = ctx.measureText(data.xLabel);
      ctx.fillText(data.xLabel, margin.left + (xMax / 2) - (txtSize.width / 2), yMax + (margin.bottom / 1.2));

      //Y-axis text
      ctx.save();
      ctx.rotate(-Math.PI / 2);
      ctx.font = labelFont;
      ctx.fillText(data.yLabel, (yMax / 2) * -1, margin.left / 4);
      ctx.restore();
    };

    var renderLinesAndLabels = function () {
      //Vertical guide lines
      var yInc = yMax / data.dataPoints.length;
      var yPos = 0;
      var yLabelInc = (maxYValue * ratio) / data.dataPoints.length;
      var xInc = getXInc();
      var xPos = margin.left;
      for (var i = 0; i < data.dataPoints.length; i++) {
        yPos += (i == 0) ? margin.top : yInc;
        // console.log("pos",yPos)
        // drawLine(margin.left, yPos, xMax, yPos, '#fff'); 
        //y axis labels
        ctx.font = (data.dataPointFont != null) ? data.dataPointFont : '10pt Calibri';
        var txt = Math.round(maxYValue - ((i == 0) ? 0 : yPos / ratio));
        var txtSize = ctx.measureText(txt);
        // console.log("value",txt);
        ctx.fillText(txt, margin.left - ((txtSize.width >= 14) ? txtSize.width : 10) - 7, yPos + 4);
        //x axis labels
        txt = data.dataPoints[i].x;
        // txtSize = ctx.measureText(txt);
        ctx.fillText(txt, xPos, yMax + (margin.bottom / 3));
        xPos += xInc;
      }

      //Vertical line
      // drawLine(margin.left, margin.top, margin.left, yMax, '#fff');

      //Horizontal Line
      // drawLine(margin.left, yMax, xMax, yMax, '#fff');
    };

    var renderData = (type) => {
      var xInc = getXInc();
      var prevX = 0,
        prevY = 0;

      for (var i = 0; i < data.dataPoints.length; i++) {
        var pt = data.dataPoints[i];
        var ptY = (maxYValue - pt.y) * ratio;
        this.ptY = ptY;
        if (ptY < margin.top) ptY = margin.top;
        var ptX = (i * xInc) + margin.left;
        this.ptX = ptX;

        if (i > 0) {
          //Draw connecting lines
          // console.log(ptX, ptY, prevX, prevY);
          drawLine(ptX, ptY, prevX, prevY, '#fff', 2);
        }

        prevX = ptX;
        prevY = ptY;
        this.prevX = prevX;
        this.prevY = prevY;
      }
      getRandomInt();
    };

    var getRandomInt = () => {
      // var time = 1;


      

    
      var length=  this.dataDef.dataPoints.length;
      var i=length-1;
      // console.log(this.dataDef.dataPoints[length-1].x);
      var time= parseInt(this.dataDef.dataPoints[length-1].x);
      setInterval(() => {
    
        var min = Math.ceil(80);
        var max = Math.floor(100);
        console.log();
        var data = {
          x: time,
          y: Math.floor(Math.random() * (max - min + 1)) + min
        }
        time = time + 1;
        this.dataDef.dataPoints.splice(0,1);
        this.dataDef.dataPoints.push(data);
       
        var xInc = getXInc();
        this.ptX = (i * xInc) + margin.left;
        this.ptY=  (maxYValue - data.y) * ratio;
        i++;
        // drawLine(this.ptX, this.ptY, this.prevX,this. prevY, '#fff', 2);
        this.CanvasChart.render(this.canvas, this.dataDef);
       
      },10000)
    }

    var getXInc = function () {
      return Math.round(xMax / data.dataPoints.length) - 1;
    };


    var drawLine = function (startX?, startY?, endX?, endY?, strokeStyle?, lineWidth?) {
      console.log(startX,startY);
      if (strokeStyle != null) ctx.strokeStyle = strokeStyle;
      if (lineWidth != null) ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.closePath();
    };

    return {
      renderType: renderType,
      render: render
    };

  }
  // 


}
