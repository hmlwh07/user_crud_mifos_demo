import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../dto/user.model';

const apiUrl = `https://jsonplaceholder.typicode.com/`;

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl + 'users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(apiUrl + 'users/' + id);
  }

  createUser(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(apiUrl + 'users', user, { observe: 'response' });
  }

  updateUser(data: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(apiUrl + 'users/' + data.id, data, { observe: 'response' });
  }

  deleteUser(id: number): Observable<HttpResponse<User>> {
    return this.http.delete<User>(apiUrl + 'users/' + id, { observe: 'response' });
  }
}
