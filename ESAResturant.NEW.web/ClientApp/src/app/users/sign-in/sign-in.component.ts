import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

//import { UserService, User } from '../user.service';
import { Router } from '@angular/router';
//import { AuthGuard } from '../../auth/auth.guard';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { HttpErrorResponse, HttpRequest, HttpClient } from '@angular/common/http';
//import { Data_Settings } from '../../../environments/environment.prod';

//import { Observable } from 'rxjs/Observable';

import { UsersService } from '../users.service';
import { User } from '../Models/User';
import { ToastWrapperService } from 'src/app/admin/Shared/toast-wrapper.service';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { SettingesService } from 'src/app/admin/setting/setting.service';
import { TranslateService } from '@ngx-translate/core';
import { CompanyInfoService } from 'src/app/admin/setting/CompanyInfo/CompanyInfo.service';
import { CompanyInfo } from '../Models/CompanyInfo';
import { Subject } from 'rxjs';
import { BranchService } from '../../admin/setting/Branches/addbranch/BranchService.service';
import { PrinterService } from '../../admin/item/printer/printer.service';
import { Title } from '@angular/platform-browser';
import { FullScreenService } from '../../Shared/fullscreen.service';

declare var qz: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UsersService, User, SettingesService, BranchService, PrinterService]

})


export class SignInComponent implements OnInit {
  currentLang: string = 'ar';
  pageTitle: string = "";
  elem;
  public loading: boolean;

  isLoginError: boolean = false;
  user: User;
  UserID: any;
  loginModel: any;
  CompanyInfo: CompanyInfo;
  branchId: number = 0;
  checkLogin: number = 0;
  constructor(@Inject(DOCUMENT) private document: any, private userService: UsersService, private router: Router, private http: HttpClient, private toasterService: ToastWrapperService,
    public authService: AuthService, private settingsService: SettingesService,
    private branchService: BranchService, private printerService: PrinterService,
    private titleService: Title, public translate: TranslateService, private fullScrean: FullScreenService) {
    //AllServiceService.GetUser = "";
    this.user = new User();
    //const uploadReq = new HttpRequest('OPTIONS', `api/DataDefullts/DefaultData`);
    //this.http.request(uploadReq).subscribe(event => { });
    //localStorage.clear();

    this.elem = this.document.documentElement;


    this.loginModel = {
      userName: '',
      password: ''

    };
    //if (this.currentLang == '') {
    //  this.currentLang = 'ar';
    //}
    //this.currentLang = this.authService.CurrentLang;
    this.languagechanged();

    this.changeTitle(this.currentLang);
   
  }
  ngOnInit() {
    //console.log(localStorage.getItem('isLogging'));
    if (localStorage.getItem('isLogging') === "True") {
      this.router.navigate(['/admin/billInvoice']);
    }

    this.elem = document.documentElement;
  }
  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "تسجيل الدخول";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Signin";
      this.titleService.setTitle(this.pageTitle);
    }
  }

  getBranchById() {
    this.branchService.getAllBranches().subscribe(data => {
      // this.CompanyInfo = data[0];
      if (data.length>0) {
        var branch = data.find(f => f.id == this.branchId)
        localStorage.setItem("Branch", JSON.stringify(branch));
      }

    });
  }

  getPrinterById(id) {
    this.printerService.getPrintersById(id).subscribe(data => {
      // this.CompanyInfo = data[0];
      if (data != null) {
        localStorage.setItem("Printer", JSON.stringify(data));
      }

    });
  }

  languagechanged() {
    if (this.currentLang == '') {
      this.currentLang = JSON.parse(localStorage.getItem('CurrentLang'));
      this.translate.use(this.currentLang);
    }
    else if (this.currentLang == '') {
      this.currentLang = 'ar';
      this.translate.use(this.currentLang);
    }
    else {
      this.translate.use(this.currentLang);
    }
    this.rtlLang();

    localStorage.setItem('CurrentLang', JSON.stringify(this.currentLang));
    this.authService.getCurrentLang();
  }

  rtlLang() {
    if (this.currentLang == 'ar') {
      this.titleService.setTitle(' إيزاك للمطاعم ');
      document.getElementById('theme').setAttribute('href', '');
      document.querySelector('body').setAttribute('dir', 'rtl');
    }
    else if (this.currentLang == 'en') {
      this.titleService.setTitle(' Easacc Restaurants ');
      document.getElementById('theme').setAttribute('href', 'assets/css/style-en.css');
      document.querySelector('body').setAttribute('dir', 'ltr');
    }
  }

  openFullscreen() {
    this.fullScrean.openFullscreen();
  }

  /* Close fullscreen */
  closeFullscreen() {
    this.fullScrean.closeFullscreen();
  }

  login() {
    if (this.currentLang == '' || this.currentLang == null) {
      let msg = this.translate.get("Messages.SELECTLANGUAGE").subscribe(msg => {
        this.toasterService.ErrorToaster.next(msg);
      });
      return;
    }
    this.loading=true;
    this.checkLogin = 1;
    this.authService.login(this.loginModel).subscribe(
      result => {

        //this.toasterService.CurrentDateUser.next(result.userDate);


        if (result != null || result != undefined) {
          this.branchId = result.branchId;
          this.loading = false;
          //this.toasterService.getUser.next(result);
          this.router.navigate(["/admin"]);
          this.openFullscreen();

        }
        if (result == null || result == undefined) {
          let msg = this.translate.get("SIGNIN.ERROLOGIN").subscribe(msg => {
            this.toasterService.ErrorToaster.next(msg);
          });
          this.checkLogin = 0;
          this.loading = false;
          return;
        }

        localStorage.setItem("User", JSON.stringify(result));
        if (result!= null) {
          if (result.userDate.currentDate != null) {
            localStorage.setItem("CurrentDate", JSON.stringify(result.userDate.currentDate));

          }
        }
      },
      error => {
        let msg = this.translate.get("SIGNIN.ERROLOGIN").subscribe(msg => {
          this.toasterService.ErrorToaster.next(msg);
        });
        this.checkLogin = 0;
        this.loading = false;

      }
    );
  }


  OnSubmit(userName, password) {
    this.userService.CheckLogin(userName, password).subscribe((data: any) => {

      if (data != false) {

        localStorage.setItem("isLogging", "True");
        localStorage.setItem("LoggedUser", JSON.stringify(data));
        this.router.navigate(['/admin/billInvoice']);

      }
      else {
        localStorage.clear();
        let msg = this.translate.get("SIGNIN.ERROLOGIN").subscribe(msg => {
          this.toasterService.ErrorToaster.next(msg);
        });

        return
      }
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });

  }
}
