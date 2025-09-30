import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  cars: any = [];


  constructor(private adminService: AdminService){}
  

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



}
