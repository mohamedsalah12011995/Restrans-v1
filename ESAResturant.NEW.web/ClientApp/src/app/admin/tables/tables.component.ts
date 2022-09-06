import { Component } from '@angular/core';
import { TablesService } from './tables.service';
import { Router } from '@angular/router';
import { BillInvoiceService } from '../bill-invoice/bill-invoice.service';
import { Bill } from '../bill-invoice/Models/Bill';
import { TablesPlaces } from './Models/TablesPlaces';
import { SettingsService } from '../Shared/settings.service';
import { PageEvent } from '@angular/material';
import { PagginatedTableVM } from 'src/app/Shared/classes/pagginated.table.viewmodel';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';
import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { AuthService } from '../../Shared/Services/auth.service';
import { BsModalRef } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { string } from 'prop-types';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [BillInvoiceService, TablesService, SettingsService, DatePipe]
})

@Pipe({
  name: 'dateAgo',
  pure: true
})
/** tables component*/
export class TablesComponent {
  Bill: Bill;
  objectBill: Bill = new Bill();
  BillMove: Bill = new Bill();
  timeBill: any;
  tablePlase: TablesPlaces = new TablesPlaces();

  completedPagginatedTableVM: PagginatedTableVM;
  filterdbillVM: Bill = new Bill();;

  fromDate: Date;
  toDate: Date;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [100, 150];

  // MatPaginator Output
  pageEvent: PageEvent;

  billList: Bill[] = [];
  filterbillList: Bill[] = [];

  tableList: TablesPlaces[] = [];
  filterTableList: any = [];
  filterTableEmptyList: any = [];
  modalRef: BsModalRef;

  currentLang: string = '';
  pageTitle: string = "";
  tableOld: string = '';
  tableNew: string = '';

  private _hubConnection: HubConnection | undefined;


  openDate: Date;
  dateNow: any;
  dateTimeNow: any;

  tableNewSelected: string = '';

