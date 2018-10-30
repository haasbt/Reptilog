import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PetComponent } from './components/pet/pet.component';
import { HeaderComponent } from './components/header/header.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {PetService} from "./services/pet/pet.service";
import {HttpClientModule} from "@angular/common/http";
import { AddPetComponent } from './components/add-pet/add-pet.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AwsService} from "./services/aws/aws.service";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { ChartsComponent } from './components/charts/charts.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FooterComponent } from './components/footer/footer.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import {DatePipe} from "@angular/common";
import {EventService} from "./services/event/event.service";
import {CalendarModule} from "angular-calendar";
import { CalendarComponent} from './components/calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    PetComponent,
    HeaderComponent,
    PetListComponent,
    AddPetComponent,
    ChartsComponent,
    FooterComponent,
    AddEventComponent,
    CalendarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot()
  ],
  providers: [
    PetService,
    AwsService,
    EventService,
    FormBuilder,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
