import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PetListComponent} from "./components/pet-list/pet-list.component";

const appRoutes: Routes = [
  {path:'', component: PetListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
