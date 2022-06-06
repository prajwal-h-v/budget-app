import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { StorageKeys } from '../modals/storage-keys.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userData = localStorage.getItem(StorageKeys.TOKEN);
    if (userData) {
      let headers = req.headers.append(
        'access-token',
        userData['access-token']
      );
      req = req.clone({
        headers,
      });
    }
    if (!/(login|register)/.test(req.url) && !userData) {
      this.clearSessionState();
      return EMPTY;
    }
    return next.handle(req).pipe(
      catchError((res) => {
        if (res instanceof HttpErrorResponse && res.status === 401) {
          this.clearSessionState();
        }
        return throwError(res);
      })
    );
  }
  clearSessionState() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
