import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { StorageService } from '../../../auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  postCar(carDto: FormData): Observable<any>{
    return this.http.post(environment.host+ "/admin/car", carDto)
      
  }

  getAllCars(): Observable<any> {
    return this.http.get(environment.host + "/admin/cars")
  }
 /* createAuthorization(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getUser()
    );
  }*/
}
