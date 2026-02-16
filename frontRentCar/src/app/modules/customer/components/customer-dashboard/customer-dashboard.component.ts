import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {


  
  cars: any = [];
  isLoggedIn: any;
  response: any;
  
  constructor(private customerService: CustomerService, private router: Router ){}
  
  
  ngOnInit(): void {
   
    this.isLoggedIn = localStorage.getItem("user") !== null;
    this.getAllcars();
  }

  getAllcars() {
    this.customerService.getAllCars().subscribe((result) => {
      console.log(result);
      result.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,'+ element.returnedImage;
        this.cars.push(element);
      });
    })
  }
  openCarDetail(id: number) {
    if(!this.isLoggedIn){
      alert("Login or register to access this feature.");
      this.response = confirm("Do you want to login now ?");
      if(this.response === true){
        this.router.navigateByUrl("/login")
      }else{
        alert("Vous n'avez pas accès à cette fonctionnalité.");
      }
      return;
    }
  this.router.navigate(['/customer/carDetail/', id])
}



}
