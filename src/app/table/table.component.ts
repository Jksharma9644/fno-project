import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Angular2CsvModule } from 'angular2-csv';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() tableName: any;
  @Input() columns: any;
  @Input() rows: any;
  keys = [];
  isDesc = false;
  firstPage: any;
  lastpage: any = "";
  newRows = [];

  // download csv
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    showTitle: true,
    title: 'asfasf',
    useBom: false,
    removeNewLines: true,
    keys: ['approved', 'age', 'name']
  };
  firstchange = false;

  //pagination 
  noPerPage = 5;
  pageDetails = {
    page_no: 1,
    noPerPage: this.noPerPage,
    totalcount: null,
  }
  noarray = []

  public sort: any = {
    column: "",//to match the variable of one of the columns
    descending: true
  };
  constructor() { }

  ngOnInit() {
    this.sort = {
      column: this.columns[0].col, //to match the variable of one of the columns
      descending: true
    };
    this.keys = this.columns.map(a => a.col);
    this.options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      headers: [],
      showTitle: true,
      title: 'asfasf',
      useBom: false,
      removeNewLines: true,
      keys: this.keys
    };
    // this.sortData(this.columns[0], 'false')
    this.firstPage = 1;
    this.pageDetails.totalcount = this.rows.length;
    this.findMultipleofCount(this.pageDetails.totalcount);
    this.getIndexDetail(1);
    this.pageDetails.noPerPage = this.noarray[0];



  }


  findMultipleofCount(count) {
    var total = 0;
    for (var i = 0; i <= count; i++) {
      if (i % 5 === 0 && i != 0) {
        this.noarray.push(i);
      }
    }

    console.log(this.noarray);
  }


  getIndexDetail(page_no) {

    var length = this.pageDetails.noPerPage;
    this.firstPage = page_no * length - length;
    this.lastpage = page_no * length;
    console.log(this.firstPage, this.lastpage)
    this.newRows = this.rows.slice(this.firstPage, this.lastpage);
    console.log(this.rows)
    // console.log(this.pageDetails);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["columns"]) {



    }
    if (changes["rows"]) {

    }
  }

  sortData(property, changeDirection) {
    if (changeDirection === 'true') {
      this.isDesc = !this.isDesc;  //change the direction
    }
    // this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.rows.sort((a, b) => {
      // //console.log(this.data[a][property] < this.data[b][property])
      if (a[property.col] < b[property.col]) {
        return -1 * direction;
      }
      else if (a[property.col] > b[property.col]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
    this.sort.column = property.col;
    if (changeDirection === 'true') {

      this.sort.descending = !this.isDesc;
    }
    else {
      this.sort.descending = true;
    }
  };

  checkValue(col) {
    col.ischecked = !col.ischecked;
  }
  onOptionsSelected(event) {
    console.log(event);
    this.pageDetails.noPerPage = parseInt(event);
    this.getIndexDetail(this.pageDetails.page_no);
  }
  prev() {
    if (this.firstPage >= 1) {
      this.pageDetails.page_no -= 1;
      this.getIndexDetail(this.pageDetails.page_no);
    }
  }
  next() {
    if (this.lastpage < this.pageDetails.totalcount) {
      this.pageDetails.page_no += 1;
      this.getIndexDetail(this.pageDetails.page_no);
    }

  }

  setpagination(totalcount, page_no) {
    if (totalcount !== this.rows.length) {


    }

  }
  downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    for (var i = 0; i < rows.length; i++) {
      var row = [];
      var cols = rows[i].querySelectorAll("td, th");
      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j].textContent);

      }
      this.downloadCSV(csv.join("\n"), filename);

    }



  }
