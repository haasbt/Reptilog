import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PetListComponent} from "./components/pet-list/pet-list.component";
import {PetComponent} from "./components/pet/pet.component";
import {ChartsComponent} from "./components/charts/charts.component";

const appRoutes: Routes = [
  {path:'pets', component: PetListComponent },
  {path:'pets/:petId', component: PetComponent},
  {path:'charts', component: ChartsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
