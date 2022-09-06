import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, PageEvent } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../date.adapter';
import { Bill } from '../../bill-invoice/Models/Bill';
import { BillType } from '../../bill-invoice/Models/BillType';
import { ReportsService } from '../reports.service';
import { BillInvoiceService } from '../../bill-invoice/bill-invoice.service';
import { DatePipe } from '@angular/common';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/Models/User';
import { startWith, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HeaderComponent } from '../../Shared/Components/header/header.component';
import { PagginatedTableVM } from 'src/app/Shared/classes/pagginated.table.viewmodel';
import { SettingsService, TotalDay } from '../../Shared/settings.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { AuthService } from '../../../Shared/Services/auth.service';
import { ExportService } from '../../../Shared/export.service';
import { BillPlace } from '../../bill-invoice/Models/BillPlace';
import { ModalOptions, BsModalService } from 'ngx-bootstrap';
import { number } from 'prop-types';

@Component({
	selector: 'app-report-invoices',
	templateUrl: './report-invoices.component.html',
	styleUrls: ['./report-invoices.component.css'],
	providers: [
      ReportsService, BillInvoiceService, DatePipe, UsersService, SettingsService, UsersService,
		{
			provide: DateAdapter, useClass: AppDateAdapter
		},
		{
			provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
		}
	]
})
export class ReportInvoicesComponent implements OnInit, OnDestroy  {
	displayedColumns: string[] = ['position', 'code', 'orderNo', 'typeInvoice', 'name', 'count', 'total', 'discount', 'typeDiscount', 'totalVatTax', 'totalInvoice', 'paid', 'remaining', 'date', 'branch', 'user', 'seller'];
	myDateFrom: any;
	myDateTo: any;
	billTypeList: BillType[] = [];
	billList: Bill[] = [];
	filterBill: Bill[] = [];
  usersList: User[] = [];
  billPlaceList: BillPlace[] = [];

	bill: Bill;
	visa: number = 0;
	vatTax: number;
	countBill: number = 0;
	credit: number = 0;
	totalDiscount: number = 0;
  completedPagginatedTableVM: PagginatedTableVM;

  filterdbillVM: Bill = new Bill();
  BillTypeName = '';

  fromDate: Date;
  toDate: Date;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  itemPagginatedTableVM: PagginatedTableVM;

  loading: boolean = false;
  all: string = '';

  // MatPaginator Output
  pageEvent: PageEvent;

  billTotals: TotalDay  = new TotalDay();
  filterBilltype: BillType;
    modalRef: any;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  currentLang: string = '';
  pageTitle: string = "";
  userType: any;
  typeDate: string = 'date';
  constructor(private datepip: DatePipe, private reportService: ReportsService, private billServe: BillInvoiceService, private modalService: BsModalService,
      private srvUser: UsersService, private setting: SettingsService, private _location: Location, public TosterService: ToastWrapperService,
      private titleService: Title, public translate: TranslateService, public authService: AuthService, private exportService: ExportService,
      private userservice: UsersService) {
      this.bill = new Bill();
      this.completedPagginatedTableVM = new PagginatedTableVM();

      //this.currentLang = this.authService.getCurrentLang();
      //this.translate.use(this.currentLang);
      this.currentLang = translate.currentLang;

      this.changeTitle(this.currentLang);
      this.itemPagginatedTableVM = new PagginatedTableVM();

	}

