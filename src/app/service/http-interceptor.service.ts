import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentRoute = req.url;
    const dbHeader = localStorage.getItem('DB_HEADER');
    const DB_HEADER = (dbHeader) ? JSON.parse(dbHeader) : null;
    const local = localStorage.getItem('LOCAL');
    const LOCAL = (local) ? JSON.parse(local) : '';
    console.log('Interceptor Ejecutado: ', req.url);
    console.log(dbHeader);
    if (currentRoute.includes('login')) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
          // 'Access-Control-Allow-Origin': '*'
        }
      });
    } else if (!LOCAL && DB_HEADER) {
      console.log('En el interceptor 2do if')
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'bd': DB_HEADER['db']
        }
      });
    } else if (LOCAL) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'bd': DB_HEADER['db'],
          'local': LOCAL['local']
        }
      });
    }

    return next.handle(req);
  }
}
