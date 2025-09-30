import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) {}

  register(signupRequest: any): Observable<any>{

    return this.http.post(environment.host + "/auth/signup", signupRequest, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  login(loginRequest: any): Observable<any> {
     return this.http.post(environment.host + "/auth/login", loginRequest, {
      headers: {'Content-Type': 'application/json'}
    });
  }
}
