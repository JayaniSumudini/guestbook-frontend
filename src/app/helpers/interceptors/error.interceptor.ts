import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  durationInSeconds = 3600;
  constructor(private authenticationService: AuthenticationService, private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        this.snackBar.open(err?.error.errors[0].msg, 'close');
        return throwError(() => err);
      })
    );
  }
}
