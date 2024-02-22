import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface AuthUser {
  jwt: string;
  user: User;
}
export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private HttpBackend: HttpBackend,
    private router: Router
  ) {
    console.log("auth");

  }
  loggedUser: AuthUser | null = null;
  userMe() {
    return this.http
      .get(`${environment.BASE_URL}/api/users/me?populate[address]=true`)
      .pipe(
        tap((data: any) => {
          // if (this.loggedUser)
          //   this.loggedUser = {
          //     ...this.loggedUser,
          //     user: { ...this.loggedUser.user, role: data },
          //   };
          //   console.log("user",this.loggedUser);
          // this.setUserAuthToLocalStorage(data as AuthUser);
        })
      );
  }

  userLogin(data: { identifier: string; password: string }) {
    return this.http.post(`${environment.BASE_URL}/api/auth/local`, data).pipe(
      tap((data) => {
        this.loggedUser = data as AuthUser;
        this.setUserAuthToLocalStorage(data as AuthUser);
      })
    );
  }
  userRegister(data: { username: string; email: string; password: string }) {
    const http = new HttpClient(this.HttpBackend);
    return http.post(`${environment.BASE_URL}/api/auth/local/register`, data);
  }

  setUserAuthToLocalStorage(data: AuthUser) {
    localStorage.setItem('auth', JSON.stringify(data));
  }
  getUserAuthFromLocalStorage(): AuthUser {
    return JSON.parse(localStorage.getItem('auth')!);
  }

  isValidUser() {
    const user = this.getUserAuthFromLocalStorage();
    if (!user) return false;
    if (Object.hasOwn(user, 'jwt')) {
      return true;
    } else {
      return false;
    }
  }

  userLogout() {
    localStorage.clear();
    this.loggedUser = null;
    this.router.navigate(['/']);
  }
}
