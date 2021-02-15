import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toaster: ToastrService) { }

  info(message: string, title: string, options = {}) {
    this.toaster.clear();
    this.toaster.info(message, title, options);
  }

  success(message: string, title: string, options = {}) {
    this.toaster.clear();
    this.toaster.success(message, title, options);
  }

  error(message: string, title: string, options = {}) {
    this.toaster.clear();
    this.toaster.error(message, title, options);
  }

  warning(message: string, title: string, options = {}) {
    this.toaster.clear();
    this.toaster.warning(message, title, options);
  }

  clearToastr() {
    this.toaster.clear();
  }
}
