import { Component, OnInit } from '@angular/core';
import {PetService} from "../../services/pet/pet.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public petService:PetService) { }

  ngOnInit() {
  }

}
