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
  pet: any;
  photo: any;
  editingNotes: boolean;

  constructor(private route: ActivatedRoute, private petService: PetService) {
    this.photo = './assets/images/default-pic.png';
    this.editingNotes = false;
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
        this.pet = resp;
        if (this.pet.image) {
          this.photo = 'https://s3.us-east-2.amazonaws.com/reptilog-images/images/' + this.petId + '/' + this.pet.image;
        }
      }
    });
  }

  petEdited(event) {

  }

  toggleNoteEdit() {
    this.editingNotes = !this.editingNotes;
  }

}
