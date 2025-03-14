import { Injectable } from '@angular/core';
import { User } from '../dto/user.model';
import { BehaviorSubject, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource = new BehaviorSubject<User[]>([]);
  user$ = this.userSource.asObservable();

  constructor() {}

  getUsers(users: User[]) {
    this.userSource.next(users);
  }

  getUserById(id: number) {
    const user = this.userSource.value.find(user => user.id === id);
    return of(user);
  }

  deleteUser(id: number) {
    this.userSource.next(this.userSource.value.filter(user => user.id !== id));
  }

  createUser(user: User) {
    const updatedUsers = [...this.userSource.value, user];
    this.userSource.next(updatedUsers);
    return of(updatedUsers);
  }

  updateUser(user: User) {
    this.userSource.next(this.userSource.value.map(u => u.id === user.id ? user : u));
    return of(user);
  }
}