  //this start minute and Second
  timeLeft: number = 0;
  minute: number = 0;

  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft < 60) {
        this.timeLeft++;
        if (this.timeLeft == 60) {
          this.timeLeft = 0;
          this.minute += 1;
        }
      }
    }, 10000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  private updateSubscription: Subscription;




  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }



  /** tables ctor */
  constructor(private datepip: DatePipe, private srvTables: TablesService, private srvBill: BillInvoiceService, private router: Router, private tableService: TablesService, private setting: SettingsService,
    public TosterService: ToastWrapperService, public authService: AuthService,
    private titleService: Title, public translate: TranslateService) {

    this.completedPagginatedTableVM = new PagginatedTableVM();
    this.currentLang = translate.currentLang;

    this.changeTitle(this.currentLang);
    this.getBillsPagginated();


  }
  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('tokenObj'));
    
    this.dateTimeNow = this.datepip.transform(new Date(), "yyyy-MM-dd h:mm:ss");
    this.dateNow = this.datepip.transform(new Date(), "yyyy-MM-dd");

    var kitchen = './kitchen';
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(kitchen)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));
    this.SelectedTable();



    this.fromDate = this.setting.getCurrentDate();
    this.toDate = this.setting.getCurrentDate();


    //this.updateSubscription = interval(5000).subscribe(
    //  (val) => {
    //    this.getBillsPagginated();
    //    this.SelectedTable();
    //  }
    //);

    setInterval(() => {
      //this.getTimeBill();
    }, 1000);
  }

      

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "الطولات";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Tables";
      this.titleService.setTitle(this.pageTitle);
    }
  }
  public tableEmpty: any = {
    num: null,
    class: "twlDetalis tawlaEmpty",
    time: 0,
    total: null,
    checkNumber: false
  }
  public SelectedTable = () => {
    this._hubConnection.on('SelectedTable', (data: Bill) => {


      let dateBill = this.datepip.transform(data.date, "mm");
      let dateNow = this.datepip.transform(new Date(), "mm");
      let _dateNow = dateNow.toString();
      this.minute = parseFloat(_dateNow) - parseFloat(dateBill);


      var index = this.filterTableList.findIndex(f => f.num == data.tableNo);
      var _id = this.filterbillList.findIndex(f => f.id == data.id);
      if (_id == -1) {
        this.filterbillList.push(data);
        this.filterTableList[index] = { num: data.tableNo, class: "twlDetalis tawlaBusy", time: this.minute, total: data.netTotal, checkNumber: true };
      }
      // in change bill place and chkinvoice equl true
      //if (data.id != 0 && data.billPlaceId != 2 && data.tableNo == null) {

      //  var _index = this.filterbillList.findIndex(f => f.tableNo == data.tableNo)
      //  this.filterbillList.splice(_index, 1);

      //  this.tableEmpty.num = data.tableNo
      //  this.filterTableList[index] = this.tableEmpty;
      //  this.tableEmpty = { num: null, class: "twlDetalis tawlaEmpty", time: 0, total: null, checkNumber: false }
      //  return;
      //}
      else {
        if (data.checkWiteInvoies) {
          this.filterTableList[index] = { num: data.tableNo, class: "twlDetalis tawlaBusy", time: this.minute, total: data.netTotal, checkNumber: true };

          if (data.tableNo == null && data.billPlaceId!=2) {
            var _table = localStorage.getItem('changeTableNo');
            var _indexTable = this.filterTableList.findIndex(f => f.num == _table)

            var _index = this.filterbillList.findIndex(f => f.tableNo == _table)
            this.filterbillList.splice(_index, 1);
            //this.getBillsPagginated();
            this.tableEmpty.num = data.tableNo
            this.filterTableList[_indexTable] = this.tableEmpty;
            this.tableEmpty = { num: null, class: "twlDetalis tawlaEmpty", time: 0, total: null, checkNumber: false }
            return
          }


          if (this.tableOld != '' && this.tableNew != '') {
            var indexOld = this.filterTableList.findIndex(f => f.num == this.tableOld);
            var indexNew = this.filterTableList.findIndex(f => f.num == this.tableNewSelected);

            this.tableEmpty.num = this.tableOld;
            this.filterTableList[indexOld] = this.tableEmpty;
            //this.tableEmpty = { num: null, class: "twlDetalis tawlaEmpty", time: 0, total: null, checkNumber: false }

            this.filterTableList[indexNew] = { num: this.tableNewSelected, class: "twlDetalis tawlaBusy", time: this.minute, total: data.netTotal, checkNumber: true };

            return;
          }

        }

        if (data.checkWiteInvoies == false) {
          if (data.tableNo == null && data.billPlaceId!=2) {
            var _table = localStorage.getItem('changeTableNo');
            var _indexTable = this.filterTableList.findIndex(f => f.num == _table)

            var _index = this.filterbillList.findIndex(f => f.tableNo == _table)
            this.filterbillList.splice(_index, 1);
            //this.getBillsPagginated();
            this.tableEmpty.num = _table;
            this.filterTableList[_indexTable] = this.tableEmpty;
            this.tableEmpty = { num: null, class: "twlDetalis tawlaEmpty", time: 0, total: null, checkNumber: false }
            return
          }

          var _indexBill = this.filterbillList.findIndex(f => f.tableNo == data.tableNo)
          this.filterbillList.splice(_indexBill, 1);
          //this.getBillsPagginated();
          this.tableEmpty.num = data.tableNo
          this.filterTableList[index] = this.tableEmpty;
          this.tableEmpty = { num: null, class: "twlDetalis tawlaEmpty", time: 0, total: null, checkNumber: false }

        }
      }
    }), error => {
      //this.getBillsPagginated();
    };
  }


  getTables() {
    this.tableService.getTablesPlaces().subscribe(data => {
      this.tableList = data;
    })
  }


  setectTable(table: TablesPlaces) {
    if (this.currentLang=='ar') {
      localStorage.setItem('placeName', table.nameAr);
    }
    if (this.currentLang == 'en') {
      localStorage.setItem('placeName', table.nameEn);
    }

    this.filterTableList = [];
    this.tablePlase = table;

    for (var i = table.startNum; i < table.startNum + table.count; i++) {
      this.objectBill = this.filterbillList.find(f => f.tableNo == i.toString());

      if (this.objectBill == undefined || this.objectBill == null) {

        this.filterTableList.push({ num: i, class: "twlDetalis tawlaEmpty", time: 0, checkNumber: false });

      } else {
        this.getTimeBill();
        this.filterTableList.push({ num: i, class: "twlDetalis tawlaBusy", time: this.minute, total: this.objectBill.netTotal, checkNumber: true });

      }

    }
    this.filterTableEmptyList = this.filterTableList.filter(f => f.checkNumber === false);
  }


  getTimeBill() {
    let dateBill = this.datepip.transform(this.objectBill.date, "mm");
    let dateNow = this.datepip.transform(new Date(), "mm");

    //let _dateBill = dateBill.toString();
    let _dateNow = dateNow.toString();

    this.minute = parseFloat(_dateNow) - parseFloat(dateBill);
  }



  getBillsPagginated() {


    this.completedPagginatedTableVM.itemsPerPage = 200;
    var _From = '';
    var _To = '';;
    _From = this.setting.getCurrentDate().toString();
    _From = this.datepip.transform(_From, "yyyy-MM-dd hh:mm");
    _To = this.datepip.transform(new Date, "yyyy-MM-dd hh:mm");

    //this.srvBill.getBillReportPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, _From, _To, null, 'tables', 'date','').subscribe(
    this.srvBill.BillWaitPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, _From, _To, null, 'tables').subscribe(
      bills => {
        this.billList = bills.items;
        this.filterbillList = this.billList.filter(f => f.checkWiteInvoies == true && f.tableNo != null);
        this.completedPagginatedTableVM.totalCount = bills.totalCount;
        this.completedPagginatedTableVM.calculateShowingNo();
        this.getTables();

      },
      error => {
        this.getTables();
      });

  }

  Pagginatedchanged(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.completedPagginatedTableVM.currentPage = pageEvent.pageIndex;
    this.completedPagginatedTableVM.itemsPerPage = pageEvent.pageSize;
    this.completedPagginatedTableVM.totalCount = pageEvent.length;
    this.getBillsPagginated()
  }


  getTableNumber(tableNo: string) {

    var table = this.filterbillList.findIndex(f => f.tableNo == tableNo);
    this.objectBill = this.filterbillList.find(f => f.tableNo == tableNo);

    if (table != -1 && !undefined) {
      //this.router.navigate(['/admin/billInvoice/' + this.objectBill.id]);
      this.TosterService.Bill.next(this.objectBill.id);
      this.objectBill = new Bill();

    }
    else {
      this.TosterService.TableNo.next(tableNo);
    }
    localStorage.setItem('TableMove', null);

    this.router.navigate(['/admin/billInvoice/']);
    this.TosterService.SucssesToaster.next("تم فتح الطاولة رقم" + tableNo);
  }

  MoveTableNo(tableNew) {
    this.BillMove = this.filterbillList.find(f => f.tableNo == this.tableOld);
    this.tableNew = tableNew;

  }

  refresh(): void {
    window.location.reload();
  }
  confiurmMoveTable() {
    if (this.tableOld && this.BillMove != undefined) {
      this.BillMove.tableNo = this.tableNew;
      this.srvBill.updateBill(this.BillMove).subscribe(data => {
        let msg = this.translate.get("Messages.TABLEMOVE").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
        });

        this.refresh();

        //if (this.tableOld != '' && this.tableNew != '') {
        //  var indexOld = this.filterTableList.findIndex(f => f.num == this.tableOld);
        //  var indexNew = this.filterTableList.findIndex(f => f.num == this.tableNewSelected);

        //  this.tableEmpty.num = this.tableOld;
        //  this.filterTableList[indexOld] = this.tableEmpty;
        //  //this.tableEmpty = { num: null, class: "twlDetalis tawlaEmpty", time: 0, total: null, checkNumber: false }

        //  this.filterTableList[indexNew] = { num: this.tableNewSelected, class: "twlDetalis tawlaBusy", time: this.minute, total: data.netTotal, checkNumber: true };

        //  return;
        //}


      });



    }

    //if (this.BillMove == null) {
    //  let msg = this.translate.get("Messages.TABLEMOVE").subscribe(msg => {
    //    this.TosterService.SucssesToaster.next(msg);
    //  });
    //  return;
    //}
  }

  _confuirmMoveTable() {
    if (this.BillMove) {
      //localStorage.setItem('TableMove', this.BillMove.tableNo);

      //this.BillMove.tableNo = this.tableNewSelected;
      this.BillMove.tableNo = this.tableNew;
      this.srvBill.InsertOrUpdateBill(this.BillMove).subscribe(data => { });
      let msg = this.translate.get("Messages.TABLEMOVE").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });

      localStorage.setItem('TableMove', this.BillMove.tableNo);
      this.BillMove = new Bill();
    }
    if (this.BillMove == null) {
      Bill.prototype.tableNo = this.tableNewSelected;
      let msg = this.translate.get("Messages.TABLEMOVE").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
    }
  }

  getTableOld(tableOld) {
    this.tableOld = "";
    this.tableOld = tableOld;
  }

  //getTableNew(tableNew) {
  //  this.tableNew = tableNew;
  //}

  GetBillWaiteByNmbTable(TableNo: string) {
    const Elements = Array.from(document.querySelectorAll('.tawla .twlOpen'));
    Elements.forEach(element => {
      ((element) as HTMLElement).style.visibility = 'hidden';
      ((element) as HTMLElement).style.animation = 'zoomOut 0.5s';
    });
    (document.querySelector('#table' + TableNo + ' .twlOpen') as HTMLElement).style.visibility = 'visible';
    (document.querySelector('#table' + TableNo + ' .twlOpen') as HTMLElement).style.animation = 'zoomIn 0.5s';
  }
}


