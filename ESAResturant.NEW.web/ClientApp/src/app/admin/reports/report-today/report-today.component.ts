import { Component, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BillInvoiceService } from '../../bill-invoice/bill-invoice.service';
import { Bill } from '../../bill-invoice/Models/Bill';
import { ReportsService } from '../reports.service';
import { BillType } from '../../bill-invoice/Models/BillType';
import { BoxMoniesService } from '../../BoxMony/BoxMonies.service';
import { boxMony } from '../../BoxMony/Models/boxMony';
import { BoxMonyCategory } from '../../BoxMony/Models/boxMonyCategory';
import { DateAdapter, MAT_DATE_FORMATS, PageEvent } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../date.adapter';
import { HeaderComponent } from '../../Shared/Components/header/header.component';
import { Currencies } from '../../setting/Models/Currencies';
import { setiingCurrency } from '../../setting/Currency/setiingCurrency.service';
import { SettingsService, TotalDay } from '../../Shared/settings.service';
import { peopleService } from '../../People/people.service';
import { People } from '../../People/Models/people';
import { PeopleType } from '../../People/Models/peopleType';
import { boxMonyCategoryService } from '../../BoxMony/boxMonyCategory.service';
import { HomeService } from '../../home.service';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { BillCurrencies } from '../../bill-invoice/Models/BillCurrencies';
import { PagginatedTableVM } from 'src/app/Shared/classes/pagginated.table.viewmodel';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { BillDetail } from '../../bill-invoice/Models/BillDetail';
import { TranslateService } from '@ngx-translate/core';
import { Taxes } from '../../setting/Models/Taxes';
import { TaxesService } from '../../setting/Taxes/Taxes.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../Shared/Services/auth.service';
import { ExportService } from '../../../Shared/export.service';
import { FullScreenService } from '../../../Shared/fullscreen.service';
import { ReportItems } from '../../bill-invoice/Models/ReportItems';
import * as moment from 'moment';
import { boxMonyTypeService } from '../../BoxMony/boxMonyType.service';
import { boxMonyType } from '../../BoxMony/Models/boxMonyType';
import { User } from '../../../users/Models/User';
import { UsersService } from '../../../users/users.service';



