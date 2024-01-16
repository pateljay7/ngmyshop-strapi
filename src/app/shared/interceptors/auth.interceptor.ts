// auth-interceptor.service.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class authInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve the access token from your authentication service or any other source
    const authToken =
      '580cf8a3cd28e9c0224233eecfed6fe82d5385017877370392dfe34efebf4802ea1e26159319427eb23f33c27253e23d045b789028fa402a6c56ad761cd8865e9ba8caefc5216bf45eb1a9b60a18261aed69f56347573d17944fa59dd78a68aabf34bb0753d7d0872925fa17841d2086dd76e568fd3d9e421ebce9a3b0e9a71b';

    // Clone the request and append the Authorization header
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Pass the cloned request to the next handler
    return next.handle(authReq);
  }
}
