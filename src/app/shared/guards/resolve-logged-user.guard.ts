// import { Injectable } from '@angular/core';
// import { CanActivateFn, CanLoad, Route, Router, UrlSegment } from '@angular/router';
// import { Observable, catchError, tap } from 'rxjs';
// import { AuthService } from '../services/auth.service';

import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class ResolveLoggedUserGuard implements CanActivateFn {
//   constructor(private router: Router, private authService: AuthService) {}

//   canLoad(
//     route: Route,
//     segments: UrlSegment[]
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     return new Promise((resolve, reject) => {
//       this.authService.userMe().subscribe((data) => {
//         resolve(true);
//       });
//     });
//   }
// }

@Injectable()
class PermissionsService {
  constructor(private authService: AuthService) {}
  canActivate(): Observable<Boolean> {
    return of(true);
    // return new Promise((resolve, reject) => {
    //   this.authService.userMe().subscribe((data) => {
    //     resolve(true);
    //   });
    // });
  }
}

export const ResolveLoggedUserGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(AuthService).userMe();
};
