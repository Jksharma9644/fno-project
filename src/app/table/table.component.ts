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
    totalcount: null
  }
  noarray = [5, 10, 15]

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
    this.keys = this.columns.map(a => a.col)
    this.pageDetails.totalcount = this.rows.length;
    this.pageDetails.noPerPage=this.noarray[0];
    console.log(this.pageDetails);


    this.sortData(this.columns[0], 'false')
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
  onOptionsSelected(event){
this.pageDetails.noPerPage=event;
  }

}
