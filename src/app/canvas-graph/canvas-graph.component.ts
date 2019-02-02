import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas-graph',
  templateUrl: './canvas-graph.component.html',
  styleUrls: ['./canvas-graph.component.css']
})

export class CanvasGraphComponent implements OnInit {
  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;
  price=20;
  canvasEl:HTMLCanvasElement;
  public myVinyls = {
    "Classical music": 10,
    "Alternative rock": 14,
    "Pop": 2,
    "Jazz": 12
  };

  constructor() { }

  ngOnInit() {
    this.price=200;
  }


  updatePrice() {
    setInterval(()=>{
      var flip = Math.random();
      // console.log(flip);
      if (flip > 0.5) {
        this.price = this.price * 1.1;
      }
      else {
        this.price = this.price * 0.9;
      }
     
     
      var t=10;
      var oldPrice;
      if(!oldPrice)
      oldPrice = this.price; 
      this.cx.save();
      this.cx.beginPath();
      this.cx.moveTo(t,400-oldPrice);;
      this.cx.lineTo(t+10, 400-this.price); 
      this.cx.stroke();
      this.cx.closePath(); 
      this.cx.restore();
      t = t+1;
      oldPrice = this.price; 
      // console.log(oldPrice,this.price);
      
    },1000)
   ;
   
    // var timer= setInterval(this.updatePrice, 10); 
  }


  ngAfterViewInit(): void {
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    this.canvasEl.width = 500;
    this.canvasEl.height = 400;
    this.cx.fillStyle="white";
    this.cx.fillRect(0, 0, 500, 400); 
    this.cx.strokeStyle="red";
    this.updatePrice();
    // const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    // this.cx = canvasEl.getContext('2d');
    // canvasEl.width = 400;
    // canvasEl.height = 400;
    // this.cx.fillStyle="black";
    // this.cx.fillRect(0, 0, 600, 300); 
    // this.cx.strokeStyle="white";
    // var t=0;
    // var oldPrice = this.price; 
    // this.cx.beginPath();
    // this.cx.moveTo(t, oldPrice);;
    // this.cx.lineTo(t+1, this.price); 
    // this.cx.stroke();
    // this.cx.closePath(); 
    // t = t+1;
    // oldPrice = this.price; 
    // this.updatePrice();



    // var myBarchart = new this.Barchart(
    //   { 

    //     canvas:canvasEl,
    //     seriesName:"Vinyl records",
    //     padding:20,
    //     gridScale:5,
    //     gridColor:"#eeeeee",
    //     data:this.myVinyls,
    //     colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"],
    //     obj:this
    //   }
    // );
    // myBarchart.draw();

  }

  // drawLine(ctx, startX, startY, endX, endY, color) {
  //   ctx.save();
  //   ctx.strokeStyle = color;
  //   ctx.beginPath();
  //   ctx.moveTo(startX, startY);
  //   ctx.lineTo(endX, endY);
  //   ctx.stroke();
  //   ctx.restore();
  // }
  // drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
  //   ctx.save();
  //   ctx.fillStyle = color;
  //   ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  //   ctx.restore();
  // }


  // Barchart = function (options) {
  //   this.options = options;
  //   this.canvas = options.canvas;
  //   this.ctx = this.canvas.getContext("2d");
  //   this.ctx.fillText(this.options.seriesName, this.canvas.width / 2, this.canvas.height);
  //   // console.log(this.ctx);
  //   this.colors = options.colors;

  //   this.draw = function () {
  //     var maxValue = 0;
  //     for (var categ in this.options.data) {
  //       maxValue = Math.max(maxValue, this.options.data[categ]);
  //     }
  //     var canvasActualHeight = this.canvas.height - this.options.padding * 2;
  //     var canvasActualWidth = this.canvas.width - this.options.padding * 2;

  //     //drawing the grid lines
  //     var gridValue = 0;
  //     while (gridValue <= maxValue) {
  //       var gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
  //       this.options.obj.drawLine(
  //         this.ctx,
  //         0,
  //         gridY,
  //         this.canvas.width,
  //         gridY,
  //         this.options.gridColor
  //       );

  //       //writing grid markers
  //       this.ctx.save();
  //       this.ctx.fillStyle = this.options.gridColor;
  //       this.ctx.font = "bold 10px Arial";
  //       this.ctx.fillText(gridValue, 10, gridY - 2);
  //       this.ctx.restore();

  //       gridValue += this.options.gridScale;
  //     }

  //     //drawing the bars
  //     var barIndex = 0;
  //     var numberOfBars = Object.keys(this.options.data).length;
  //     var barSize = (canvasActualWidth) / numberOfBars;

  //     for (categ in this.options.data) {
  //       var val = this.options.data[categ];
  //       var barHeight = Math.round(canvasActualHeight * val / maxValue);
  //       this.options.obj.drawBar(
  //         this.ctx,
  //         this.options.padding + barIndex * barSize,
  //         this.canvas.height - barHeight - this.options.padding,
  //         barSize,
  //         barHeight,
  //         this.colors[barIndex % this.colors.length]
  //       );

  //       barIndex++;
  //     }

  //   }
  // }

}
