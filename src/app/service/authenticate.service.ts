import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthenticateModel } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private apiUrl = `${environment.apiUrl}/usuario/`;

  constructor(
    private http: HttpClient
  ) { }

  // -----------------------> Get's <-------------------------- //

  // -----------------------> Post's <------------------------- //

  authenticate (data: AuthenticateModel): Observable<object> {
    return this.http.post<object>(`${this.apiUrl}login`, data).pipe(
      map((message: object) => {
        return message;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  logout(data): Observable<object> {
    return this.http.post<object>(`${this.apiUrl}logout`, data).pipe(
      map((message: object) => {
        return message;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  verifyCode(code: { cod: string }): Observable<object> {
    return this.http.post<object>(`${this.apiUrl}validate`, code).pipe(
      map((message: object) => {
        return message;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  // ----------------------> Handle Errors <--------------------- //

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
