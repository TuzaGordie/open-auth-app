import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageService} from './message.service';
import {Router} from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {

   opts = {
    headers: new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token')
    })
  };

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }

  submitGetProfile() {
    return this.http.get(environment.API_URL + '/api/profile', this.opts);
  }
}
