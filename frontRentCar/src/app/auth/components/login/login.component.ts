import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
myForm!: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService){}

  ngOnInit(){
    this.myForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  login(){
    console.log(this.myForm.value)
    this.authService.login(this.myForm.value).subscribe((result) => {
      console.log(result);
      localStorage.setItem("jwt", result.jwt);
      localStorage.setItem("user", JSON.stringify(result));

      console.log("Token stocké: ", localStorage.getItem("jwt"));
      if(result.userId != null){
        const user = {
          id: result.userId,
          role: result.userRole
        }
        StorageService.saveUser(user);

       if( StorageService.isAdminLoggedIn()){
        this.router.navigateByUrl("/admin/dashboard");
       } else if (StorageService.isCustomerLoggedIn()){
           this.router.navigateByUrl("/customer/dashboard");
       }
      }
         
    })
 

  }
}
