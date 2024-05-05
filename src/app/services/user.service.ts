import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  updateUserName(username: string) {
    return this.http
      .put(environment.apiUrl + '/users/', {
        username,
      })
      .subscribe();
  }

  deleteProfile() {
    return this.http.delete(environment.apiUrl + '/users/');
  }
}
