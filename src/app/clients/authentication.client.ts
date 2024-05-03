import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/auth/login',
      {
        username: username,
        password: password,
      },
      { responseType: 'text' }
    );
  }

  public register(username: string, email: string, password: string): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/users',
      {
        name: username,
        email: email,
        password: password,
      },
      { responseType: 'text' }
    );
  }
}
