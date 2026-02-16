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
    getCarById(id: number): Observable<any> {
    return this.http.get(environment.host+ "/customer/carDetail" + id)
  }
    reserveCar(carId: number, reservationData: any): Observable<any> {
    return this.http.post(environment.host + "/customer/reserve/" + carId, reservationData)
  }
} 
