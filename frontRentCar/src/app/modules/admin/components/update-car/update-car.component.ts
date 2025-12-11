import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Car } from '../../../../modele/car.modele';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})
export class UpdateCarComponent implements OnInit{
   myForm!: FormGroup;
    car!: Car;
    error!: string;
    status: boolean= false;
    connected: boolean = false;
    listOfMarque = ["BMW", "BUGATTI", "LONBORGINI", "MERCEDES", "FERRARI", "PORCHE"];
    imagePreview!: string|ArrayBuffer|null;
    existingImage: string | null = null;
    ValidateForm: FormGroup<any> | undefined;
    updateForm!: FormGroup;
    imgChanged!:boolean;
    selectedFile:any;
  
  
  constructor(private adminService: AdminService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder){}
  carId: number = this.activatedRoute.snapshot.params['id'] ; 
  
  ngOnInit(): void {
    this.updateForm = this.fb.group({

         
            modele: [null, Validators.required],
            kilometrage: [null, Validators.required],
            couleur: [null, Validators.required],
            prix: [null, Validators.required],
            marque: [null, Validators.required],
            annee: [null, Validators.required],
            image: [null],
    })
    this.getCarById();
    
  }

  getCarById(){

    this.adminService.getCarById(this.carId).subscribe((result) => {
      //console.log(result)
      const carDto = result;
      this.existingImage = 'data:image/jpeg;base64,'+ result.returnedImage;
      console.log(carDto);
      console.log(this.existingImage);
      this.updateForm.patchValue(carDto);
    })
  }

  updatecar(){

    if(!this.updateForm.valid){
      this.updateForm.markAllAsTouched();
      return;
    }
     const formData = new FormData();
   
     if(this.imgChanged && this.selectedFile){
         formData.append("image", this.selectedFile);
     }
   
   
    formData.append("modele", this.updateForm.value.modele);
    formData.append("kilometrage", this.updateForm.value.kilometrage);
    formData.append("couleur", this.updateForm.value.couleur);
    formData.append("prix", this.updateForm.value.prix);
    formData.append("marque", this.updateForm.value.marque);
    formData.append("annee", this.updateForm.value.annee);

    

    /*const anneeFormated = new Date(form.value.annee).toISOString();
    formData.append("annee", anneeFormated);*/

    this.adminService.updateCar(this.carId, formData).subscribe( {
      next: (result) => {
          console.log("Voiture mise a jour avec success", result);
          this.router.navigateByUrl("admin/dashboard")
      },
      error: (err) => {
        console.error("Error", err);
        this.error =( "la mise a jour a échoué")
      }
     
    })
    
  }


  onFileSelected(event : any){
   
    this.selectedFile = event.target.files[0];
    this.updateForm.get('image')?.setValue(this.selectedFile);
    this.imgChanged = true;
    this.previewImage();
  }
  previewImage(){
    const reader = new FileReader(); 
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    if(this.selectedFile){
       reader.readAsDataURL(this.selectedFile)
    }
   
  }


}
