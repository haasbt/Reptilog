import { Component, OnInit } from '@angular/core';
import {PetService} from "../../services/pet/pet.service";
import {EventService} from "../../services/event/event.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  viewDate: Date = new Date();
  view: string = 'month';
  currentPetId: number;
  pets: any[];

  events: any[] = [
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date()
    }
  ];

  constructor(private eventService: EventService, private petService: PetService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.currentPetId = params['initialPet'] || 0;
        this.getPets();
    });
  }

  getPets() {
    this.petService.getPets(1).subscribe(resp => {
      if (resp) {
        this.pets = resp;
      }
    });
  }

  viewDateChange(viewDate: Date) {

  }

  petChanged(petId: number) {

  }

}
