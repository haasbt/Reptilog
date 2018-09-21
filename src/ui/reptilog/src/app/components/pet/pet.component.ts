import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PetService} from "../../services/pet.service";

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  petId: number;
  photo: any;

  constructor(private route: ActivatedRoute, private petService: PetService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['petId']) {
        this.petId = params['petId'];
        this.getPet();
      }
    })
  }

  getPet() {
    this.petService.getPet(this.petId).subscribe(resp => {
      if (resp) {
        this.photo = atob(resp.image);
      }
    });
  }

}
