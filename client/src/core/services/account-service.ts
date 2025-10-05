import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, user } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/";
  currentUser = signal<user | null>(null);
  register(creds: RegisterCreds) {
    return this.http.post<user>(this.baseUrl + 'account/register', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  }
  login(creds: LoginCreds) {
    return this.http.post<user>(this.baseUrl + 'account/login', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  }
  setCurrentUser(loginuser: user) {
    localStorage.setItem('user', JSON.stringify(loginuser));
    this.currentUser.set(loginuser)
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
