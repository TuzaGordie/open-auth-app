import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {MessageService} from '../../shared/services/message.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotpasswordForm: FormGroup;

  connecting = {
    creating: false
  };

  connectingErrors = {
    creating: false
  };


  constructor(appService: AppService, private authService: AuthService,  private router: Router, private messageService: MessageService) { 
    this.forgotpasswordForm = new FormGroup({
      email: new FormControl(null, Validators.email),
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
    return this.forgotpasswordForm.get(controlName).invalid && this.forgotpasswordForm.get(controlName).touched;
  }

  forgotpassword() {

    if (this.forgotpasswordForm.invalid) {
      this.messageService.warning('You\'re missing something important', null);
      return;
    }

    this.connecting.creating = true;

    if (this.forgotpasswordForm.valid) {
      this.authService.submitForgotpassword(this.forgotpasswordForm.value).subscribe(
        (data: any) => {
          this.messageService.success('Email Sent', null);
          this.router.navigate(['auth/reset-password-request-sent']).then();
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
