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

  ngOnInit() {

    var CanvasChart = this.getChartConfig();
    var dataDef = {
      title: "US Population Chart",
      xLabel: 'Year',
      yLabel: 'Population (millions)',
      labelFont: '19pt Arial',
      dataPointFont: '10pt Arial',
      renderTypes: [CanvasChart.renderType.lines, CanvasChart.renderType.points],
      dataPoints: [{ x: '1790', y: 3.9 },
      { x: '1810', y: 7.2 },
      { x: '1830', y: 12.8 },
      { x: '1850', y: 23.1 },
      { x: '1870', y: 36.5 },
      { x: '1890', y: 62.9 },
      { x: '1910', y: 92.2 },
      { x: '1930', y: 123.2 },
      { x: '1950', y: 151.3 },
      { x: '1970', y: 203.2 },
      { x: '1990', y: 248.7 },
      { x: '2010', y: 308.7 }]
    };
    CanvasChart.render(this.canvas, dataDef);
  }

  getChartConfig() {
    var ctx;
    var margin = { top: 40, left: 75, right: 0, bottom: 75 };
    var chartHeight, chartWidth, yMax, xMax, data;
    var maxYValue = 0;
    var ratio = 0;
    var renderType = { lines: 'lines', points: 'points' };

    var render = function (canvasId, dataObj) {
      data = dataObj;
      getMaxDataYValue();
      console.log(canvasId.nativeElement);
      this.canvasEl = canvasId.nativeElement;
      this.cx = this.canvasEl.getContext('2d');
      this.canvasEl.width = 500;
      this.canvasEl.height = 400;
      chartHeight =  this.canvasEl.height;
      chartWidth =  this.canvasEl.width;
      xMax = chartWidth - (margin.left + margin.right);
      yMax = chartHeight - (margin.top + margin.bottom);
      ratio = yMax / maxYValue;
      this.canvasEl = canvasId.nativeElement;
      ctx = this.canvasEl.getContext('2d');
      renderChart();
    };

    var renderChart = function () {
      renderBackground();
      renderText();
      renderLinesAndLabels();

      //render data based upon type of renderType(s) that client supplies
      if (data.renderTypes == undefined || data.renderTypes == null) data.renderTypes = [renderType.lines];
      for (var i = 0; i < data.renderTypes.length; i++) {
        renderData(data.renderTypes[i]);
      }
    };

    var getMaxDataYValue = function () {
      for (var i = 0; i < data.dataPoints.length; i++) {
        if (data.dataPoints[i].y > maxYValue) maxYValue = data.dataPoints[i].y;
      }
    };

    var renderBackground = function () {
      var lingrad = ctx.createLinearGradient(margin.left, margin.top, xMax - margin.right, yMax);
      lingrad.addColorStop(0.0, '#D4D4D4');
      lingrad.addColorStop(0.2, '#fff');
      lingrad.addColorStop(0.8, '#fff');
      lingrad.addColorStop(1, '#D4D4D4');
      ctx.fillStyle = lingrad;
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
        //Draw horizontal lines
        drawLine(margin.left, yPos, xMax, yPos, '#E8E8E8');

        //y axis labels
        ctx.font = (data.dataPointFont != null) ? data.dataPointFont : '10pt Calibri';
        var txt = Math.round(maxYValue - ((i == 0) ? 0 : yPos / ratio));
        var txtSize = ctx.measureText(txt);
        ctx.fillText(txt, margin.left - ((txtSize.width >= 14) ? txtSize.width : 10) - 7, yPos + 4);

        //x axis labels
        txt = data.dataPoints[i].x;
        txtSize = ctx.measureText(txt);
        ctx.fillText(txt, xPos, yMax + (margin.bottom / 3));
        xPos += xInc;
      }

      //Vertical line
      drawLine(margin.left, margin.top, margin.left, yMax, 'black');

      //Horizontal Line
      drawLine(margin.left, yMax, xMax, yMax, 'black');
    };

    var renderData = function (type) {
      var xInc = getXInc();
      var prevX = 0,
        prevY = 0;

      for (var i = 0; i < data.dataPoints.length; i++) {
        var pt = data.dataPoints[i];
        var ptY = (maxYValue - pt.y) * ratio;
        if (ptY < margin.top) ptY = margin.top;
        var ptX = (i * xInc) + margin.left;

        if (i > 0 && type == renderType.lines) {
          //Draw connecting lines
          drawLine(ptX, ptY, prevX, prevY, 'black', 2);
        }

        if (type == renderType.points) {
          var radgrad = ctx.createRadialGradient(ptX, ptY, 8, ptX - 5, ptY - 5, 0);
          radgrad.addColorStop(0, 'Green');
          radgrad.addColorStop(0.9, 'White');
          ctx.beginPath();
          ctx.fillStyle = radgrad;
          //Render circle
          ctx.arc(ptX, ptY, 8, 0, 2 * Math.PI, false)
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#000';
          ctx.stroke();
          ctx.closePath();
        }

        prevX = ptX;
        prevY = ptY;
      }
    };

    var getXInc = function () {
      return Math.round(xMax / data.dataPoints.length) - 1;
    };

    var drawLine = function (startX?, startY?, endX?, endY?, strokeStyle?, lineWidth?) {
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

}
