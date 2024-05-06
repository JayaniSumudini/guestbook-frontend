import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest = request.clone({
      setHeaders: {
        'Access-Control-Allow-Credentials': 'true',
      },
    });

    if (this.authenticationService.isLoggedIn()) {
      newRequest = newRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.getToken()}`,
          'Access-Control-Allow-Credentials': 'true', // Keep this header for logged-in users
        },
      });
    }

    return next.handle(newRequest);
  }
}
