import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MatDatepickerInputEvent, MatInput } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/admin/date.adapter';
import { DatePipe } from '@angular/common';
import { SettingsService } from '../../settings.service';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { Token } from '../../../../Shared/Services/token';
import { FullScreenService } from '../../../../Shared/fullscreen.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastWrapperService } from '../../toast-wrapper.service';
import { Location } from '@angular/common';
import { UsersService } from '../../../../users/users.service';
import { UserDate } from '../../../../users/Models/UserDate';
import * as moment from 'moment';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [DatePipe, HeaderComponent, UsersService,
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    },
  ]
  
})
/** Sidebar component*/
export class SidebarComponent {
  /** Sidebar ctor */
  NameComponentCustomer: any = "كشف حساب العملاء";
  public NameComponentSuplier: any = "كشف حساب الموردين";

  elem;
  isFull: boolean = true;
  isAllowedDashBoard: boolean = false;
  isAllowedUserManagement: boolean = false;
  isAllowedItemsManagement: boolean = false;
  isAllowedBuyitemManagement: boolean = false;
  isAllowedBillPurchasesManagement: boolean = false;

  isAllowedbillManagement: boolean = false;
  isAllowedpeopleManagement: boolean = false;
  isAllowedKitchenManagement: boolean = false;
  isAllowedTaxesManagement: boolean = false;
  isAllowedCurrnciesManagement: boolean = false;
  isAllowedApplicationManagement: boolean = false;

  isAllowedTables: boolean = false;
  isAllowedTablesManagement: boolean = false;

  isAllowedSettingsManagement: boolean = false;
  isAllowedReportTaxs: boolean = false;
  isAllowedApplicationReport: boolean = false;
  isAllowedDailyReport: boolean = false;
  isAllowedInvoicesReport: boolean = false;
  isAllowedBoxMonyReport: boolean = false;
  isAllowedItemsReport: boolean = false;
  isAllowedAddBranch: boolean = false;

  isAllowedUserTypes: boolean = false;
  isAllowedCompanyInfo: boolean = false;

  isAllowedStore: boolean = false;
  isAllowedMenu: boolean = false;
  isAllowedCustomerAccount: boolean = false;
  isAllowedChangePassword: boolean = false;

  user: Token;
  imageSrcLogo: any;
  currentLang: string = '';
  _user: any;
  worning: boolean = false;

  @ViewChild('openInput', {
    read: MatInput
  }) openInput: MatInput;


  constructor(@Inject(DOCUMENT) private document: any,private router: Router, private datepip: DatePipe, public settings: SettingsService,
    private authService: AuthService, private ComHeader: HeaderComponent, private fullScrean: FullScreenService, public TosterService: ToastWrapperService,
    public translate: TranslateService, private _location: Location, private userService: UsersService) {
    //this.NameComponentCustomer;
    //this.NameComponentSuplier;

    this.currentLang = this.authService.getCurrentLang();
    this._user = this.authService.getUser();


     
    this.translate.use(this.currentLang);

    this.elem = this.document.documentElement;

    this.user = new Token();
    this.currentDate = this.settings.getCurrentDate();
    if (this.currentDate == undefined || this.currentDate == null) {
      this.settings.isDayOpened = false;
    } else {
      this.settings.isDayOpened = true;
      this.findDate();
      this.openDay = this.currentDate;
      //this.days();
    }

    var _user = JSON.parse(localStorage.getItem('User'));
    this.user = _user;
    this.user.userName = _user.userName;
    this.user.branch = _user.branch;
    this.user.branch.companyInfo.nameAR = _user.branch.companyInfo.nameAR;
    this.user.branch.companyInfo.nameEN = _user.branch.companyInfo.nameEN;
    this.imageSrcLogo = this.user.branch.companyInfo.logo;



  }

  chkCurrentDate() {
    if (this.currentDate == null || this.currentDate == undefined) {
      let msg = this.translate.get("DATEMSGS.OPENDATEHINT").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      //this.ToggleSidebar('open');
      this.fullScrean.ToggleSidebar('open');

    }
    else {
      //this.ToggleSidebar('close');
      this.fullScrean.ToggleSidebar('close');


    }
    
  }

  reset() {
    this.openInput.value = '';
  }

