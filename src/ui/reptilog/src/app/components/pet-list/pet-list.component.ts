import {Component, OnInit} from '@angular/core';
import {PetService} from "../../services/pet/pet.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

  pets: any[];
  userId: number;

  constructor(private petService: PetService, private router: Router) {
    this.pets = [];
    this.userId = 1;
  }

  ngOnInit() {
    this.refresh();
  }

  stupidMethod() {

  }

  refresh() {
    this.petService.getPets(this.userId).subscribe(resp => {
      if (resp) {
        this.pets = resp;
      }
    });
  }

  petCreated(event) {
    if (event === true) {
      console.log('refreshing');
      this.refresh();
    }
  }

  goToPet(petId: number) {
    this.router.navigate(['pets', petId], {skipLocationChange: true});
  }

}
