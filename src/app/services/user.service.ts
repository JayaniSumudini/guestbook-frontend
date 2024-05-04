import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) { }
  
  getUser() {
    return this.http.get('XXXXXXXXXXXXXXXXXXXXXXXXXX');
  }
}
