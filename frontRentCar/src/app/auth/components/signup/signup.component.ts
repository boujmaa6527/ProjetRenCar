import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required]],

    })
  }
 /* confirmationValidate = (control: FormControl): {[s: string]: boolean} => {
    if(!control.value){
      return {required: true};
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { comfirm: true, error: true};
    }
    return {};
  }*/
register(){
  console.log(this.signupForm.value);
  this.authService.register(this.signupForm.value).subscribe((result) => {
    console.log(result);
    if(result.id != null){
      this.router.navigateByUrl("/login")
    }
  })
}
}
