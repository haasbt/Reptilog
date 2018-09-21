import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PetListComponent} from "./components/pet-list/pet-list.component";
import {PetComponent} from "./components/pet/pet.component";

const appRoutes: Routes = [
  {path:'', component: PetListComponent },
  {path:'pet/:petId', component: PetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
