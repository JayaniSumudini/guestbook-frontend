import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { authIdentityResponse, forgotPasswordResponse, loginResponse } from '../models/response';

@Injectable({
  providedIn: 'root',
})

//TODO: handle errors
export class AuthenticationService {
  private tokenKey = 'token';
  private expirationKey = 'expiration';
  private tokenSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject<boolean>(!!this.getToken());
  }

  public setTokenWithExpiration(token: string, expirationSeconds: number): void {
    const now = new Date();
    const expiration = new Date(now.getTime() + expirationSeconds * 1000);

    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.expirationKey, expiration.toISOString());
    this.tokenSubject.next(true);
  }

  public register(username: string, email: string, password: string): void {
    this.http
      .post<loginResponse>(environment.apiUrl + '/users', {
        name: username,
        email: email,
        password: password,
      })
      .subscribe((response: loginResponse) => {
        if (response.accessToken) {
          this.setTokenWithExpiration(response.accessToken, 3600);
          this.router.navigate(['/dashboard']);
        }
      });
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationKey);
    this.tokenSubject.next(false);
  }

  public logout(): void {
    this.clearToken();
    this.router.navigate(['/home']);
  }

  //TODO: handle incorrect password
  public login(email: string, password: string): void {
    this.http
      .post<loginResponse>(environment.apiUrl + '/auth/login', {
        email: email,
        password: password,
      })
      .subscribe((response) => {
        if (response.accessToken) {
          this.setTokenWithExpiration(response.accessToken, 3600);
          this.router.navigate(['/dashboard']);
        }
      });
  }

  public getAuthIdentity(): Observable<authIdentityResponse> {
    return this.http.get<authIdentityResponse>(environment.apiUrl + '/auth/identity');
  }

  public getTokenObservable(): Observable<boolean> {
    return this.tokenSubject.asObservable();
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return this.http.put(environment.apiUrl + '/auth/changePassword', {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  }

  public forgotPassword(email: string) {
    return this.http.post<forgotPasswordResponse>(environment.apiUrl + '/auth/forgotPassword', {
      email,
    });
  }

  public resetPassword(resetPasswordToken: string, newPassword: string) {
    return this.http.put<forgotPasswordResponse>(environment.apiUrl + '/auth/resetPassword', {
      resetPasswordToken,
      newPassword,
    });
  }
}