  ngOnInit() {

    if (this.authService.isInRoles(['DashBoard'])) {
      this.isAllowedDashBoard = true;
    }

    if (this.authService.isInRoles(['userManagment'])) {
      this.isAllowedUserManagement = true;
    }

    if (this.authService.isInRoles(['Items'])) {
      this.isAllowedItemsManagement = true;
    }

    if (this.authService.isInRoles(['BuyItems'])) {
      this.isAllowedBuyitemManagement = true;
    }
    if (this.authService.isInRoles(['BillPurchases'])) {
      this.isAllowedBillPurchasesManagement = true;
    }

    if (this.authService.isInRoles(['peopleManagment'])) {
      this.isAllowedpeopleManagement = true;
    }

    if (this.authService.isInRoles(['AddBillInvoice'])) {
      this.isAllowedbillManagement = true;
    }

    if (this.authService.isInRoles(['Tables'])) {
      this.isAllowedTables = true;
    }

    if (this.authService.isInRoles(['TablesManagement'])) {
      this.isAllowedTablesManagement = true;
    }


    if (this.authService.isInRoles(['KitchenScreen'])) {
      this.isAllowedKitchenManagement = true;
    }


    if (this.authService.isInRoles(['TaxesManagment'])) {
      this.isAllowedTaxesManagement = true;
    }


    if (this.authService.isInRoles(['CurrenciesManagment'])) {
      this.isAllowedCurrnciesManagement = true;
    }



    if (this.authService.isInRoles(['ApplicationsManagment'])) {
      this.isAllowedApplicationManagement = true;
    }

    if (this.authService.isInRoles(['SettingsManagment'])) {
      this.isAllowedSettingsManagement = true;
    }

    if (this.authService.isInRoles(['ReportTaxs'])) {
      this.isAllowedReportTaxs = true;
    }


    if (this.authService.isInRoles(['ItemsReport'])) {
      this.isAllowedItemsReport = true;
    }

    if (this.authService.isInRoles(['InvoicesReport'])) {
      this.isAllowedInvoicesReport = true;
    }


    if (this.authService.isInRoles(['DailyReport'])) {
      this.isAllowedDailyReport = true;
    }

    if (this.authService.isInRoles(['BoxMonyReport'])) {
      this.isAllowedBoxMonyReport = true;
    }


    if (this.authService.isInRoles(['ApplicationReport'])) {
      this.isAllowedApplicationReport = true;
    }




    //if (this.authService.isInRoles(['Tables'])) {
    //  this.isAllowedtabels = true;
    //}


    if (this.authService.isInRoles(['UserTypes'])) {
      this.isAllowedUserTypes = true;
    }

    if (this.authService.isInRoles(['CompanyInfo'])) {
      this.isAllowedCompanyInfo = true;
    }

    if (this.authService.isInRoles(['AddBranch'])) {
      this.isAllowedAddBranch = true;
    }

    if (this.authService.isInRoles(['Store'])) {
      this.isAllowedStore = true;
    }
    if (this.authService.isInRoles(['Menu'])) {
      this.isAllowedMenu = true;
    }
    if (this.authService.isInRoles(['CustomerAccount'])) {
      this.isAllowedCustomerAccount = true;
    }
    if (this.authService.isInRoles(['ChangePassword'])) {
      this.isAllowedChangePassword = true;
    }

    // this.Changelanguage();


  }
  closeAllModels() {

    this.fullScrean.closeAllModels();
  }
  openClose = 'close';

  ToggleSidebar(type): void {

    this.fullScrean.ToggleSidebar(type);
  }


  isCloseOrFullscreen() {
    if (this.isFull) {
      this.fullScrean.openFullscreen();
    }
    else {
      this.fullScrean.closeFullscreen();
      this.isFull = true
      return;
    }
    this.isFull = false;

  }
  navigateBack() {
    this._location.back();
  }

  closeComponent() {
    if (this.worning == false) {
      let msg = this.translate.get("DATEMSGS.WORNINGCOMPONENT").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      this.fullScrean.ToggleSidebar('open');
      this.navigateBack();
      return;
    }

  }


  minDate: Date = new Date();

  isExpanded = false;
  openDay: any;
  today: any = '----';
  day: any = '00';
  month = '00';
  Year = '0000';
  currentDate: Date;

  OpendateTime: any;

  collapse() {
    this.ComHeader.ToggleSidebar('close');
    this.isExpanded = false;
  }

  findDate() {
    this.openDay = this.settings.getCurrentDate();
    this.OpendateTime = this.datepip.transform(new Date(this.openDay), "yyyy-MM-dd");
    this.today = this.datepip.transform(new Date(this.openDay), "EEE");
    this.day = this.datepip.transform(new Date(this.openDay), "dd");
    this.month = this.datepip.transform(new Date(this.openDay), "MM");
    this.Year = this.datepip.transform(new Date(this.openDay), "yyyy-MM");
  }

  days() {

    this.OpendateTime = this.datepip.transform(new Date(this.openDay), "yyyy-MM-dd");

    this.today = this.datepip.transform(new Date(this.openDay), "EEE");
    this.day = this.datepip.transform(new Date(this.openDay), "dd");
    this.month = this.datepip.transform(new Date(this.openDay), "MM");
    this.Year = this.datepip.transform(new Date(this.openDay), "yyyy-MM");
    // Bill.prototype.currentDate = this.OpendateTime;
    this.DayOpened();
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/Login']);

  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public usedDate: UserDate = new UserDate();

  DayOpened() {
    //this.reset();
    this.usedDate.userId = this.user.userId
    var _date = this.datepip.transform(new Date(this.openDay), "yyyy-MM-dd");
    this.usedDate.currentDate = new Date(_date);

    this.userService.InsertOrUpdateUserDate(this.usedDate);
    //this.settings.SetCurrentDate(this.openDay);
    localStorage.setItem("CurrentDate", JSON.stringify(this.usedDate.currentDate));
    this.currentDate = this.settings.getCurrentDate();
    //this.TosterService.CurrentDateUser.next(this.openDay);
  }

  closeDay() {
    this.reset();
    this.usedDate = new UserDate();
    this.usedDate.userId = this.user.userId;
    this.usedDate.currentDate = null;
    this.userService.InsertOrUpdateUserDate(this.usedDate);
    this.settings.RemoveCurrentDate();
    this.currentDate = this.settings.getCurrentDate();
    this.today = '----';
    this.day = '00';
    this.month = '00';
    this.Year = '0000';
  }

  curretlang: string = '';

  // Changelanguage () {
  //   if (this.curretlang=='') {
  //     this.curretlang = 'ar';
  //   }
  //   this.authService.CurrentLang = this.curretlang;
  //   this.translate.use(this.curretlang);

  //   if (this.curretlang == '' || this.curretlang == 'ar') {
  //     document.getElementById('theme').setAttribute('href','');
  //     document.querySelector('body').setAttribute('dir','rtl');
  //   }
  //   else if (this.curretlang == 'en') {
  //     document.getElementById('theme').setAttribute('href','assets/css/style-en.css');
  //     document.querySelector('body').setAttribute('dir','ltr');
  //   }
  // }

}
