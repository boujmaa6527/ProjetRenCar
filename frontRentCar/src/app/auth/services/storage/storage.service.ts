import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}
   private static adminLoggedIn$ = new BehaviorSubject<boolean>(false);
   private static customerLoggedIn$ = new BehaviorSubject<boolean>(false);

   

  static saveUser(user: any): void {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }
  static getUser():any{

    const userData = localStorage.getItem(USER);
    if(!userData) return null;
    try{
      return JSON.parse(userData);
    }catch(e){
      console.log("error user");
      return null;
    }
    
  }

  static getUserRole(): string{
    const user = this.getUser();
    if(user == null) return "";
    return user.role; 
  }
  static isAdminLoggedIn(): boolean{
    const role: string = this.getUserRole();
    return role == "ADMIN";
  }
  static isCustomerLoggedIn(): boolean{
    const role: string = this.getUserRole();
    return role == "CUSTOMER";
  }

  static logout() : void {
    localStorage.removeItem(USER);
  }

  static getToken(): string | null {
    return localStorage.getItem("jwt");
  }
}
