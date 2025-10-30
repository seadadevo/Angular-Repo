import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers:[UsersService]
})
export class ContactComponent {
  galleryUsers: User[] = []
  constructor() {
    let _UserServices = new UsersService()
    this.galleryUsers = _UserServices.users;
  }
}
