import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {MessageService} from '../../shared/services/message.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  connecting = {
    creating: false
  };

  connectingErrors = {
    creating: false
  };

  constructor(appService: AppService, private authService: AuthService, private router: Router, private messageService: MessageService) { 
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required),
    });
  }

  pagesJs = [
    'assets/js/jquery-3.5.0.min.js',
    'assets/js/popper.min.js',
    'assets/js/bootstrap.min.js',
    'assets/js/imagesloaded.pkgd.min.js',
    'assets/js/validator.min.js',
    'assets/js/main.js'
  ];

  ngOnInit(): void {
    AppService.loadScriptPage(this.pagesJs);
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {

    if (this.loginForm.invalid) {
      this.messageService.warning('You\'re missing something important', null);
      return;
    }

    this.connecting.creating = true;

    if (this.loginForm.valid) {
      this.authService.submitLogin(this.loginForm.value).subscribe(
        (data: any) => {
          localStorage.setItem('auth-token', data.toString());
          this.messageService.success('Login Success', 'Success!');
          this.router.navigate(['']).then();
        },
        error => {
          this.messageService.error('Something went wrong', 'Error!');
          this.connecting.creating = false;
          this.connectingErrors.creating = true;
        }
      );
    }
  }

}
