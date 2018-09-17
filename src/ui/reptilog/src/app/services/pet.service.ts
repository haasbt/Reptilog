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
}
