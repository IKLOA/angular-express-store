import {Injectable} from '@angular/core';
import {User} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MaterialService} from "../classes/material.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null;
  private adminToken = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
            setTimeout(() => {
              this.logout();
            }, 1000 * 60 * 60);
          }
        )
      );
  }

  adminLogin(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/admin/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('admin-token', token);
            this.setAdminToken(token);
            setTimeout(() => {
              this.adminLogout();
            }, 1000 * 60 * 60);
          }
        )
      );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('api/auth/register', user);
  }

  setToken(token: string) {
    this.token = token;
  }

  setAdminToken(adminToken: string) {
    this.adminToken = adminToken;
  }


  getToken(): string {
    return this.token;
  }

  getAdminToken(): string {
    return this.adminToken;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  isAdminAuthenticated(): boolean {
    return !!this.adminToken;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }

  adminLogout() {
    this.setAdminToken(null);
    localStorage.clear();
    this.router.navigate(['/admin']);
  }

}
