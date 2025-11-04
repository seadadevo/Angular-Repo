import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-elements',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-elements.component.html',
  styleUrl: './form-elements.component.scss'
})
export class FormElementsComponent {
  @Input() parentForm!: FormGroup;
  @Input() forLink: string = '';
  @Input() label: string = '';
  @Input() type: string = '';
}
