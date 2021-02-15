import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {MessageService} from '../../shared/services/message.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  connecting = {
    creating: false
  };

  connectingErrors = {
    creating: false
  };

  constructor(appService: AppService, private authService: AuthService,  private messageService: MessageService, private router: Router) { 
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
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
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched;
  }

  register() {

    if (this.registerForm.invalid) {
      this.messageService.warning('You\'re missing something important', null);
      return;
    }

    this.connecting.creating = true;

    if (this.registerForm.valid) {
      this.authService.submitRegister(this.registerForm.value).subscribe(
        (data: any) => {
          console.log('response', data);
          this.messageService.success('Registration Success', 'Success!');
          this.router.navigate(['auth/login']).then();
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
