// auth-interceptor.service.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve the access token from your authentication service or any other source
    const authToken = this.authService.getUserAuthFromLocalStorage()?.jwt;
    // Clone the request and append the Authorization header
    if (authToken)
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

    // Pass the cloned request to the next handler
    return next.handle(request);
  }
}
