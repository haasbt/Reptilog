import {Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
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
  defaultPhoto: string;
  hasImage: boolean;
  deleteImage: boolean;

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
    this.defaultPhoto = './assets/images/default-pic.png';
  }

  ngOnInit() {
    this.petForm = this.fb.group({
      petId:[this.petId || ''],
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
    if (this.image) {
      this.hasImage = true;
      this.photo = 'https://s3.us-east-2.amazonaws.com/reptilog-images/images/' + this.petId + '/' + this.image;
    } else {
      this.hasImage = false;
      this.photo = this.defaultPhoto;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.notes && !changes.notes.isFirstChange()) {
      this.petForm.controls.notes.setValue(changes.notes.currentValue);
    }

    if (changes.image && !changes.image.isFirstChange()) {
      this.petForm.controls.image.setValue(changes.image.currentValue);
    }
  }

  submit() {
    if (this.petId) {
      this.petService.updatePet(this.petForm.value).subscribe(resp => {
        if (resp && resp.success === true) {
          if (this.imageUpload || this.deleteImage) {
            this.awsService.deleteFromAWS(this.petId, this.image);
          }
          if (this.imageUpload) {
            this.awsService.uploadToAWS(this.petId, this.imageUpload);
          }
          this.created.emit(true);
          this.closeModal.nativeElement.click();
          }

      });
    } else {
      this.petService.addPet(this.petForm.value).subscribe(resp => {
        if (resp && resp.success === true) {
          this.petId = resp.petId;
          if (this.imageUpload) {
          this.awsService.uploadToAWS(this.petId, this.imageUpload);
          }
          this.created.emit(true);
          this.closeModal.nativeElement.click();
        }
      });
    }
  }

  clearImageUpload() {
    if (this.hasImage) {
    this.photo = 'https://s3.us-east-2.amazonaws.com/reptilog-images/images/' + this.petId + '/' + this.image;
    } else {
    this.photo = this.defaultPhoto;
    }
    this.imageUpload = null;
  }

  markImageForDeletion() {
    this.photo = this.defaultPhoto;
    this.deleteImage = true;
  }

  undoDelete() {
    this.deleteImage = false;
    if (this.hasImage) {
      this.photo = 'https://s3.us-east-2.amazonaws.com/reptilog-images/images/' + this.petId + '/' + this.image;
    } else {
      this.photo = this.defaultPhoto;
    }
  }

  onFileChange(image: any){
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.photo = e.target.result;
        this.imageUpload = image;
        this.petForm.controls.image.setValue(image.name);
      };
      reader.readAsDataURL(image);
      this.deleteImage = false;
    }
}
