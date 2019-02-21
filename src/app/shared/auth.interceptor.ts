import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

// interceptors are used to modify requests when making them
// e.g: to send auth token
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    console.log('Intercepted!', req);
    // const copiedReq = req.clone({headers: req.headers.append('', '')});
    const copiedReq = req.clone({params: req.params.append('auth', token)});
    return next.handle(copiedReq);
  }
}
