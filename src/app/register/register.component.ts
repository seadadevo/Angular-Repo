import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm:FormGroup = new FormGroup({
    first_name:new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    last_name:new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    age:new FormControl(null, [Validators.min(16), Validators.max(60), Validators.required]),
    email:new FormControl(null, [Validators.email, Validators.required]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]/)]),
  })


  submitRegisterForm(registerForm:FormGroup) {
    console.log(registerForm.value)
  }
}
