import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  cars: any = [];


  constructor(private adminService: AdminService, private router: Router){}
  

  ngOnInit(): void {
    this.getAllcars();
   
    
  }

  getAllcars() {
    this.adminService.getAllCars().subscribe((result) => {
      console.log(result);
      result.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,'+ element.returnedImage;
        this.cars.push(element);
      });
    })
  }
  deleteCar(id: number){
    console.log(id)
    const confirmed =  confirm("Are you sure to delete ?")
    if(confirmed){
        this.adminService.deleteCar(id).subscribe((result) => {
      
        alert("Car deleted Successfully")
        this.cars = [];
        this.getAllcars();

      });
    }else {
      console.log("Deletion cancelled");
    }
    
  }
  updateCar(id: number){

  }



}