  ngOnInit() {
    this.myDateFrom = this.datepip.transform(Date.now(), "yyyy-MM-dd");
    this.myDateTo = this.datepip.transform(Date.now(), "yyyy-MM-dd");
    this.bill.remaining = 0;
    this.bill.paied = 0;
    this.bill.orderNo = null;
    this.bill.netTotal = null;
    this.bill.billTypeId = 1;
    this.GetBillTypes();
    this.getUserstList()
    this.clearTotals();
    this.fromDate = this.setting.getCurrentDate();
    this.toDate = this.setting.getCurrentDate();
    this.getBillsPagginated();
    this.getAllBillPlace()
    this.userType = this.authService.getUserType();
  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.filterBill, 'report-invoice');
  }

  navigateBack() {
    this._location.back();
  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "تقرير الفواتير";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Report Invoices";
      this.titleService.setTitle(this.pageTitle);
    }
  }

  getAllBillPlace() {
    this.billServe.getAllBillPlaces().subscribe(data => {
      this.billPlaceList = data;
      localStorage.setItem('billPlaceList', JSON.stringify(this.billPlaceList));

    });
  }

  Pagginatedchanged(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.completedPagginatedTableVM.currentPage = pageEvent.pageIndex;
    this.completedPagginatedTableVM.itemsPerPage = pageEvent.pageSize;
    this.completedPagginatedTableVM.totalCount = pageEvent.length;
   this.getBillsPagginated()
  }


  getTypeDateTime(type) {
    this.typeDate = type
    if (type == 'time') {
      var convertDateTime1 = this.datepip.transform(this.fromDate, "yyyy-MM-dd hh:mm a");
      var convertDateTime2 = this.datepip.transform(this.toDate, "yyyy-MM-dd hh:mm a");
      this.fromDate = new Date(convertDateTime1);
      this.toDate = new Date(convertDateTime2);
    }
  }

  getBillAll(event) {
    this.all = event.target.textContent;
    this.getBillsPagginated();
  }



  getBillsPagginated() {

    var _From = '';
    var _To = '';;
    _From = this.datepip.transform(this.fromDate, "yyyy-MM-dd hh:mm");
    _To = this.datepip.transform(this.toDate, "yyyy-MM-dd hh:mm");

    this.loading = true;


    this.clearInput();

    this.billServe.getBillReportPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, _From, _To, this.filterdbillVM, 'reportToday', this.typeDate, this.all).subscribe(
      bills => {
        this.billList = bills.items;
        this.filterBill = this.billList;
        this.filterTotal();
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
  }



  filterTotal() {
    this.clearTotals();
    if (this.filterBill.length == 0) {
      return;
    }
    this.filterBill.forEach(data => {
      let _count = 1;
      this.billTotals.totalBillCount += _count;


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

      this.billTotals.sumBillNetTotals += data.netTotal;
      this.billTotals.totalDiscount += data.descountValue;
    
    })
  }


  getUserstList() {
    this.itemPagginatedTableVM.itemsPerPage = 10000;
    var userName = this.authService.getCurrentUserName();

    this.userservice.getusersPaginated(this.itemPagginatedTableVM.currentPage, this.itemPagginatedTableVM.itemsPerPage, this.itemPagginatedTableVM.sortKey, this.itemPagginatedTableVM.sortOrderBY, userName).subscribe(
      users => {

        this.usersList = users.items;
        this.itemPagginatedTableVM.totalCount = users.totalCount;
        this.itemPagginatedTableVM.calculateShowingNo();
      },
    );

    this.titleService.setTitle(this.pageTitle);

  }



	GetBillTypes() {
      this.billServe.getAllBillTypes().subscribe(data => {
        this.billTypeList = data;
        localStorage.setItem('billTypeList', JSON.stringify(this.billTypeList));
      });
	}

	GetUsers() {
		this.srvUser.GetAllUser().subscribe(data => { this.usersList = data;});
  }

  GetBillById() {
    this.filterdbillVM.orderNo = 0;
    this.filterdbillVM.netTotal = 0;
    this.filterdbillVM.billPlaceId = null;
    this.filterdbillVM.billTypeId = null;
    this.filterBill = this.billList.filter(b => b.id == this.filterdbillVM.id);
    this.filterTotal();
  }

  GetBillByDateAndOrderNo() {
    this.filterdbillVM.id = 0;
    this.filterdbillVM.netTotal = 0;
    this.filterdbillVM.billPlaceId = null;
    this.filterdbillVM.billTypeId = null;
    this.filterBill = this.billList.filter(b => b.orderNo == this.filterdbillVM.orderNo);
    this.filterTotal();

  }

  clearTotals() {
    this.billTotals = new TotalDay();
  }

  GetBillTypeId() {
    this.filterdbillVM.id = 0;
    this.filterdbillVM.orderNo = 0;
    this.filterdbillVM.netTotal = 0;
    this.filterdbillVM.billPlaceId = null;
    this.filterBill = this.billList.filter(b => b.billTypeId == this.filterdbillVM.billTypeId);

    this.filterTotal();

  }

  filterBillPlace() {
    this.filterdbillVM.id = 0;
    this.filterdbillVM.orderNo = 0;
    this.filterdbillVM.netTotal = 0;
    this.filterdbillVM.billTypeId = null;
    this.filterBill = this.billList.filter(b => b.billPlaceId == this.filterdbillVM.billPlaceId);
    this.filterTotal();

  }



  filterByUser(id) {

    this.filterdbillVM.id = 0;
    this.filterdbillVM.orderNo = 0;
    this.filterdbillVM.netTotal = 0;
    this.filterdbillVM.billPlaceId = null;
    this.filterdbillVM.billTypeId = null;

    var _list = [];
    this.clearTotals();
    this.clearInput();

    for (var i = 0; i < this.billList.length; i++) {
      if (this.billList[i].userId == id) {
        _list.push(this.billList[i]);
        let _count = 1;
        this.billTotals.totalBillCount += _count;
        this.billTotals.sumBillNetTotals += this.billList[i].netTotal;
        this.billTotals.sumBillCash += this.billList[i].paied;
        this.billTotals.sumBillRemaining += this.billList[i].remaining;
        this.billTotals.totalDiscount += this.billList[i].descountValue;
      }
    }
    this.filterBill = _list;

    if (this.filterBill.length == 0) {
      this.clearTotals();
    }
  }

  GetBillByDateAndPepoleName(name) {
    //if (this.filterdbillVM.pepoleName == null || this.filterdbillVM.pepoleName == undefined || this.filterdbillVM.pepoleName == "") {
    if (name == null || name == undefined || name == "") {
      this.filterBill = this.billList;
      this.filterTotal();
    }
    else {

      var chk = this.billList.filter(f => f.pepoleName != "" || f.pepoleName != null || f.pepoleName != undefined);
      if (chk != undefined) {
        this.filterBill = chk.filter(f => f.pepoleName.toLowerCase().includes(name.toLowerCase()));
        this.filterTotal();

      }

    }
  }



  GetBillByDateAndNetTotal() {
    
    if (this.filterdbillVM.netTotal == null || this.filterdbillVM.netTotal == undefined) {
      this.filterBill = this.billList;
      this.filterTotal();
    }
    else {
      this.filterBill = this.billList.filter(b => b.netTotal == this.filterdbillVM.netTotal);
      this.filterTotal();

    }

	}
	GetBillByDateAndUserID(){
      this.filterBill = this.billList.filter(b => b.userId == this.bill.userId);
      this.filterTotal();

	}

  clearInput() {

    this.filterdbillVM.id = 0;
    this.filterdbillVM.orderNo = 0;
    this.filterdbillVM.netTotal = 0;
    this.filterdbillVM.billPlaceId = 0;
    this.filterdbillVM.billTypeId = 0;

  }

	Clear() {
		this.billList = null;
		this.bill.paied = 0;
		this.bill.remaining = 0;
		this.credit = 0;
		this.visa = 0;
		this.vatTax = 0;
	}
	
	data: Observable<BillType[]>; 
	yourInputCtrl = new FormControl();
	private sub: Subscription;
	ngOnDestroy() {
		//this.sub.unsubscribe();
  	}

	filterData(value: string) {
		return this.data // like IyourAwesomeData[]
		.pipe(
			map((response) => response.filter((singleData: BillType) => {
				return singleData.nameAR.toLowerCase().includes(value.toLowerCase())
			})),
		);
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
    printContents = document.getElementById('printReptax').innerHTML;
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
            /*.printInvA4{width: 20cm;}/*height: 29cm;*/
            .printInvA5{width: 14cm;}/*height: 20cm;*/
            .printInvRoll{width: 80mm;}*/
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
    // popupWin.document.close();
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
    this.billServe.InsertOrUpdateBill(bill).subscribe(data => {
      this.getBillsPagginated();
    });

  }

}
