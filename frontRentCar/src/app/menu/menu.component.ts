import { Component } from '@angular/core';
import { AdminRoutingModule } from "../modules/admin/admin-routing.module";
import { Router } from '@angular/router';
import { StorageService } from '../auth/services/storage/storage.service';
import { NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AdminRoutingModule, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
 


  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();
    isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  
    constructor(private router: Router){}
  
    ngOnInit(){


      this.router.events.subscribe(event => {
        if(event.constructor.name === "NavigationEnd"){
          this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
          this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
  
        }
      })
  
    }

    logout(){
      StorageService.logout();
      this.router.navigateByUrl("/login");
    }

}
