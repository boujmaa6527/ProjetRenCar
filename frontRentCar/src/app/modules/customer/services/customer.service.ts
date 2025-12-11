import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 

  constructor( private http: HttpClient) { }


   getAllCars(): Observable<any> {
      return this.http.get(environment.host + "/customer/cars")
    }
} 
