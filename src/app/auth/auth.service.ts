import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export class AuthService {
  @Injectable()
  private user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSucessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSucessfully();
  }

  logout() {
    this.user = undefined;
    this.authChange.next(false);
    this.router.navigate(['/']);
  }

  getUser() {
    return this.user;
  }

  isAuth() {
    return this.user != null;
  }
  authSucessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
