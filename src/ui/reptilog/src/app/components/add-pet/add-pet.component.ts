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
  photo: any;

  constructor(private fb: FormBuilder, private petService: PetService) {
    this.petForm = this.fb.group({
      userId: ['1'],
      name: ['', Validators.required],
      type: ['', Validators.required],
      hatchDate: [''],
      color: [''],
      morph: [''],
      notes: [''],
      image: ['']
    });
  }

  ngOnInit() {
    this.new = true;
    this.photo = '';
  }

  submit() {
    this.petService.addPet(this.petForm.value).subscribe(resp => {
      if (resp && resp.success === true) {
        this.created.emit(true);
        this.closeModal.nativeElement.click();
      }
    });
  }

  onFileChange(image: any){
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.photo = e.target.result;
        this.petForm.controls.image.setValue(this.photo);
      };
      reader.readAsDataURL(image);
    }
}
