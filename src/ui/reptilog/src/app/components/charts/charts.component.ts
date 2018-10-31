import {Component, OnInit} from '@angular/core';
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
  currentPetId: number;
  data: any[] = [];
  customColors: any[] = [];
  pets: any[];

  constructor(private eventService: EventService, private petService: PetService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentPetId = params['initialPet'] || 0;
      this.getPets();
    });
  }

  getData(petId: number) {
    this.eventService.getEvents(petId, this.eventType).subscribe(resp => {
      if (resp) {
        console.log(resp);
        let series: any[] = [];
        resp.forEach(element => {
          console.log(element);
          series.push({name: new Date(element.date), value: element.data});
        });
        if (series.length > 0) {
          this.data.push({name: this.pets[this.findArrayIndex(this.pets, petId)].name, series: series});
          let color = this.pets[this.findArrayIndex(this.pets, petId)].color || 'black';
          if (color) {
            this.customColors.push({name: this.pets[this.findArrayIndex(this.pets, petId)].name, value: color});
          }
          console.log(this.data);
        }
        this.data = [...this.data];
        this.customColors = [...this.customColors];
      }
    });
  }

  getEvents() {
    this.data = [];
    this.customColors = [];
    if (this.currentPetId == 0) {
      for (var i = 0; i < this.pets.length; i += 1) {
        this.getData(this.pets[i].id);
      }
    } else {
      console.log('trying to get index:' + this.currentPetId);
      let petIndex = this.findArrayIndex(this.pets, this.currentPetId);
      console.log('petIndex:' + petIndex);
      console.log(this.pets);
      this.getData(this.pets[petIndex].id);
    }
  }

  getPets() {
    this.petService.getPets(1).subscribe(resp => {
      if (resp) {
        this.pets = resp;
        this.getEvents();
      }
    });
  }

  findArrayIndex(data: any[], petId: number) {
    for (var i = 0; i < data.length; i+= 1) {
      if (data[i].id == petId) {
        return i;
      }
    }
    return -1;
  }

  petChanged(petId: number) {
    console.log('petChanged');
    this.currentPetId = petId;
    this.getEvents();
  }

  typeChanged(type: string) {
    console.log('typeChanged');
    this.eventType = type;
    this.getEvents();
  }

}
