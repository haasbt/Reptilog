import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  petForm: FormGroup;
  new: boolean;

  constructor(private fb: FormBuilder) {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      hatchDate: [''],
      image: [''],
      color: [''],
      morph: ['']
    });
  }

  ngOnInit() {
  }

}
