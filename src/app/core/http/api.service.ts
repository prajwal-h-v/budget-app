import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {}

  private errorHandler(
    operationName: string,
    defaultData: any
  ): (e: any) => Observable<any> {
    return (error: HttpErrorResponse) => {
      const errorMessage =
        error.error instanceof ErrorEvent
          ? error.error.message
          : `server returned ${error.status} with body ${error}`;
      return of({ error: errorMessage, data: defaultData });
    };
  }

  login(payload: any) {
    return this.http
      .post(`${environment.url}/login`, payload)
      .pipe(catchError(this.errorHandler('Login', null)));
  }
  register(payload: any) {
    return this.http
      .post(`${environment.url}/register`, payload)
      .pipe(catchError(this.errorHandler('Register', null)));
  }

  getUsers(payload: any) {
    return this.http
      .post(`${environment.url}/users`, payload)
      .pipe(catchError(this.errorHandler('Get Users', null)));
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
