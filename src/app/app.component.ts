import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { ICourse } from './app.component.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    CourseCardComponent,
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  data = {
    title: 'angular-complete-guide',
  };

  onLogoClicked(): void {
    alert('Hello world');
  }

  onkeyUp(title: string): void {
    this.data.title = title;
  }

  readonly courses: Array<ICourse> = [
    {
      id: 1,
      description: 'Angular 17 for beginners',
      imageUrl: 'assets/images/front.jpg',
      lessonsCount: 70,
      longDescription: '',
    },
    {
      id: 2,
      description: 'RxJs',
      imageUrl: 'assets/images/front.jpg',
      lessonsCount: 40,
      longDescription:
        'We will then write our own Observable from first principles:',
    },
    {
      id: 3,
      description: 'NgRx',
      imageUrl: 'assets/images/front.jpg',
      lessonsCount: 48,
      longDescription:
        'In this course, we are going to take a small existing applica',
    },
  ];

  oncCourseEnrolled(course: ICourse): void {
    console.log('التليفزيون: وصلتني إشارة!');
    alert(`تم الاشتراك في: ${course.description}`);
  }

  handleLogout(): void {
    console.log('logged out');
  }

  trackCourse(index: number, course: ICourse): number {
    return course.id;
  }
}
