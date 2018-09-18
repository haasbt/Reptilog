import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PetService {

  httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getPets(userId: number): Observable<any> {
    let endpoint = '/api/get-pets/' + userId;
    return this.http.get(endpoint, this.httpOptions);
  }

  addPet(petInfo: any): Observable<any> {
    const endpoint = 'api/create-pet';
    return this.http.post(endpoint, petInfo, this.httpOptions);
  }
}
