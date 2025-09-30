import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Car } from '../../../../modele/car.modele';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.css'
})
export class PostCarComponent implements OnInit {
  
  myForm!: FormGroup;
  car!: Car;
  error!: string;
  status: boolean= false;
  connected: boolean = false;
  listOfMarque = ["BMW", "BUGATTI", "LONBORGINI"];
  

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;  
  
  constructor(private formBuilder: FormBuilder, private router: Router, private activRoute: ActivatedRoute, private adminService: AdminService ){

    this.car = new Car(0, "",0,"",0,"",0,"");
    this.myForm = this.formBuilder.group({
      id: [this.car.id],
      modele: [null, Validators.required],
      kilometrage: [null, Validators.required],
      couleur: [null, Validators.required],
      prix: [null, Validators.required],
      marque: [null, Validators.required],
      annee: [null, Validators.required],
      image: [null, Validators.required],


     
    });

  }
 /* postCar(){
  console.log(this.myForm.value);
 }*/
  ngOnInit(): void {
    let id = this.activRoute.snapshot.params['id'];
    this.listOfMarque;

  }


formSubmitted = false; 
 onFileSelected(event: any) {
  const file = event.target.files[0];
  if(file.size > 5 * 1024 * 1024){
    this.error = "erreru to size imge"
  }
  else if(file){
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

 onAddCar(form: FormGroup){
  this.formSubmitted = true;

  if(form.valid){
    if(!this.selectedFile && !this.car.imageUrl){
      this.error = "Image obligatoire";
      return;
    }
    const formData = new FormData();
   
   
    formData.append("id", this.car.id.toString());
    formData.append("modele", form.value.modele);
    formData.append("kilometrage", form.value.kilometrage);
    formData.append("couleur", form.value.couleur);
    formData.append("prix", form.value.prix);
    formData.append("marque", form.value.marque);
    formData.append("annee", form.value.annee);

    

    /*const anneeFormated = new Date(form.value.annee).toISOString();
    formData.append("annee", anneeFormated);*/
     if(this.selectedFile){
       formData.append("image", this.selectedFile);
    }

   /* if(this.selectedFile){
      formData.append('file', this.selectedFile);
    }else if(!this.selectedFile && this.car.imageUrl){
      formData.append("imageUrl", this.car.imageUrl)
    }*/
    

      this.adminService.postCar(formData).subscribe({
        next: (response) => {
          console.log("FormaData: ", formData)
          console.log("car created successfully: ", response);
          this.router.navigateByUrl("/");
        },
         error: (err) =>{
          console.error("error ", err);
          this.error = err.message; 
    }

      });
    
  }
 }

 createCar(formData: FormData){
  this.adminService.postCar(formData).subscribe({
    next: (response) => {
      console.log("hotel created succesfully", response);
      this.router.navigateByUrl("/");

    },
    error: (err) =>{
      console.error("error ", err);
      this.error = err.message; 
    }
  })
 }
}






