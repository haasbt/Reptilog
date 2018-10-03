import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PetService} from "../../services/pet.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  notesForm: FormGroup;
  petId: number;
  pet: any;
  photo: any;
  editingNotes: boolean;
  originalNotes: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private petService: PetService) {
    this.photo = './assets/images/default-pic.png';
    this.editingNotes = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['petId']) {
        this.petId = params['petId'];
        this.notesForm = this.fb.group({
          petId:[this.petId],
          notes: ['']
        });
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
        this.originalNotes = this.pet.notes;
        this.notesForm.controls.notes.setValue(this.pet.notes);
      }
    });
  }

  petEdited(event) {
    if (event === true) {
      this.getPet();
    }
  }

  editNotes() {
    if (this.editingNotes) {
      this.petService.updateNotes(this.notesForm.value).subscribe(resp => {
        if (resp && resp.success === true) {
          this.pet.notes = this.notesForm.controls.notes.value;
          this.originalNotes = this.pet.notes;
          this.editingNotes = false;
        }
      })
    }
  }

  toggleNoteEdit() {
    this.editingNotes = !this.editingNotes;
    if (this.editingNotes === false) {
      this.notesForm.controls.notes.setValue(this.originalNotes);
    }
  }

}
