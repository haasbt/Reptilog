import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  ticks: any[] = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80];
  data: any[] = [
    {
      name: 'Cyan',
      series: [
        {
          name: 5,
          value: 77
        },
        {
          name: 10,
          value: 80      },
        {
          name: 15,
          value: 85
        }
      ]
    },
    {
      name: 'Yellow',
      series: [
        {
          name: 5,
          value: 105
        },
        {
          name: 10,
          value: 110
        },
        {
          name: 15,
          value: 120
        },
        {
          name: 20,
          value: 110
        },
        {
          name: 25,
          value: 110
        },
        {
          name: 30,
          value: 110
        },
        {
          name: 35,
          value: 110
        },
        {
          name: 40,
          value: 110
        },
        {
          name: 45,
          value: 110
        },
        {
          name: 50,
          value: 110
        },
        {
          name: 55,
          value: 110
        },
        {
          name: 60,
          value: 110
        },
        {
          name: 65,
          value: 110
        },
        {
          name: 70,
          value: 110
        },
        {
          name: 75,
          value: 110
        },
        {
          name: 80,
          value: 110
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
