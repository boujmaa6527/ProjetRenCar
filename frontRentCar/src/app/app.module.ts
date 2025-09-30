import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app-routing.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from "./auth/components/signup/signup.component";
import { LoginComponent } from "./auth/components/login/login.component";

@NgModule({
    declarations:[SignupComponent,
         LoginComponent,
        AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppComponent,
        NgModule,
        FormBuilder, 
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
     bootstrap: [AppComponent]
   
})
export class AppModule {} 