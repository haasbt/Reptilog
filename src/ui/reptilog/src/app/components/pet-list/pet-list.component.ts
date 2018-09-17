import { Component, OnInit } from '@angular/core';
import {PetService} from "../../services/pet.service";

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  pets: any[];
  userId: number;

  constructor(private petService: PetService) {
    this.pets = [];
    this.userId = 1;
  }

  ngOnInit() {
    this.petService.getPets(this.userId).subscribe(resp => {
      if (resp) {
        this.pets = resp;
      }
    });
  }

  doNothing() {

  }

}
