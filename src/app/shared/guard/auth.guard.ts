import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {MessageService} from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private messageService: MessageService) {
  }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.authService.deleteToken();
      return false;
    }
    return true;
  }
}
