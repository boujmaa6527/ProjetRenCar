import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {

  
  cars: any = [];
  
  constructor(private customerService: CustomerService ){}
  
  
  ngOnInit(): void {
   
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

}
