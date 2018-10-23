import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event/event.service";
import {PetService} from "../../services/pet/pet.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  eventType: string = 'Weight';
  data: any[] = [];
  customColors: any[] = [];
  included: number[] = [];
  pets: any[];

  constructor(private eventService: EventService, private petService: PetService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['initialPet']) {
        this.included.push(params['initialPet']);
        this.getPets();
      } else {
        this.getPets();
      }
    });
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
        if (series.length > 0) {
          this.data.push({name: petName, series: series});
          this.data = [...this.data];
          console.log(this.data);
        }
      }
    });
  }

  getPets() {
    this.petService.getPets(1).subscribe(resp => {
      if (resp) {
        this.pets = resp;
        if (this.included.length > 0) {
          for (var i = 0; i < this.pets.length; i += 1) {
            if (this.included.includes(this.pets[i].id)) {
              this.getData(this.pets[i].id, this.pets[i].name);
            }
          }
        } else {
          for (var i = 0; i < this.pets.length; i += 1) {
            this.included.push(this.pets[i].id);
            this.getData(this.pets[i].id, this.pets[i].name);
          }
        }
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

  toggleCheck(id: number, name: string, checked: boolean) {
    console.log(name + ' ' + checked);
    console.log(this.included);
    if (checked) {
      if (!this.included.includes(id)) {
        this.included.push(id);
        this.getData(id, name);
      }
    } else {
      if (this.included.includes(id)) {
        this.included.splice(this.included.indexOf(id), 1);
        if (this.findArrayIndex(this.data, name) != -1) {
          this.data.splice(this.findArrayIndex(this.data, name), 1);
          this.data = [...this.data];
        }
      }
    }
  }

}
