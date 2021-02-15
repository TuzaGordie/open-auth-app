import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {MessageService} from '../../shared/services/message.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  resetToken;
  CurrentState: any;

  connecting = {
    creating: false
  };

  connectingErrors = {
    creating: false
  };


  constructor(appService: AppService, private authService: AuthService, private router: Router,
    private route: ActivatedRoute, private messageService: MessageService) { 
      this.resetPasswordForm = new FormGroup({
        password: new FormControl(null, Validators.required),
      });
      this.CurrentState = 'Wait';
      this.route.params.subscribe(params => {
        this.resetToken = params.token;
        console.log(this.resetToken);
        this.VerifyToken();
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

  VerifyToken() {
    this.authService.ValidatePasswordToken({ resettoken: this.resetToken }).subscribe(
      data => {
        this.CurrentState = 'Verified';
      },
      err => {
        this.CurrentState = 'NotVerified';
      }
    );
  }

  isValid(controlName) {
    return this.resetPasswordForm.get(controlName).invalid && this.resetPasswordForm.get(controlName).touched;
  }

  resetPassword() {

    if (this.resetPasswordForm.invalid) {
      this.messageService.warning('You\'re missing something important', null);
      return;
    }

    this.connecting.creating = true;

    if (this.resetPasswordForm.valid) {
      this.authService.submitResetPassword(this.resetPasswordForm.value).subscribe(
        (data: any) => {
          this.messageService.success('Password Reset Successful', 'Success!');
          this.router.navigate(['login']).then();
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
