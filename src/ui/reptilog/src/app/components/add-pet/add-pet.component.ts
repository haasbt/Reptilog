import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PetService} from "../../services/pet.service";

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  @Output()
  created = new EventEmitter<boolean>();
  @ViewChild('closeModal') closeModal: ElementRef;
  petForm: FormGroup;
  new: boolean;

  constructor(private fb: FormBuilder, private petService: PetService) {
    this.petForm = this.fb.group({
      userId: ['1'],
      name: ['', Validators.required],
      type: ['', Validators.required],
      hatchDate: [''],
      image: [''],
      color: [''],
      morph: [''],
      notes: ['']
    });
  }

  ngOnInit() {
    this.new = true;
  }

  submit() {
    this.petService.addPet(this.petForm.value).subscribe(resp => {
      if (resp && resp.success === true) {
        this.created.emit(true);
        this.closeModal.nativeElement.click();
      }
    });
  }
}
