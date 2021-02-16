import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import {AuthService} from '../shared/services/auth.service';
import {ProfileService} from '../shared/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profile: any;

  constructor(appService: AppService, private authService: AuthService, private profileService: ProfileService) { }

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
    this.getProfile();
  }

  logout() {
    this.authService.deleteToken();
    location.reload();
  }

  getProfile() {
    this.profileService.submitGetProfile().subscribe(
      (data: any) => {
        this.profile = data;
        console.log(data);
      }
    )
  }

}
