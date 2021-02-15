import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';
import {MessageService} from './message.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { 
  
  }

  submitRegister(user: User) {
    return this.http.post(environment.API_URL + '/api/auth/register', user, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  submitLogin(body: any) {
    return this.http.post(environment.API_URL + '/api/auth/login', body, {
      observe: 'body'
    });
  }

  submitForgotpassword(body: any) {
    return this.http.post(environment.API_URL + '/api/auth/forgotpassword', body, {
      observe: 'body'
    });
  }

  ValidatePasswordToken(body: any) {
    return this.http.post(  environment.API_URL + '/api/auth/validate-password-token', body, {
      observe: 'body'
    });
  }

  submitResetPassword(body: any) {
    return this.http.post(environment.API_URL + '/api/auth/new-password', body, {
      observe: 'body'
    });
  }

  deleteToken() {
    localStorage.removeItem('auth-token');
  }

  getUserPayload() {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (!userPayload) {
      this.messageService.info('You need to be logged in to view this page', null);
      this.router.navigate(['auth/login']).then();
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

}
