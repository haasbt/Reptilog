import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PetListComponent} from "./components/pet-list/pet-list.component";
import {PetComponent} from "./components/pet/pet.component";
import {ChartsComponent} from "./components/charts/charts.component";
import {CalendarComponent} from "./components/calendar/calendar.component";

const appRoutes: Routes = [
  {path:'pets', component: PetListComponent },
  {path:'pets/:petId', component: PetComponent},
  {path:'charts/:initialPet', component: ChartsComponent},
  {path:'charts', component: ChartsComponent},
  {path:'calendar/:initialPet', component: CalendarComponent},
  {path:'calendar', component: CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
