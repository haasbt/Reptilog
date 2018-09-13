import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PetComponent } from './components/pet/pet.component';
import { HeaderComponent } from './components/header/header.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    PetComponent,
    HeaderComponent,
    PetListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
