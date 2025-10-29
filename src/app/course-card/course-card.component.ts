import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from '../app.component.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})

export class CourseCardComponent {
  @Input({required: true}) course: ICourse = {} as ICourse;
  @Input({required: true}) index!: number;
  @Output() enrolled = new EventEmitter<ICourse>();
  @Output() onLogOut = new EventEmitter<void>();
  
  viewCourse() : void { 
    this.enrolled.emit(this.course)
  }

  logout() {
    this.onLogOut.emit();
  }

}
