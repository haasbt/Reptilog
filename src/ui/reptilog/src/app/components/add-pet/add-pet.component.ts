import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PetService} from "../../services/pet.service";
import {AwsService} from "../../services/aws.service";

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
  photo: any;
  imageUpload: any;
  petId: number;

  constructor(private fb: FormBuilder, private petService: PetService, private awsService: AwsService) {
    this.petForm = this.fb.group({
      userId: ['1'],
      name: ['', Validators.required],
      type: ['', Validators.required],
      hatchDate: [''],
      color: [''],
      morph: [''],
      size: [''],
      notes: [''],
      image: ['']
    });
  }

  ngOnInit() {
    this.photo = './assets/images/default-pic.png';
  }

  submit() {
    this.petService.addPet(this.petForm.value).subscribe(resp => {
      if (resp && resp.success === true) {
        this.petId = resp.petId;
        this.awsService.uploadToAWS(this.petId, this.imageUpload)
        this.created.emit(true);
        this.closeModal.nativeElement.click();
      }
    });
  }

  onFileChange(image: any){
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.photo = e.target.result;
        this.imageUpload = image;
        this.petForm.controls.image.setValue(image.name);
      };
      reader.readAsDataURL(image);
    }
}
