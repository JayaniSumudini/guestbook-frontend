import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { getAllUsersResponse } from '../models/response';

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

  deleteProfileByAdmin(userId: string) {
    return this.http.delete(environment.apiUrl + `/users/${userId}`);
  }

  banUserByAdmin(userId: string) {
    return this.http.put(environment.apiUrl + `/users/${userId}`, { isBanned: true });
  }

  activateUserByAdmin(userId: string) {
    return this.http.put(environment.apiUrl + `/users/${userId}`, { isBanned: false });
  }

  getAllUsers() {
    return this.http.get<getAllUsersResponse>(environment.apiUrl + '/users');
  }
}
