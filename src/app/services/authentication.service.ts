import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';

  constructor(private authenticationClient: AuthenticationClient, private router: Router) {}

  public register(username: string, email: string, password: string): void {
    this.authenticationClient.register(username, email, password).subscribe((accessToken) => {
      localStorage.setItem(this.tokenKey, accessToken);
      this.router.navigate(['/']);
    });
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public getToken(): string| null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  public login(email: string, password: string): void {
    this.authenticationClient.login(email, password).subscribe((accessToken) => {
      localStorage.setItem(this.tokenKey, accessToken);
      this.router.navigate(['/']);
    });
  }
}
