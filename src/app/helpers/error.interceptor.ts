import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() { }

    /**
     * @function intercept() Intercepta la petición HTTP que se esté realizando
     * y capta cualquier error que ocurra en dicha petición HTTP
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     * @memberof ErrorInterceptor
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                console.log('Error.Interceptor línea 16: Unauthorized');
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
