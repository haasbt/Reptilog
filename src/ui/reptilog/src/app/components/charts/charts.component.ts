import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event/event.service";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  eventType: string = 'Weight';
  //ticks: any[] = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80];
  data: any[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getData(13, 'Update Test');
  }

  getData(petId: number, petName: string) {
    this.eventService.getEvents(petId, this.eventType).subscribe(resp => {
      if (resp) {
        console.log(resp);
        let series: any[] = [];
        resp.forEach(element => {
          console.log(element);
          series.push({name: new Date(element.date), value: element.data});
        });
        this.data.push({name: petName, series: series});
        console.log(this.data);
      }
    });
  }

  findArrayIndex(data: any[], name: string) {
    for (var i = 0; i < data.length; i+= 1) {
      if (data[i]['name'] === name) {
        return i;
      }
    }
    return -1;
  }

}
