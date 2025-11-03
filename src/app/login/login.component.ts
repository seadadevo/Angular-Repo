import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(private _AuthService:AuthService, private _Router: Router) {
    }
  
    error: string = '';
    isLoading: boolean = false;
    showPassword: boolean = false;
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
    loginForm:FormGroup = new FormGroup({
      email:new FormControl(null, [Validators.email, Validators.required]),
      password:new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]/)]),
    })
  
  
  
  
  
  
    submitLoginForm(loginForm:FormGroup) {
      this.isLoading = true;
      this._AuthService.signin(loginForm.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          if(response.message === 'Login successful') {
            this._Router.navigate(['/home'])
            this.loginForm.reset();
          } 
        },
        error:(err) => {
          if(err.error&&err.error.message) {
            this.error=err.error.message
          } else {
            this.error = 'Login failed. Please try again.';
          }
          console.error(err);
        },
      }).add(() => {
      this.isLoading= false
    })
    }


   

}
