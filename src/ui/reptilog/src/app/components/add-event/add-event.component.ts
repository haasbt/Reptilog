import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {EventService} from "../../services/event/event.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  @Input('petId') petId: number;
  @Input('eventType') eventType: string;
  @Input('units') units: string;

  @Output()
  created = new EventEmitter<boolean>();

  @ViewChild('closeModal') closeModal: ElementRef;

  eventForm: FormGroup;
  date: string;

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private eventService: EventService) { }

  ngOnInit() {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.date);
    this.eventForm = this.fb.group({
      eventId:[''],
      petId:[this.petId],
      userId:['1'],
      eventType:[this.eventType],
      eventData:[''],
      eventDate:[this.date, Validators.required],
      eventNotes:['']
    });
  }

  submit() {
    this.eventForm.controls.eventType.setValue(this.eventType);
    this.eventService.addEvent(this.eventForm.value).subscribe(resp => {
      if (resp && resp.success === true) {
        this.clearForm();
        this.created.emit(true);
        this.closeModal.nativeElement.click();
      }
    });
  }

  clearForm() {
    this.eventForm.controls.eventData.setValue('');
    this.eventForm.controls.eventDate.setValue(this.date);
    this.eventForm.controls.eventNotes.setValue('');
  }

}
