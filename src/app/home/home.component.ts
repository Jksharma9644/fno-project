import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'app';

  columns = [
    {
      colname: "Desert",
      col: 'desert',
      ischecked: true
    },
    {
      colname: "callorie",
      col: 'calories',
      ischecked: true
    },
    {
      colname: "fat",
      col: 'fat',
      ischecked: true
    },
    {
      colname: "carbs",
      col: 'carbs',
      ischecked: true
    },
    {
      colname: "protein",
      col: 'protein',
      ischecked: true
    },
  ]
  rows = [{
    desert: "Frozen yoghurt",
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4
  },
  {
    desert: "Ice cream sandwich",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3
  },
  {
    desert: "Eclair",
    calories: 262,
    fat: 16,
    carbs: 24,
    protein: 6
  },
  {
    desert: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3
  },
  {
    desert: "Marshmallow",
    calories: 318,
    fat: 0,
    carbs: 81,
    protein: 2
  },
  {
    desert: "new yoghurt",
    calories: 159,
    fat: 6,
    carbs: 30,
    protein: 4
  },
  {
    desert: "Ice cream vanilla",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3
  },
  {
    desert: "candy",
    calories: 262,
    fat: 16,
    carbs: 24,
    protein: 6
  },
  {
    desert: "apple",
    calories: 500,
    fat: 3.7,
    carbs: 67,
    protein: 4.3
  },
  {
    desert: "pizza",
    calories: 500,
    fat: 5.8,
    carbs: 60,
    protein: 2
  }]
  constructor() { }

  ngOnInit() {
  }

}
