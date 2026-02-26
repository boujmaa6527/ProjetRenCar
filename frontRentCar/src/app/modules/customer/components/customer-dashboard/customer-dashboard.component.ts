import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { DialogService, DynamicDialogConfig, DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, DynamicDialogModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css',
  providers: [DialogService]
})
export class CustomerDashboardComponent implements OnInit {


  
  cars: any = [];
  isLoggedIn: any;
  response: any;
 
  
  constructor(private customerService: CustomerService, private router: Router, private dialogService: DialogService){}
  
  
  ngOnInit(): void {
   
    this.isLoggedIn = localStorage.getItem("user") !== null;
    this.getAllcars();
  }
   openDialog(title: string, message: string, type: 'success' | 'error' | 'warning') {
    this.dialogService.open(DialogComponent, {
      data: { title, message, type }
    });
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
      this.openDialog("Erreur", 
        "Login or register to access this feature.", "warning");
        this.router.navigateByUrl("/login")
      if(this.response === true){
        this.router.navigateByUrl("/login")
      }else{
        this.openDialog("Erreur", "You do not have access to this feature.", "error");
      }
      return;
    }
  this.router.navigate(['/customer/carDetail/', id])
}



}
