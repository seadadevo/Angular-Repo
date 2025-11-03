import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-elements',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-elements.component.html',
  styleUrl: './form-elements.component.scss'
})
export class FormElementsComponent {
  @Input() forLink:string = ''
  @Input() label:string = ''
  @Input() type:string = ''
}
