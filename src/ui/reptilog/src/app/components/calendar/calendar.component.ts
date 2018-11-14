import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PetService} from "../../services/pet/pet.service";
import {EventService} from "../../services/event/event.service";
import {ActivatedRoute} from "@angular/router";
import {CalendarMonthViewDay} from "angular-calendar";
import {isSameMonth, isSameDay} from "date-fns";
import {D} from "@angular/core/src/render3";
import * as moment from "moment";

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
  events: any[] = [];
  activeDayIsOpen: boolean = false;

  constructor(private eventService: EventService, private petService: PetService, private route: ActivatedRoute) {
  }

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
        this.getEvents();
      }
    });
  }

  viewDateChange() {
    this.getEvents();
  }

  getEvents() {
    let month = this.viewDate.getMonth() + 1;
    let year = this.viewDate.getFullYear();
    this.eventService.getEventsByMonth(1, this.currentPetId, month, year).subscribe(resp => {
      if (resp) {
        this.events = [];
        resp.forEach(element => {
          let petIndex = this.findArrayIndex(this.pets, element.petId);
          this.events.push({
            title: this.formatEventTitle(element, petIndex),
            color: {primary: this.pets[petIndex].color || 'black'},
            start: new Date(element.date.replace('-', '/')),
            cssClass: this.getEventIcon(element.type)
          });
        });
        this.events = [...this.events];
      }
    });
  }

  formatEventTitle(event: any, petIndex: number): string {
    let title = this.pets[petIndex].name + ' - ' + event.type;
    if (event.type === 'Weight' || event.type === 'Length') {
      title += ': ' + event.data;
    }
    return title;
  }

  getEventIcon(eventType: string): string {
    let icon = '';
    switch (eventType) {
      case 'Feeding': {
        icon = 'fas fa-utensils';
        break;
      }
      case 'Length': {
        icon = 'fas fa-ruler';
        break;
      }
      case 'Poop': {
        icon = 'fas fa-poop';
        break;
      }
      case 'Shedding': {
        icon = 'fab fa-phoenix-framework';
        break;
      }
      case 'Weight': {
        icon = 'fas fa-weight';
        break;
      }
    }
    return icon;
  }

  petChanged(petId: number) {
    this.currentPetId = petId;
    this.getEvents();
  }

  beforeMonthViewRender({body}: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (isSameDay(day.date, this.viewDate) && day.events.length > 0) {
        this.activeDayIsOpen = true;
      }
      day.cssClass = 'cell-fix';
    });
  }

  dayClicked({date, events}: { date: Date; events: any[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  findArrayIndex(data: any[], petId: number) {
    for (var i = 0; i < data.length; i += 1) {
      if (data[i].id === petId) {
        return i;
      }
    }
    return -1;
  }
}
