import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private HttpBackend: HttpBackend) {}
  URL = 'http://localhost:1337';

  userLogin(data: { identifier: string; password: string }) {
    return this.http.post(`${this.URL}/api/auth/local`, data);
  }
  userRegister(data: { username: string; email: string; password: string }) {
    const http = new HttpClient(this.HttpBackend);
    return http.post(`${this.URL}/api/auth/local/register`, data);
  }
}
