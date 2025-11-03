import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService, private _Router: Router) {
  }

  error: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

  registerForm:FormGroup = new FormGroup({
    first_name:new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    last_name:new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    age:new FormControl(null, [Validators.min(16), Validators.max(60), Validators.required]),
    email:new FormControl(null, [Validators.email, Validators.required]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]/)]),
  })






  submitRegisterForm(registerForm:FormGroup) {
    this.isLoading = true;
    console.log(registerForm.value)
    this._AuthService.signup(registerForm.value).subscribe({
      next:(response)=>{
        this.isLoading = false;
        if(response.message === 'User created successfully') {
          this._Router.navigate(['/login'])
          this.registerForm.reset();
        } 
      },
      error:(err) => {
        if(err.error&&err.error.message) {
          this.error=err.error.message
        } else {
          this.error = 'Registration failed. Please try again.';
        }
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
