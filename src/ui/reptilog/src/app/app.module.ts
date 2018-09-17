import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PetComponent } from './components/pet/pet.component';
import { HeaderComponent } from './components/header/header.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {PetService} from "./services/pet.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    PetComponent,
    HeaderComponent,
    PetListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
