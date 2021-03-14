import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Page } from '../models/page';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://reqres.in/api';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<Page>(`${this.url}/users?per_page=6`).pipe(
      map(page => page.data)
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<any>(`${this.url}/users/${id}`).pipe(
      map(page => page.data)
    );
  }
}
