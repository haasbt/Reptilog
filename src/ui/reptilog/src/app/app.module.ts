import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PetComponent } from './components/pet/pet.component';
import { HeaderComponent } from './components/header/header.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {PetService} from "./services/pet.service";
import {HttpClientModule} from "@angular/common/http";
import { AddPetComponent } from './components/add-pet/add-pet.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AwsService} from "./services/aws.service";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { ChartsComponent } from './components/charts/charts.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    PetComponent,
    HeaderComponent,
    PetListComponent,
    AddPetComponent,
    ChartsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    PetService,
    AwsService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
