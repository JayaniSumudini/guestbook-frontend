import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          console.log(`Error: ${error.error.message}`);
        } else {
          console.log('this is server side error');
          console.log(`Error Code: ${error.status},  Message: ${error.message}`);
          if (error.status === 401) {
            console.log(error.message);
          } else if (error.status === 400) {
            // not found error
          }
        }
        throw error;
      })
    );
  }
}
