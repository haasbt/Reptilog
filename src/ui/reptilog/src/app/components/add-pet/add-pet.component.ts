import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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

  @Input('petId') petId: number;
  @Input('petName') petName: string;
  @Input('petType') petType: string;
  @Input('hatchDate') hatchDate: string;
  @Input('petColor') petColor: string;
  @Input('morph') morph: string;
  @Input('petSize') petSize: string;
  @Input('notes') notes: string;
  @Input('image') image: string;

  constructor(private fb: FormBuilder, private petService: PetService, private awsService: AwsService) {

  }

  ngOnInit() {
    this.petForm = this.fb.group({
      userId: ['1'],
      name: [this.petName || '', Validators.required],
      type: [this.petType || '', Validators.required],
      hatchDate: [this.hatchDate || ''],
      color: [this.petColor || ''],
      morph: [this.morph || ''],
      size: [this.petSize || ''],
      notes: [this.notes || ''],
      image: [this.image || '']
    });
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
