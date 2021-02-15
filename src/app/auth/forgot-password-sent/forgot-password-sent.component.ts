import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-forgot-password-sent',
  templateUrl: './forgot-password-sent.component.html',
  styleUrls: ['./forgot-password-sent.component.scss']
})
export class ForgotPasswordSentComponent implements OnInit {

  constructor(appService: AppService  ) { }

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

}
