import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, PageEvent } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../date.adapter';
import { Bill } from '../../bill-invoice/Models/Bill';
import { ReportsService } from '../reports.service';
import { BillInvoiceService } from '../../bill-invoice/bill-invoice.service';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/users/Models/User';
import { PagginatedTableVM } from '../../../Shared/classes/pagginated.table.viewmodel';
import { ApplicationService } from '../../setting/Application/application.service';
import { Application } from '../../setting/Models/Application';
import { SettingsService, TotalDay } from '../../Shared/settings.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { AuthService } from '../../../Shared/Services/auth.service';
import { ExportService } from '../../../Shared/export.service';

@Component({
	selector: 'app-report-application',
	templateUrl: './report-application.component.html',
  styleUrls: ['./report-application.component.css'],
  providers: [ApplicationService, DatePipe, ReportsService, BillInvoiceService, SettingsService,
		{
			provide: DateAdapter, useClass: AppDateAdapter
    },  
		{
			provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
		}
	]
})
export class ReportApplicationComponent implements OnInit  {
  displayedColumns: string[] = ['position', 'code', 'orderNo', 'typeInvoice', 'name', 'count', 'total', 'discount', 'typeDiscount', 'totalVatTax', 'totalInvoice', 'paid', 'remaining', 'date', 'branch', 'user', 'seller'];
  myDateFrom: any;
  myDateTo: any;
  applicationsList: Application[] = [];
  billList: Bill[] = [];
  filterbillList: Bill[] = [];


  billListByDate: Bill[] = [];
  usersList: User[] = [];
  bill: Bill;
  visa: number = 0;
  vatTax: number;
  countBill: number = 0;
  credit: number = 0;
  totalDiscount: number = 0;
  completedPagginatedTableVM: PagginatedTableVM;

  filterdbillVM: Bill = new Bill();
  AppName: string = '';

  printablebill: Bill = new Bill(); ///this object represent current selected bill

  loading: boolean = false;


  fromDate: Date;
  toDate: Date;


  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  billTotals: TotalDay = new TotalDay();
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  currentLang: string = '';
  pageTitle: string = "";

