import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminService } from '../../../admin/services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-car-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-car-detail.component.html',
  styleUrls: ['./customer-car-detail.component.css']
})
export class CustomerCarDetailComponent implements OnInit{


  carId!:number;
  car!: any;
  existingImage: string | null = null;

  reservation = {
    startDate: '',
    endDate: ''
  };


  constructor(private route: ActivatedRoute, private adminService: AdminService, private customerService: CustomerService){}
  
 
  ngOnInit(): void {
   this.carId = Number(this.route.snapshot.paramMap.get('id'));
   console.log("Id de la voiture: ", this.carId);
    this.getCarById();
  }

  getCarById(){

    this.adminService.getCarById(this.carId).subscribe((result: any) => {
      //console.log(result)
      this.car = result;
      //const carDto = result;
      this.existingImage = 'data:image/jpeg;base64,'+ result.returnedImage;
      console.log("Car details: ", this.car);
      console.log(" Existing Image: ", this.existingImage);
      
    })
  }
  reserveCar() {
    if(!this.reservation.startDate || !this.reservation.endDate){
      alert("Veuillez remplir les deux dates");
      return;
    }
    if(this.reservation.startDate > this.reservation.endDate){
      alert("La date de début doit être antérieure à la date de fin");
      return;
    }

    this.customerService.reserveCar(this.carId, this.reservation).subscribe((result) => {
      console.log("Réservation réussie: ", result);
    }, (error) => {
      console.error("Erreur lors de la réservation: ", error);
      
    });

    console.log("Réservation de la voiture avec ID:", this.carId);
    console.log("Date de début:", this.reservation.startDate);
    console.log("Date de fin:", this.reservation.endDate);
  }

sommeTotal() {
  const start = new Date(this.reservation.startDate);
  const end = new Date(this.reservation.endDate);
  const timeDiff = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  return diffDays * this.car.prix;
  }
  
}
