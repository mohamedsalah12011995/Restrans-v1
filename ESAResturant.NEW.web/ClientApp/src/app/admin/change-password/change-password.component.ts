import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { Router } from '@angular/router';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  changePsswordModel: any;
  currentuser: any = {};


  confirmPassword: string = '';
  constructor(public authService: AuthService, private router: Router, private toasterService: ToastWrapperService) {


    this.currentuser = JSON.parse(localStorage.getItem('tokenObj'));


    this.changePsswordModel = {

      curruntPassword: '',
      newPassword: '',
      userName: this.currentuser.userName,
    }
  }

  ngOnInit() {
  }



  changePassword() {


    if (this.confirmPassword != this.changePsswordModel.newPassword) {

      this.toasterService.ErrorToaster.next("تاكيد كلمة السر الجديده غير مطابق  ..");
      return;
    }

    this.authService.changePassword(this.changePsswordModel).subscribe(
      result => {
        if (result != null || result != undefined) {
          this.router.navigate(["/admin"]);
        }
        else {
          this.toasterService.ErrorToaster.next("خطاء فى تغيير كلمة السر برجاء المحاوله لاحقا  ..");
        }
      },
      error => {
        this.toasterService.ErrorToaster.next("خطاء فى تغيير كلمة السر برجاء المحاوله لاحقا ..");
      }
    );
  }


}