@Component({
  selector: 'app-report-today',
  templateUrl: './report-today.component.html',
  styleUrls: ['./report-today.component.css'],
  providers: [DatePipe, ReportsService, Bill, BillInvoiceService, BoxMoniesService, setiingCurrency, peopleService, SettingsService, boxMonyTypeService,
    boxMonyCategoryService, HomeService, TaxesService, UsersService,
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})
/** ReportToday component*/
export class reportTodayComponent {
  /** ReportToday ctor */
  //displayedColumns: string[] = ['position', 'code', 'orderNo', 'typeInvoice', 'name', 'count', 'total', 'discount', 'typeDiscount', 'totalVatTax', 'totalInvoice', 'paid', 'remaining', 'date', 'branch', 'user', 'seller'];

  disabled = false;
  isCredit = false;
  isDebit = false;

  completedPagginatedTableVM: PagginatedTableVM;
  usersList: User[] = [];

  filterdbillVM: Bill = new Bill();
  billDetails: BillDetail = new BillDetail();
  itemsGroup: any = null;
  categoriesGroup: any = null;
  printablebill: Bill = new Bill(); ///this object represent current selected bill

  fromDate: any;
  toDate: any;
  fromTime: any
  ToTime:  any;
  boxMonyList: boxMony[] = [];

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  TaxesList: Taxes[] = [];
  billTotals: any = [];
  netTotals: number = 0;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  modalRef: BsModalRef;
  boxMonyTypeList: boxMonyType[] = [];

  billTypeList: BillType[] = [];
  billList: Bill[] = [];
  billCurrencies: BillCurrencies[] = [];

  filterCurrenciesList: BillCurrencies[] = [];
  filterBillList: Bill[] = [];

  boxMonyCategoryList: BoxMonyCategory[]
  currenciesList: Currencies[]

  boxMony: boxMony = new boxMony();
  filterBoxMony: boxMony = new boxMony();

  all: string = '';

  bill: Bill;
  peopleType: PeopleType;
  newBoxMony: boxMony = new boxMony();;
  //Total: number = 0;
  //Quntity: number = 0;
  //Cash: number = 0;
  //Agel: number = 0;
  visa: number = 0;
  totalCredit: number = 0;
  totalDebit: number = 0;
  totalVatTax: number = 0;
  totalServices: number = 0;
  totalDiscount: number = 0;
  //displaybutton: any;
  totalToday: TotalDay = new TotalDay();
  reportItems: ReportItems = new ReportItems();
  credit: number = 0;
  Debit: number = 0;
  sarf: number = 0;
  qapd: number = 0;
  //mortja_mapiaat: number = 0;
  //mortja_moshtryaat: number = 0;
  netPaid: number = 0;
  Purchases: number = 0;
  countBill: number = 0;
  countItems: number = 0;
  bsConfig: any;
  customers: People[];
  suppliers: People[];
  listPeopleType: PeopleType[];
  billType: BillType;
  chkCreditOrDebit: BoxMonyCategory = new BoxMonyCategory();
  enableBTNCredit: number = 0;
  enableBTNDebit: number = 0;

  isActiveTaxServeice: number = 0;
  isActiveVatTax: number = 0;
  userName: string = '';
  _user: any;
  logo: any;
  imageSrc: any;
  typeDate: string = 'date'
  userNameType: string = ''
  isAccounter: boolean = false;
  typeUserId: any;
  loading: boolean = false;
  currentLang: string = '';
  pageTitle: string = "";
  constructor(private datepip: DatePipe, private billService: BillInvoiceService, 
    private boxMonyService: BoxMoniesService, private currService: setiingCurrency, private peiopleService: peopleService, private boxMonyTypeServe: boxMonyTypeService,
    private setting: SettingsService, private boxCategoreService: boxMonyCategoryService, private modalService: BsModalService, private userservice: UsersService,
    private homServ: HomeService, private titleService: Title, public TosterService: ToastWrapperService, private exportService: ExportService,
    public translate: TranslateService, private _location: Location, private taxService: TaxesService, public authService: AuthService, public fullScrean: FullScreenService) {

    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);
    this._user = this.authService.getUser();
    this.imageSrc = this._user.branch.companyInfo.logo;

    this.bill = new Bill();
    this.newBoxMony = new boxMony();
    this.peopleType = new PeopleType();
    this.billType = new BillType();

    this.completedPagginatedTableVM = new PagginatedTableVM();
    this.getUserAndBranchAndCompanyInfo(this.bill);
    this.getDateTime();
    this.typeUserId = this.authService.getUserType();

  }
  ngOnInit() {
    this.homServ.displayNamePages();
    this.Clear();
    //........Format Date...........//


    this.GetBillTypes();
    this.getGetBoxMonyCategory();
    this.getCurrencies();
    this.getPeopleForType();
    this.GetAllPeopleTypes();
    this.getPeopleType(this.peopleType);


    this.getBoxMonyType();
    this.getVatTax();
    this.getBillsPagginated();
    this.getItemsGroupByPagginated();
    this.getCategoryGroupByPagginated();
    var token = JSON.parse(localStorage.getItem('User'));
    this.userNameType = token.userType.nameAR;
    var _splitAccounter = this.userNameType.replace(' ', '')
    if (_splitAccounter == 'محاسب') {
      this.isAccounter = true;
    }
    this.getUserstList();
  }



  getReportsBillAndItemByDate() {
    this.getBillsPagginated();
    //this.getItemsGroupByPagginated();
    //this.getCategoryGroupByPagginated();
  }

  getDateTime() {
    this.fromDate = this.setting.getCurrentDate();
    var convertDate = this.datepip.transform(new Date, "yyyy-MM-dd h:mm");
    this.toDate = new Date(convertDate);

    var formTime = moment(this.fromTime).format("YYYY-MM-DD hh:mm a");
    var toTime = moment(this.ToTime).format("YYYY-MM-DD hh:mm a");
    this.fromTime = moment(formTime).toDate()
    this.ToTime = moment(toTime).toDate()

    this.boxMony.currentDate = this.datepip.transform(this.fromDate, "yyyy-MM-dd");
    this.boxMony.date = this.datepip.transform(new Date, "yyyy-MM-dd h:mm:ss");

  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "تقرير اليوميه";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Report Today";
      this.titleService.setTitle(this.pageTitle);
    }
  }
  navigateBack() {
    this._location.back();
  }

 // @ViewChild('reportContent') myDiv: ElementRef;

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.filterBillList, 'report-today');
  }

  // get serviceFees
  getVatTax() {
    this.taxService.getAllTaxes().subscribe(data => {
      this.TaxesList = data;
      var chkService = this.TaxesList.find(f => f.nameAr === 'قيمة الخدمة' && f.isActive == true && f.isDelete == false);
      var chkVatTax = this.TaxesList.find(f => f.nameAr === 'القيمة المضافة' && f.isActive == true && f.isDelete == false);
      if (chkService) {
        this.isActiveTaxServeice = 1;
      }
      else if (chkVatTax) {
        this.isActiveVatTax = 1;
      }
      else {
        this.isActiveTaxServeice = 0;
        this.isActiveVatTax = 0;
      }

    });

  }

  getBoxMonyType() {
    this.boxMonyTypeServe.getBoxMonyType().subscribe(data => {
      this.boxMonyTypeList = data;
    })
  }

  getTypeDateTime(type) {
    this.typeDate = type
    console.log(this.typeDate)
    if (type=='time') {
      //var convertDateTime1 = this.datepip.transform(new Date(this.fromTime), "yyyy-MM-dd h:mm");
      //var convertDateTime2 = this.datepip.transform(new Date(this.ToTime), "yyyy-MM-dd h:mm");

      //this.fromTime = new Date(convertDateTime1);
      //this.ToTime = new Date(convertDateTime2);

      //console.log(this.fromTime)
      //console.log(this.ToTime)
    }
  }


  GetBillTypes() {
    this.billService.getAllBillTypes().subscribe(data => { this.billTypeList = data; });
  }

  getBillAll(event) {
    this.all = event.target.textContent;
    this.getBillsPagginated();
  }

  getBillByBoxMonyId(id) {
    this.all = '';
    this.filterdbillVM.user.boxMonyTypeId = id;
    this.getBillsPagginated();
  }

  filterBillByBoxTypeMonyId() {

  }



  Pagginatedchanged(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.completedPagginatedTableVM.currentPage = pageEvent.pageIndex;
    this.completedPagginatedTableVM.itemsPerPage = pageEvent.pageSize;
    this.completedPagginatedTableVM.totalCount = pageEvent.length;
    this.getBillsPagginated()
  }

  getBillsPagginated() {
    var All = 1000000;
    //this.getDateTime();
    this.completedPagginatedTableVM.itemsPerPage = All;

    var _From = '';
    var _To = '';;
    if (this.typeDate == 'date') {
      var _From = this.datepip.transform(new Date(this.fromDate), "yyyy-MM-dd");
      var _To = this.datepip.transform(new Date(this.toDate), "yyyy-MM-dd h:mm a");
    }
    if (this.typeDate == 'time') {
      var _From = this.datepip.transform(new Date(this.fromTime), "yyyy-MM-dd h:mm a");
      var _To = this.datepip.transform(new Date(this.ToTime), "yyyy-MM-dd h:mm a");
      console.log(_From)
      console.log(_To)
    }
    this.loading = true;

    this.billService.getBillReportPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, _From, _To, this.filterdbillVM, 'reportToday', this.typeDate, this.all).subscribe(
      bills => {
        this.billList = bills.items;
        this.filterBillList = this.billList;
        this.completedPagginatedTableVM.totalCount = bills.totalCount;
        this.completedPagginatedTableVM.calculateShowingNo();
      },
      error => {
        this.loading = false;
 });
    if (this.typeDate == 'time') {
      this.billService.getBillReportTotalsPaginated(_From, _To, this.filterdbillVM, 'reportToday', this.typeDate, this.all).subscribe(
        (result: TotalDay) => {
          if (result) {

            this.billTotals = result;
            this.getBoxMoniesByDay();
            this.getReportToday();
            this.loading = false;

          }

        },
        error => {
          this.loading = false;
        });
    }
    if (this.typeDate == 'date') {
      this.billService.getBillReportTotalsPaginated(_From, _To, this.filterdbillVM, 'reportToday', this.typeDate, this.all).subscribe(
        (result: TotalDay) => {
          this.loading = false;
          this.billTotals = result;
          this.getBoxMoniesByDay();
        },
        error => {
          this.loading = false;
        });
    }
  }

  ResetSearchPagginated() {
    this.getDateTime();

    this.filterdbillVM = new Bill();

    this.billService.getBillReportPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, this.fromDate, this.toDate, null, 'reportToday',this.typeDate).subscribe(
      bills => {
        this.billList = bills.items;
        this.filterBillList = this.billList;
        this.completedPagginatedTableVM.totalCount = bills.totalCount;
        this.completedPagginatedTableVM.calculateShowingNo();
      },
      error => { });

    if (this.typeDate == 'time') {
      this.billService.getBillReportTotalsPaginated(this.fromDate, this.toDate, this.filterdbillVM, 'reportToday', this.typeDate).subscribe(
        (result: TotalDay) => {
          this.billTotals = result;
          this.getBoxMoniesByDay();
          this.getReportToday();
        },
        error => { });
    }
    if (this.typeDate == 'date') {
      this.billService.getBillReportTotalsPaginated(this.fromDate, this.toDate, null, 'reportToday',this.typeDate).subscribe(
        (result: TotalDay) => {
          this.billTotals = result;
          this.getBoxMoniesByDay();
        },
        error => { });
    }


  }

  getReportToday() {
    this.totalToday = this.billTotals;
    this.totalToday.qabd = this.qapd;
    this.totalToday.sarf = this.sarf;
    this.totalToday.condetion = 'reportToday';
    this.getUserAndBranchAndCompanyInfo(this.bill);
    this.totalToday.user = this.bill.user;
  }

  printReportToday() {
    this.billService.PrintTotalDay(this.totalToday).subscribe(data => {

    })
  }

  filterBillByUser(userId) {
    this.billTotals.totalBillCount = 0;
    this.billTotals.sumBillNetTotals = 0;
    this.billTotals.sumBillCash = 0;
    this.billTotals.sumBillRemaining = 0;
    this.billTotals.sumBillVisa = 0;
    this.billTotals.sumBillTotalVatTax = 0;  
    this.netTotals = 0;
    var count = 0;
    this.filterBillList = this.billList.filter(f => f.userId == userId);

    this.filterBillList.forEach(data => {
      this.billTotals.totalBillCount = count + 1
      this.billTotals.sumBillNetTotals += data.netTotal;
      if (data.paymentId == 1) {
        this.billTotals.sumBillCash += data.paied;
      }
      if (data.paymentId == 2) {
        this.billTotals.sumBillRemaining += data.remaining;
        this.billTotals.sumBillCash += data.paied;
      }
      if (data.paymentId == 3) {
        this.billTotals.sumBillVisa += data.paied;
      }
      this.netTotals += data.paied;
      this.billTotals.sumBillTotalVatTax += data.totalVatTax;
    })
  }


  getItemsGroupByPagginated() {
    //this.getDateTime();
    this.itemsGroup = [];
    this.billService.GetItemsGroup(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, this.fromDate, this.toDate, this.billDetails, 'items').subscribe(
      bills => {
        this.itemsGroup = bills;
        console.log(this.itemsGroup)
        this.completedPagginatedTableVM.totalCount = bills.totalCount;
        this.completedPagginatedTableVM.calculateShowingNo();

        //this.getUserAndBranchAndCompanyInfo(this.bill)
        //this.reportItems.user = this.bill.user
        //this.reportItems.itemsGroup = this.itemsGroup;
        //this.reportItems.currentDate = this.fromDate
        //this.reportItems.currentDate = this.toDate
        //this.billService.PrintReportItems(this.reportItems).subscribe(data => {

        //})
      },
      error => { });

  }

  categoryGroupList: any = [];
  getCategoryGroupByPagginated() {
    this.categoryGroupList = [];
    this.billService.GetItemsGroup(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, this.fromDate, this.toDate, this.billDetails, 'categories').subscribe(
      bills => {
        this.categoriesGroup = bills;

        setTimeout(() => {
          var groups = new Set(this.categoriesGroup.map(item => item.category));
          groups.forEach(g => {
            this.categoryGroupList.push({
              itemName: g,
              qty: this.categoriesGroup.filter(f => f.category === g).reduce((acc, val) => acc += val.qty, 0),
              total: this.categoriesGroup.filter(i => i.category === g).reduce((acc, val) => acc += val.total, 0),
            });
          })
        }, 500);


        console.log(this.categoryGroupList)


        this.completedPagginatedTableVM.totalCount = bills.totalCount;
        this.completedPagginatedTableVM.calculateShowingNo();
      },
      error => { });
  }

  //data: Observable<BillType[]>;
  //yourInputCtrl = new FormControl();
  //private sub: Subscription;
  //ngOnDestroy() {
  //  this.sub.unsubscribe();
  //}

  //filterData(value: string) {
  //  return this.data // like IyourAwesomeData[]
  //    .pipe(
  //      map((response) => response.filter((singleData: BillType) => {
  //        return singleData.nameAR.toLowerCase().includes(value.toLowerCase())
  //      })),
  //    );
  //}


  closeBoxCategorymodal() {
    this.getGetBoxMonyCategory();
    //refresh printer list on close modal
    this.modalRef.hide();
  }

  openBoxMonyCategoryModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-dialog modal-dialog-centered modal-lg' })
    );

    this.modalService.onHide.subscribe(e => {
      this.getGetBoxMonyCategory();

    });
  }

 

  fillterBillByBillType(billtype: BillType) {
    this.filterBillList = this.billList.filter(f => f.billTypeId == billtype.id, 0);

  }

  getBoxMoniesByDay() {
    this.sarf = 0;
    this.qapd = 0;
    var _boxMonyTypeId = this.authService.getBoxMonyId();
    this.boxMonyService.BoxMoniesPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, this.fromDate, this.toDate, _boxMonyTypeId, this.filterBoxMony).subscribe(
      data => {

    //this.boxMonyService.getBoxMoniesByDay(date,to).subscribe(data => {
      if (data) {
        //this.newBoxMony = data;
        this.boxMonyList = data;
        var BoxMony = data.filter(f => f.boxMonyCategories.nameAR != "مبيعات نقدى" && f.boxMonyCategories.nameAR != "مبيعات فيزا" &&
                                  f.boxMonyCategories.nameAR != "مشتريات نقدى" && f.boxMonyCategories.nameAR != "مشتريات فيزا");
        if (BoxMony) {
          BoxMony.forEach(res => {
            if (res.boxMonyCategories.isDebit) {
              this.sarf += res.debit;

            } else {
              this.qapd += res.credit;

            }
          })


        }
      }
      this.netTotals = this.billTotals.sumBillCash + this.qapd - this.sarf;
      this.getReportToday();
    })
  }


  getUserstList() {
    this.completedPagginatedTableVM.itemsPerPage = 10000;
    var userName = this.authService.getCurrentUserName();

    this.userservice.getusersPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, userName).subscribe(
      users => {

        this.usersList = users.items;
        console.log(this.usersList);

        this.completedPagginatedTableVM.totalCount = users.totalCount;
        this.completedPagginatedTableVM.calculateShowingNo();
      },
    );

    this.titleService.setTitle(this.pageTitle);

  }

  //get currencies
  getCurrencies() {
    this.currService.getAllCurrency().subscribe(data => {
      this.currenciesList = data;

      var currncy = this.currenciesList.find(f => f.isDefault == true);
      if (currncy != undefined) {
        this.boxMony.currencyId = currncy.id;
      } else {
        this.boxMony.currencyId = this.currenciesList[0].id;
      }
    });
  }

  getAllBillCurrencies() {
    this.filterCurrenciesList = [];
    this.billService.getAllBillCurrencies().subscribe(data => {
      this.billCurrencies = data;

      if (this.currenciesList.length != 0 && this.billCurrencies.length != 0) {

        for (var j = 0; j < this.billList.length; j++) {

          for (var i = 0; i < this.currenciesList.length; i++) {

            var chk = this.billCurrencies.find(f => f.currencyId === this.currenciesList[i].id && f.billId == this.billList[j].id);
            if (chk != undefined) {
              this.filterCurrenciesList.push(chk);

            }
          }

        }
      }
    });
  }
  GetAllPeopleTypes() {
    this.peiopleService.getAllPeopleTypes().subscribe(data => {
      this.listPeopleType = data;

      var chk = this.listPeopleType.find(f => f.nameAR == 'عميل');
      this.peopleType = chk;
      this.boxMony.boxMonyTypeId = this.peopleType.id;

    });
  }
  getPeopleType(type: PeopleType) {
    this.peopleType = type;
  }


  getCreditOrDebit(event) {
    this.chkCreditOrDebit = event;
    if (this.chkCreditOrDebit.isDebit) {
      this.enableBTNCredit = 1;
      this.enableBTNDebit = 0;

    }
    if (this.chkCreditOrDebit.isCredit) {
      this.enableBTNCredit = 0;
      this.enableBTNDebit = 1;
    }
  }

  //GetBill_Type
  getGetBoxMonyCategory() {
    this.boxCategoreService.getBoxMonyCategory().subscribe(data => {
      this.boxMonyCategoryList = data;
    });
  }

  getUser() {
    var user = this.authService.getUser();
    this.boxMony.userId = user.userId;
    this.boxMony.user.printerId = user.printerId;
    this.boxMony.user.branchId = user.branchId;
    this.boxMony.user.userTypeId = user.userTypeId;
    this.boxMony.user.boxMonyTypeId = user.boxMonyTypeId;

  }
  //box Money
  addBoxMony() {
    this.getUser();
    this.getDateTime();

    if (this.boxMony.boxMonyCategoryId == 0 && this.boxMony.note && this.boxMony.credit == null || this.boxMony.debit == null) {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }
    var chk = this.boxMonyList.find(f => f.boxMonyCategoryId == this.boxMony.boxMonyCategoryId)
    if (chk) {
      let _boxMonyDebit: number =+ this.boxMony.debit;
      let _boxMonyCredit: number =+ this.boxMony.credit;
      chk.debit +=_boxMonyDebit;
      chk.credit += _boxMonyCredit;


      
      this.boxMonyService.insertOrUpdateBoxMony(chk).subscribe(data => {
        this.getBoxMoniesByDay()
        this.massageSave();
      });

    } else {
      //this.boxMony.currentDate = this.datepip.transform(this.fromDate, "yyyy-MM-dd");
      //this.boxMony.date = this.datepip.transform(new Date, "yyyy-MM-dd h:mm:ss");
      this.boxMony.boxMonyTypeId = 1;
      this.boxMony.currencyId = 1;
      this.boxMonyService.insertOrUpdateBoxMony(this.boxMony).subscribe(data => {
        
        this.getBoxMoniesByDay();
        this.massageSave();
      });

    }

    this.ClearBoxMony();
  }
  massageSave() {
    let msg = this.translate.get("Messages.BILLSAVED").subscribe(msg => {
      this.TosterService.SucssesToaster.next(msg);
    });
  }

  ClearBoxMony() {
    this.boxMony = new boxMony();
    this.enableBTNCredit = 0;
    this.enableBTNDebit = 0;
    var _bill = new Bill();
    this.getUserAndBranchAndCompanyInfo(_bill);

  }
  Clear() {
    this.billList = null;
    this.bill.paied = 0;
    this.bill.remaining = 0;
    this.credit = 0;
    this.visa = 0;
    this.countItems = 0;
    this.totalVatTax = 0;
    this.totalServices = 0;
    this.totalDiscount = 0;

  }


  deleteBillConfirm() {
    this.modalRef.hide();
    this.DeleteBillId(this.bill);
   
  }


  deleteBill(template: TemplateRef<any>, bill: Bill) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.bill = bill;  
  }


  DeleteBillId(bill: Bill) {
    this.bill.billCurrencies = [];
    this.bill.billTaxes = [];
    bill.isDelete = true;
    this.billService.InsertOrUpdateBill(bill).subscribe(data => {
      this.getBillsPagginated();
    });

  }


  GetBillByType(id: number) {
    //return this._ListBillDate.find(f => f.billTypeID == id);
  }

  getPeopleForType() {
    this.peiopleService.getAllPeoples().subscribe(data => {
      this.customers = data.filter(f => f.peopleType.nameAR === 'عميل');
      this.suppliers = data.filter(f => f.peopleType.nameAR === 'مورد');
    })
  }

  printrItemsGroup(type) {

    this.getItemsGroupByPagginated();
    this.billService.GetItemsGroup(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, this.fromDate, this.toDate, this.billDetails, 'items').subscribe(
      bills => {
        this.itemsGroup = bills;
        this.completedPagginatedTableVM.totalCount = bills.totalCount;
        this.completedPagginatedTableVM.calculateShowingNo();

        setTimeout(() => {   
          this.clickResizePaper(type);
        }, 500);
      },
      error => { });
  }

  printerCategoryGroup(type) {
    this.categoryGroupList = [];
    this.billService.GetItemsGroup(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, this.fromDate, this.toDate, this.billDetails, 'categories').subscribe(
      bills => {
        this.categoriesGroup = bills;

        setTimeout(() => {
          var groups = new Set(this.categoriesGroup.map(item => item.category));
          groups.forEach(g => {
            this.categoryGroupList.push({
              itemName: g,
              qty: this.categoriesGroup.filter(f => f.category === g).reduce((acc, val) => acc += val.qty, 0),
              total: this.categoriesGroup.filter(i => i.category === g).reduce((acc, val) => acc += val.total, 0),
            });
          })
        }, 500);
        this.completedPagginatedTableVM.totalCount = bills.totalCount;
        this.completedPagginatedTableVM.calculateShowingNo();

        setTimeout(() => {
          this.clickResizePaper(type);

        }, 500);

      },
      error => { });


  }


  getUserAndBranchAndCompanyInfo(bill: Bill) {
    var _user = JSON.parse(localStorage.getItem('User'));
    bill.user = _user;
    bill.userId = _user.userId;
    bill.branch = _user.branch;
    bill.branchId = _user.branch.id;
    bill.companyInfo = _user.branch.companyInfo;

    this.boxMony.userId = _user.userId;
    this.boxMony.user.printerId = _user.printerId;
    this.boxMony.user.branchId = _user.branchId;
    this.boxMony.user.userTypeId = _user.userTypeId;
    this.boxMony.user.boxMonyTypeId = _user.boxMonyTypeId;
  }

  printRow(bill: Bill) {
    this.billService.getBillById(bill.id).subscribe(data => {
      this.printablebill = data;
      this.printablebill.totalAfterVatTax;

      this.getUserAndBranchAndCompanyInfo(data); 


      data.companyInfo = this._user.branch.companyInfo;
      this.billService.PrintBill(data).subscribe( result=> {

      });

      //setTimeout(() => {   
      //  this.clickResizePaper('printbill');
      //}, 500);

    })
  }
  
 
  //setTimeout(() => {    //<<<---    using ()=> syntax
  //  this.clickResizePaper();
  //}, 1000);

  clickResizePaper(type) {
    // Open used in new window
    // let printContents, popupWin;
    // printContents = document.getElementById('printbill').innerHTML;
    // // printContents = (document.querySelector(printID) as HTMLElement).innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();


    let printContents, popupWin;
    if (type =='printbill') {
      printContents = document.getElementById('printbill').innerHTML;
    }
    if (type == 'printItems') {
      printContents = document.getElementById('printItems').innerHTML;

    }
    if (type == 'printCategories') {
      printContents = document.getElementById('printCategories').innerHTML;

    }

    if (type == 'printCategories') {
      printContents = document.getElementById('printCategories').innerHTML;
    }

    if (type == 'printMiniToday') {
      printContents = document.getElementById('printMiniToday').innerHTML;
    }

    popupWin = window.open('', 'Report Abstract', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    if (this.currentLang === 'ar') {
      popupWin.document.write(`
        <html>
          <head>
            <title>Report Abstract</title>
            <style>
              @media print{
                @page
                {
                  margin:0px;
                }
              }

              *, *::before, *::after {box-sizing: border-box;}
              body {margin: 0px;width: 95%;font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;font-size: 1rem;font-weight: 400;line-height: 1.5;color: #000;text-align: left;background-color: #fff;}
              .row {display: flex;flex-wrap: wrap;}
              .col-md-5 {flex: 0 0 41.666667%;max-width: 41.666667%;position: relative;width: 100%;}
              .col-md-7 {flex: 0 0 58.333333%;max-width: 58.333333%;position: relative;width: 100%;}
              .col-md-6 {flex: 0 0 50%;max-width: 50%;position: relative;width: 100%;}
              .col-md-12 {flex: 0 0 100%;max-width: 100%;position: relative;width: 100%;}
              label {display: inline-block;margin-bottom: 0;}
              .text-center {text-align: center!important;}
              table {border-collapse: collapse;}
              th {text-align: inherit;}
              h3{margin-top: 6px;margin-bottom: 0.5rem;font-weight: 500;line-height: 1.2;border-top: 1px solid #000;padding: 5px 0px 0;}
              .printInv {background-color: #fff;padding: 0px 0px;text-align: right;}
              .printInvHeader {margin-bottom: 10px;}
              .printInvHeaderLogo2 {text-align: center;}
              .printInvDetailsAddress {display: inline-block;width: 100%;text-align: center;}
              .PrintCompanyName {display: inline-block;width: 50%;}
              .printInvDetailsAddress h1 {font-size: 25px;font-weight: bold;margin: 0px 0px 2px;}
              .PrintLogo {width: 50%;display: inline-block;}
              .printInvDetails .col-md-5 {padding-left: 0;}
              .printInvDetails .col-md-7 {padding-right: 10px;}
              .printInvDetails label {width: 100%;}
              .printInvDetails label strong {font-size: 12px;display: inline-block;padding: 3px 2px}
              .printInvDetails label span {font-size: 10px;margin-right: 3px;}
              .printInvTable table {border: 1px solid #000;width: 100%;}
              .printInvTable thead {border-bottom: 1px solid #000;}
              .printInvTable th,.printInvTable td {font-size: 10px;border-right: 1px solid #000;border-bottom: 1px solid #000;padding: 3px 2px;text-align: center;}
              .printInvAddress {border-top: 1px solid #000;padding: 3px 0;}
              .printInvAddress label {width: 100%;text-align: center;font-weight: bold;margin-bottom: 0px;font-size: 9px;}
              .printInvFooter {border-top: 1px dashed #000;padding-top: 5px;text-align: center;}
              .printInvFooter p {font-size: 10px;font-weight: bold;margin: 0;}
              .f-24{font-size: 40px;font-weight: bold;}
            </style>
          </head>
          <body onload="window.print();window.close()" dir="rtl">${printContents}</body>
        </html>`
      );
    } else if (this.currentLang === 'en'){
      popupWin.document.write(`
        <html>
          <head>
            <title>Report Abstract</title>
            <style>
              @media print{
                @page
                {
                  margin:0px;
                }
              }

              *, *::before, *::after {box-sizing: border-box;}
              body {margin: 0px;width: 95%;font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;font-size: 1rem;font-weight: 400;line-height: 1.5;color: #000;text-align: left;background-color: #fff;}
              .row {display: flex;flex-wrap: wrap;}
              .col-md-5 {flex: 0 0 41.666667%;max-width: 41.666667%;position: relative;width: 100%;}
              .col-md-7 {flex: 0 0 58.333333%;max-width: 58.333333%;position: relative;width: 100%;}
              .col-md-6 {flex: 0 0 50%;max-width: 50%;position: relative;width: 100%;}
              .col-md-12 {flex: 0 0 100%;max-width: 100%;position: relative;width: 100%;}
              label {display: inline-block;margin-bottom: 0;}
              .text-center {text-align: center!important;}
              table {border-collapse: collapse;}
              th {text-align: inherit;}
              h3{margin-top: 6px;margin-bottom: 0.5rem;font-weight: 500;line-height: 1.2;border-top: 1px solid #000;padding: 5px 0px 0;}
              .printInv {background-color: #fff;padding: 0px 0px;text-align: left;}
              .printInvHeader {margin-bottom: 10px;}
              .printInvHeaderLogo2 {text-align: center;}
              .printInvDetailsAddress {display: inline-block;width: 75%;text-align: center;}
              .printInvDetailsAddress h1 {font-size: 15px;font-weight: bold;margin: 0px 0px 2px;}
              .printInvDetails .col-md-5 {padding-right: 0;}
              .printInvDetails .col-md-7 {padding-left: 10px;}
              .printInvDetails label {width: 100%;}
              .printInvDetails label strong {font-size: 12px;display: inline-block;padding: 3px 2px}
              .printInvDetails label span {font-size: 10px;margin-left: 3px;}
              .printInvTable table {border: 1px solid #000;width: 100%;}
              .printInvTable thead {border-bottom: 1px solid #000;}
              .printInvTable th,.printInvTable td {font-size: 10px;border-left: 1px solid #000;border-bottom: 1px solid #000;padding: 3px 2px;text-align: center;}
              .printInvAddress {border-top: 1px solid #000;padding: 3px 0;}
              .printInvAddress label {width: 100%;text-align: center;font-weight: bold;margin-bottom: 0px;font-size: 9px;}
              .printInvFooter {border-top: 1px dashed #000;padding-top: 5px;text-align: center;}
              .printInvFooter p {font-size: 10px;font-weight: bold;margin: 0;}
              .f-24{font-size: 40px;font-weight: bold;}
            </style>
          </head>
          <body onload="window.print();window.close()" dir="ltr">${printContents}</body>
        </html>`
      );
      
    }
     popupWin.document.close();
  }
  ResizePaper = 'printInvRoll printInv text-right';
  SizePaper = 'printInvRoll';
  ClickResizePaper(SizePaper){
    this.ResizePaper = SizePaper + ' printInv text-right';
    this.SizePaper = SizePaper;
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.ClickPrint();
    }, 500);
    
  }
  ClickPrint() {
    // Open used in new window
    let printContents, popupWin;
    printContents = document.getElementById('printRep').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();

    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            @media print{
              @page
              {
                margin:0px;
              }
            }
            
            *, *::before, *::after {box-sizing: border-box;}
            body {margin: 0px;padding: 0px 20px;width: 100%;font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size: 1rem;font-weight: 400;line-height: 1.5;color: #000;text-align: left;background-color: #fff;}
            .row {display: flex;flex-wrap: wrap;}
            .printInvA4{width: 20cm;}/*height: 29cm;*/
            .printInvA5{width: 14cm;}/*height: 20cm;*/
            .printInvRoll{width: 80mm;}
            .printInvA4 .printInvDetails label strong,.printInvA5 .printInvDetails label strong,.printInvA4 .printInvDetails label span, .printInvA5 .printInvDetails label span{font-size: 12px;}
            .col-md-5 {flex: 0 0 41.666667%;max-width: 41.666667%;position: relative;width: 100%;}
            .col-md-7 {flex: 0 0 58.333333%;max-width: 58.333333%;position: relative;width: 100%;}
            .col-md-6 {flex: 0 0 50%;max-width: 50%;position: relative;width: 100%;}
            .col-md-12 {flex: 0 0 100%;max-width: 100%;position: relative;width: 100%;}
            label {display: inline-block;margin-bottom: 0;}
            .text-center {text-align: center !important;}
            table {border-collapse: collapse;}
            th {text-align: inherit;}
            h3{margin-top: 0;margin-bottom: 0.5rem;font-weight: 500;line-height: 1.2;}
            .printInv {background-color: #fff;padding: 0px 0px;text-align: right;}
            .printInvHeader {margin-bottom: 10px;}
            .printInvHeaderLogo2 {text-align: center;}
            .printInvDetailsAddress {display: flex;width: 100%;text-align: center;justify-content: center;align-items: center;}
            .printInvDetailsAddress h1 {font-size: 25px;margin: 0px 0px 2px;}
            .PrintLogo {display: inline-block;width: 50%;}
            .PrintCompanyName {display: inline-block;width: 50%;}
            .PrintLogo img {width: 70px;}
            .PrintName {width: 100%;}
            .PrintDate {text-align: center;width: 50%;}
            .PrintDate p {width: 100%;display: inline-block;}
            .PrintSearchType {width: 50%;text-align: center;display: flex;justify-content: center;align-items: center;}
            .PrintSearchType p {}
            p {margin: 0px 0px 10px 0px;}
            .PrintName h2 {margin: 0px 0px 10px 0px;}
            .printInvDetails .col-md-5 {padding-left: 0;}
            .printInvDetails .col-md-7 {padding-right: 10px;}
            .printInvDetails label {width: 100%;}
            .printInvDetails label strong {font-size: 10px;display: inline-block;padding: 3px 2px}
            .printInvDetails label span {font-size: 10px;margin-right: 3px;}
            .printInvTable table {border: 1px solid #000;width: 100%;}
            .printInvTable thead {border-bottom: 1px solid #000;}
            .printInvTable th,.printInvTable td {font-size: 13px;border-right: 1px solid #000;padding: 2px 8px;border-bottom: 1px solid;text-align: center;}
            .printInvTable th {padding: 8px 10px;}
            .printInvSum {margin: 5px 0px;}
            .printInvSum label {width: 100%; margin-bottom: 5px;}
            .printInvSum label strong {margin-left: 5px;font-size: 9px;}
            .printInvSum label span {font-size: 9px;}
            .printInvSum h3 {font-size: 11px;text-align: center;border: 1px solid #000;padding: 4px 0px;background-color: #f3f3f3;margin-top: 5px;margin-bottom: 0;}
            .printInvAddress {border-top: 1px solid #000;padding: 3px 0;}
            .printInvAddress label {width: 100%;text-align: center;font-weight: bold;margin-bottom: 0px;font-size: 9px;}
            .printInvFooter {border-top: 1px dashed #000;padding-top: 5px;text-align: center;}
            .printInvFooter p {font-size: 10px;font-weight: bold;margin: 0;}
            .repAbstract {padding: 10px;text-align: center;}
            .repAbstract table {width: 100%;}
            .repAbstract table thead tr th {text-align: center;white-space: nowrap;}
            .repAbstract table td {font-weight: bold;text-align: center;}
            .repAbstract table td span {display: inline-block;color: #212122;width: 100px;margin-bottom: 5px;margin-top: 5px;line-height: 40px;}
            .repAbstract table .tdCount span {background-color: #e0e0e0;}
            .repAbstract table .tdCreditor span {background-color: #80ffd4;}
            .repAbstract table .tdMoney span {background-color: #dcdcdc;}
            .repAbstract table .tdDebtor span {background-color: #ffb6c1;}
            .repAbstract table .tdQemamdafa span {background-color: #4683b0;color: #fff;}
            .repAbstract table .tdSuptotal span {background-color: #c0c0c0;}
          </style>
        </head>
        <body onload="window.print();window.close()" dir="rtl">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}

