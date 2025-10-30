import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }

  users:User[] = [
    {name: 'ahmed', age: 28, gender: 'male', salary: 2000},
    {name: 'ola', age: 20, gender: 'female', salary: 4000},
    {name: 'nada', age: 25, gender: 'female', salary: 4000},
    {name: 'sara', age: 21, gender: 'female', salary: 4000},
    {name: 'ali', age: 23, gender: 'Male', salary: 6000},
    {name: 'ola', age: 20, gender: 'female', salary: 4000},
  ]

  welcome() {
    console.log('welcome')
  }
}
