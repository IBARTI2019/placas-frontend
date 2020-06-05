import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const header = 'a';
    console.log('Interceptor Ejecutado');
    if (header) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return next.handle(req);
  }
}
