import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PetService} from "../../services/pet/pet.service";
import {EventService} from "../../services/event/event.service";
import {ActivatedRoute} from "@angular/router";
import {CalendarMonthViewDay} from "angular-calendar";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None
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
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
    },
    {
      title: 'Test 1',
      color: {primary: "#86b200"},
      start: new Date(),
      cssClass: 'fas fa-weight'
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

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      day.cssClass = 'cell-fix';
    });
  }

}