  applicationId: number = 0;
  totalApplication: number = 0;
  constructor(private datepip: DatePipe, private appServ: ApplicationService, private reportService: ReportsService, private billService: BillInvoiceService,
    private setting: SettingsService, private _location: Location, private titleService: Title, public translate: TranslateService
    , public authService: AuthService, public TosterService: ToastWrapperService, private exportService: ExportService) {
    this.bill = new Bill();
    this.completedPagginatedTableVM = new PagginatedTableVM();

    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);

  }


	ngOnInit() {
      this.myDateFrom = this.datepip.transform(Date.now(), "yyyy-MM-dd");
      this.myDateTo = this.datepip.transform(Date.now(), "yyyy-MM-dd");


      this.getAllApplication();
      //this.GetBillByDate();
      this.bill.remaining = 0;
      this.bill.paied = 0;
      this.bill.orderNo = null;
      this.bill.netTotal = null;
      this.bill.billTypeId = 1;

      this.fromDate = this.setting.getCurrentDate();
      //this.toDate = this.setting.getCurrentDate();
      this.toDate = new Date();
      this.getBillsPagginated();

  }

  exportAsXLSX(): void {
    this.exportService.exportAsExcelFile(this.filterbillList, 'report-application');
  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "تقرير التطبيقات";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Report Applications";
      this.titleService.setTitle(this.pageTitle);
    }
  }

  getBillsPagginated() {
    this.loading = true;
    this.applicationId = 0;
    this.reportService.BillReportApplicationOrTaxesPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, this.fromDate, this.toDate, this.filterdbillVM, 'reportApplication').subscribe(
      bills => {
        this.billList = bills.items;
        this.filterbillList = this.billList;
        console.log(this.filterbillList);
        this.completedPagginatedTableVM.totalCount = bills.totalCount;
        this.completedPagginatedTableVM.calculateShowingNo();

        //this.reportService.BillReportTotalsApplicationOrTaxesPaginated(this.fromDate, this.toDate, this.filterdbillVM, 'reportApplication').subscribe(
        //  result => {
        //    this.billTotals = result;
        //  },
        //  error => { });

        this.resultTotalBillApp()

        this.loading= false;

      },
      error => { });


  }


  navigateBack() {
    this._location.back();
  }

  Clear() {
    this.billList = null;
    this.bill.paied = 0;
    this.bill.remaining = 0;
    this.credit = 0;
    this.visa = 0;
    this.vatTax = 0;
  }

  Pagginatedchanged(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.completedPagginatedTableVM.currentPage = pageEvent.pageIndex;
    this.completedPagginatedTableVM.itemsPerPage = pageEvent.pageSize;
    this.completedPagginatedTableVM.totalCount = pageEvent.length;
    this.getBillsPagginated()
  }

  ResetSearchPagginated() {

    this.filterdbillVM = new Bill();

    this.reportService.BillReportApplicationOrTaxesPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, this.fromDate, this.toDate, null, 'reportApplication').subscribe(
      bills => {
        this.billList = bills.items;
        this.filterbillList = this.billList;
        this.completedPagginatedTableVM.totalCount = bills.totalCount;
        this.completedPagginatedTableVM.calculateShowingNo();

        this.reportService.BillReportTotalsApplicationOrTaxesPaginated(this.fromDate, this.toDate, null, 'reportApplication').subscribe(
          (result: TotalDay) => {
            this.billTotals = result;
          },
          error => { });
      },
      error => { });


  }

  resultTotalBillApp() {
    var netTotal = 0;
    var totalApp = 0;
    for (var i = 0; i < this.filterbillList.length; i++) {
      totalApp += this.filterbillList[i].applicationValue;
      netTotal += this.filterbillList[i].netTotal;
    }
    this.billTotals.sumBillNetTotals = netTotal;
    this.totalApplication = totalApp;
    this.billTotals.totalBillCount = this.filterbillList.length;

  }

 FilterBillByDateAndByApplication() {
   this.filterbillList = this.billList.filter(b => b.applicationId == this.applicationId);
   this.resultTotalBillApp();
  }

  getAllApplication() {
    this.appServ.GetAllApplication().subscribe(data => this.applicationsList = data);
  }
  FilterBillByDate() {
    this.filterbillList = this.billList.filter(b => b.currentDate >= this.fromDate && b.date <= this.myDateTo);

  }



  printRow(bill: Bill) {
    this.billService.getBillById(bill.id).subscribe(data => {
      this.printablebill = data;

      setTimeout(() => {    //<<<---    using ()=> syntax
        this.clickResizePapers('printbill');
      }, 500);

    })
  }


  //setTimeout(() => {    //<<<---    using ()=> syntax
  //  this.clickResizePaper();
  //}, 1000);

  clickResizePapers(type) {
    // Open used in new window
    // let printContents, popupWin;
    // printContents = document.getElementById('printbill').innerHTML;
    // // printContents = (document.querySelector(printID) as HTMLElement).innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();


    let printContents, popupWin;
    if (type == 'printbill') {
      printContents = document.getElementById('printbill').innerHTML;
    }
    if (type == 'printItems') {
      printContents = document.getElementById('printItems').innerHTML;

    }

    if (type == 'printMiniToday') {
      printContents = document.getElementById('printMiniToday').innerHTML;

    }

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
						h3{margin-top: 0;margin-bottom: 0.5rem;font-weight: 500;line-height: 1.2;}
						.printInv {background-color: #fff;padding: 0px 0px;text-align: right;}
						.printInvHeader {margin-bottom: 10px;}
						.printInvHeaderLogo2 {text-align: center;}
						.printInvDetailsAddress {display: inline-block;width: 75%;text-align: center;}
						.printInvDetailsAddress h1 {font-size: 15px;font-weight: bold;margin: 0px 0px 2px;}
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
    // popupWin.document.close();
  }
}
