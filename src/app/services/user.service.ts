import { Injectable } from '@angular/core';
import {Person} from "../models/person.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: Person;
  currentName: string;

  constructor() { }

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(user: Person) {
    this.currentUser = user;
  }

  getCurrentName() {
    return this.currentName;
  }

  setCurrentName(name: string) {
    this.currentName = name;
  }

}
