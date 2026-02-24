import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../admin/services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';


@Component({
  selector: 'app-customer-car-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule, DynamicDialogModule],
  providers: [DialogService],
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
  user!: any;
  token: string | null = null;


  constructor(private route: ActivatedRoute, 
              private adminService: AdminService, 
              private customerService: CustomerService, 
              private router: Router,
              private dialogService: DialogService){}
  
 
  ngOnInit(): void {
   this.carId = Number(this.route.snapshot.paramMap.get('id'));
    this.token = localStorage.getItem("jwt");
    console.log("Token récupéré: ", this.token);
   const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
      console.log("Utilisateur connecté: ", this.user);
      console.log("Username: ", this.user.role?.username);
    }

   console.log("Id de la voiture: ", this.carId);
   console.log("Utilisateur connecté: ", this.user);
    this.getCarById();
  }

  openDialog(title: string, message: string, type: 'success' | 'error' | 'warning') {
    this.dialogService.open(DialogComponent, {
      data: { title, message, type }
    });
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
      this.openDialog("Erreur", "Veuillez remplir les deux dates", 'error');
      return;
    }
    if(this.reservation.startDate > this.reservation.endDate){
      this.openDialog("Erreur", "La date de début doit être antérieure à la date de fin", 'error');
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
    console.log("Utilisateur depuis lcoale storage: ", localStorage.getItem("user"));
    console.log("objet user parsé: ", this.user);
    console.log("id de l'user : ",this.user.id);
    this.openDialog("Succès", "Voiture réservée avec succès!", 'success');
    this.router.navigateByUrl("/customer/dashboard")

  }

sommeTotal() {
  const start = new Date(this.reservation.startDate);
  const end = new Date(this.reservation.endDate);
  const timeDiff = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  return diffDays * this.car.prix;
  }
  
}
