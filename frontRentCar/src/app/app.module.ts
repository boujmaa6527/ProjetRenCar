import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app-routing.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from "./auth/components/signup/signup.component";
import { LoginComponent } from "./auth/components/login/login.component";

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'




@NgModule({
    declarations:[SignupComponent,
         LoginComponent,
        AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule, 
        AppComponent,
        NgModule,
        FormBuilder, 
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    providers: [FormBuilder],
     bootstrap: [AppComponent]
   
})
export class AppModule {} 






