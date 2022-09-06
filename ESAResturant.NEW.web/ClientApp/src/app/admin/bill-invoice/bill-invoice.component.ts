import { Component, TemplateRef, ViewChild, ElementRef, Input, AfterContentInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemCategoryService } from '../item/item-category/item-category.service';
import { ItemsService } from '../item/items.service';
import { BillInvoiceService } from './bill-invoice.service';
import { Item } from '../item/Models/Item';
import { ItemCategory } from '../item/Models/ItemCategory';
import { Bill } from './Models/Bill';
import { ItemPrice } from '../item/Models/itemPrice';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { BillDetail } from './Models/BillDetail';
import { BillPlace } from './Models/BillPlace';
import { PaymentType } from './Models/PaymentType ';
import { peopleService } from '../People/people.service';
import { People } from '../People/Models/people';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';
import { Note } from './Models/note';
import { Application } from '../setting/Models/Application';
import { ApplicationService } from '../setting/Application/application.service';
import { TaxesService } from '../setting/Taxes/Taxes.service';
import { Taxes } from '../setting/Models/Taxes';
import { SettingesService } from '../setting/setting.service';
import { DiscountType } from '../setting/Models/DiscountType';
import { setiingCurrency } from '../setting/Currency/setiingCurrency.service';
import { Currencies } from '../setting/Models/Currencies';
import { BillTaxes } from './Models/BillTaxes';
import { BillCurrencies } from './Models/BillCurrencies';
import { SettingsService, TotalDay } from '../Shared/settings.service';
import { HomeService } from '../home.service';
import { boxMony } from '../BoxMony/Models/boxMony';
import { BoxMoniesService } from '../BoxMony/BoxMonies.service';
import { boxMonyCategoryService } from '../BoxMony/boxMonyCategory.service';
import { boxMonyType } from '../BoxMony/Models/boxMonyType';
import { BoxMonyCategory } from '../BoxMony/Models/boxMonyCategory';
import { Title } from '@angular/platform-browser';
import { BillDeliveries } from './Models/BillDeliveries';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PagginatedTableVM } from 'src/app/Shared/classes/pagginated.table.viewmodel';
import { PageEvent } from '@angular/material';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { PrinterService } from '../item/printer/printer.service';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../../users/users.service';
import { Location } from '@angular/common';
import { FullScreenService } from '../../Shared/fullscreen.service';
import { TablesService } from '../tables/tables.service';
import { TablesPlaces } from '../tables/Models/TablesPlaces';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-bill-invoice',
  templateUrl: './bill-invoice.component.html',
  styleUrls: ['./bill-invoice.component.css'],
  providers: [SettingsService, ItemsService, ItemCategoryService, BillInvoiceService, BsModalService, peopleService, DatePipe, ApplicationService,
    TaxesService, SettingesService, setiingCurrency, BoxMoniesService, boxMonyCategoryService, PrinterService, UsersService, TablesService]
})
/** BillInvoice component*/
export class billInvoiceComponent {
  /** BillInvoice ctor */
  priceitemDefult: number;
  itemList: Item[];
  itemCategoryList: ItemCategory[] = [];
  NoteList: Note[] = [];
  note: Note;
  billList: Bill[] = [];
  itemPricesList: ItemPrice[]=[];
  applicationList: Application[]=[];
  currenciesList: Currencies[]=[];

  TaxesList: Taxes[]=[];
  listDiscountType: DiscountType[];

  SerchList: any = [];
  ItemObject: any = [];
  billdetail: BillDetail;

  currency: Currencies;
  billTaxes: BillTaxes;
  billCurrency: BillCurrencies;
  discountType: DiscountType;
  itemCategory: ItemCategory;
  application: Application;
  boxMony: boxMony;
  newBoxMony: boxMony = new boxMony();
  boxCategoryList: BoxMonyCategory[];
  boxTypeList: boxMonyType[];
  boxMoniesList: boxMony[] = [];
  billDeliveries: BillDeliveries;
  //public newBillListDeteails: BillDetail[] = [];

  item: Item;
  selectedFiles: FileList;
  selectedputh: any;
  modalRef: BsModalRef;
  numberOrder: number = 0;
  numberTable: string = "";

  bill: Bill; ///this object represent current selected bill

  printablebill: Bill = new Bill(); ///this object represent current selected bill

  newbilldetail: BillDetail
  billPlaceList: BillPlace[];
  paymentTypeList: PaymentType[];

  tableinvocescount: number = 0;
  billNotTableList: Bill[] = [];
  notTableCount: number = 0;
  BillDeliveriesList: Bill[] = [];

  billDeliveryCount: number = 0;

  billTableList: Bill[] = [];
  billTableCount: number = 0;
  filterdbillVM: Bill = new Bill();

  tableList: TablesPlaces[] = [];


  billAnyList: Bill[] = [];
  billAnyCount: number = 0;

  peopleList: People[];
  selectedPeople: People;
  currentDate: any;
  date: any;
  billId: number = 0;
  IsVatCancelled: boolean;
  itemPriceDefullt: number = 0;
  isNote: boolean = false
  totalAfterVatTax: number = 0;
  totalNotePrice: number = 0;
  resultServiceFees: number = 0;
  totalBillAfterVatTax: number = 0;
  resultTotal: number = 0;
  rowObject: any;
  currencyNameAR: string = '';
  currencyNameEN: string = '';
  ApplicationName: string;
  isApplication: boolean = false;

  isNoteBool: boolean;
  isNoteClose: boolean = false;
  pageTitle: string = "";
  totalBill: number = 0;

  completedPagginatedTableVM: PagginatedTableVM;
  pageEvent: PageEvent;
  fromDate: Date = new Date();
  toDate: Date = new Date();

  countTables: number = 0;
  myControl = new FormControl();
  filteredOptions: Observable<People[]>;
  filterDate: any;
  currentLang: string = '';
  tableNo: string = null;

  isPrinting: boolean = false;
  isBill: boolean = false;

  qtyDetails: BillDetail;

  loading: boolean = false;
  private _hubConnection: HubConnection | undefined;
  href: string;
  checked: boolean = false;
  indeterminate = false;
  checkPeople: boolean = false
  checkRow: boolean;
  enableBTN: number = 0;
  chkRemove: number = 0;
  enableBTN1: number = 0;
  chkRole: number = 0;
  chkprintRow: number = 0;
  disabledbtn: number = 0;
  chkVat: Taxes = new Taxes();
  vatTaxe: number = 0;

  @Input() public appAutoFocus: boolean;

  constructor(private datepip: DatePipe, private modalService: BsModalService, private itemService: ItemsService, private serItemCategory: ItemCategoryService,
    private billservice: BillInvoiceService, private peiopleService: peopleService, public TosterService: ToastWrapperService, private route: ActivatedRoute,
    private router: Router, private appServe: ApplicationService, private taxServ: TaxesService, private settServe: SettingesService, private currService: setiingCurrency,
    private settingsService: SettingsService, private homeServe: HomeService, private boxMonyServer: BoxMoniesService, private tableService: TablesService,
    private boxCategorServer: boxMonyCategoryService, private titleService: Title, public translate: TranslateService, private printe: PrinterService,
    public authService: AuthService, private singInService: UsersService, private el: ElementRef, private _location: Location, private fullService: FullScreenService) {




    this.bill = new Bill();
    this.note = new Note();
    this.billTaxes = new BillTaxes();
    this.billCurrency = new BillCurrencies();
    this.currency = new Currencies();
    this.discountType = new DiscountType();
    this.newbilldetail = new BillDetail();
    this.application = new Application();
    this.selectedPeople = new People();
    this.billDeliveries = new BillDeliveries();
    this.boxMony = new boxMony();

    this.completedPagginatedTableVM = new PagginatedTableVM();
    this.qtyDetails = new BillDetail;
    this.printablebill = new Bill();



    var _user = JSON.parse(localStorage.getItem('User'));
    var name = _user.userType.nameAR;
    if (name == 'كابتن أوردر') {
      this.chkRole = 1;
      this.disabledbtn = 1;
    }

    this.IsVatCancelled = false;
    this.isNoteBool = false;
    this.TosterService.TableNo.next(null);
  }

  ngOnInit() {
    this.itemPricesList = [];
    this.billTableList = [];
    this.currenciesList = [];
    this.billNotTableList = [];
    this.BillDeliveriesList = [];
    this.getAllBillPaymentType();
    this.getAllItemCategory();
    this.getAllGetPeoples();
    this.getNots();
    this.getApplication();
    this.getVatTax();
    this.getAllDiscountType();


    this.getAllBoxCategory();
    this.getAllBoxType();
    this.getAllBillPlace();
    this.getBoxMoniesByDay();
    this.getCurrencies();
    this.GetAllItemByPaginated();
    this.getTables()

    this.toDate = new Date(this.bill.currentDate);
    this.homeServe.displayNamePages();
    this.currentLang = this.authService.CurrentLang;
    this.getBillsPagginated();

    this.myControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(data => {
      if (data == null || data == undefined || data.trim() == '') {
        this.checkPeople = false;

      }
      else {

        this.filteredOptions = this.peiopleService.getAllPeopleByPhoneOrName(data)
        this.checkPeople = true;
      }
    });


    this.route.params.subscribe(pram => {
      if (pram['id']) {
        this.billId = pram['id'];
        this.getBillById(this.billId);
        this.hideModel();
      }
    });


    this.TosterService.Bill.subscribe((data: number) => {
      this.getBillById(data);
    })

    this.TosterService.TableNo.subscribe(data => {
      if (this.bill.id > 0 && this.bill.tableNo != null) {
        //this.ngOnInit();
        this.bill = new Bill();
        this.bill.tableNo = data;
        this.getCurrencies();
        this.sum();

      }

      else {
        //this.bill.billPlaceId = 2;
        this.bill.tableNo = data
      }
      if (this.bill.billPlaceId > 0) {
        this.checkDelivery(this.bill.billPlace);
        this.bill.reference = localStorage.getItem('placeName');
      }

    })


    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);


    var kitchen = './kitchen';
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(kitchen)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => {
      this.playAudio();
      console.error(err.toString())
    });
    this.AddBill();
    this.EditBill();
    this.DeleteBill();
    //this.deleteBillbysignalR();
    var _currentDate = this.settingsService.getCurrentDate();
    
    this.getLastDate(_currentDate);
  }




  getDateTime() {
    this.fromDate = this.settingsService.getCurrentDate();
    this.toDate = this.settingsService.getCurrentDate();
    this.bill.currentDate = this.settingsService.getCurrentDate();
    this.date = this.datepip.transform(new Date(), "yyyy-MM-dd h:mm:ss");
    this.currentDate = this.datepip.transform(new Date(), "yyyy-MM-dd");
    this.TosterService.CurrentDateUser.subscribe(data => {
      this.bill.currentDate = data;
    })
  }

  openTableModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-lg' });
  }

  public AddBill = () => {
    this._hubConnection.on('AddBill', (data: Bill) => {
      //this.playAudio();

      localStorage.setItem('orderNo', JSON.stringify(data.orderNo));
      var _order = JSON.parse(localStorage.getItem('orderNo'));
      this.numberOrder = _order + 1;

      //var indexListBill = this.billList.findIndex(f => f.id == data.id);

      //this.TosterService.requestNumberOrderChanged.next(data.orderNo + 1);
      //this.TosterService.requestNumberBillIdChanged.next(data.id);

      //// check data if true in table not null
      //if (data.checkWiteInvoies == true && data.tableNo != null) {
      //  var index = this.billTableList.findIndex(f => f.id == data.id);
      //  if (index == -1) {
      //    this.billTableList.push(data);
      //  }
      //  var _indexDelivery = this.BillDeliveriesList.findIndex(f => f.id == data.id);
      //  var _indexAny = this.billAnyList.findIndex(f => f.id == data.id);
      //  if (indexListBill == -1) {
      //    this.billList.push(data);
      //  }
      //  if (_indexDelivery > -1) {
      //    this.BillDeliveriesList.splice(_indexDelivery, 1)
      //    this.billDeliveryCount = this.BillDeliveriesList.length;
      //    this.billList[indexListBill] = data;

      //  }
      //  if (_indexAny > -1) {
      //    this.billAnyList.splice(_indexAny, 1)
      //    this.billAnyCount = this.billAnyList.length;
      //    this.billList[indexListBill] = data;
      //  }
      //  this.billTableCount = this.billTableList.length;
      //  if (index == -1) {
      //    this.billList[indexListBill] = data;
      //    this.billTableList[index] = data;
      //  }
      //}

      //// in chkInvoice in Delivery
      //if (data.checkWiteInvoies == true && data.billPlaceId == 1 && data.tableNo == null) {
      //  var index = this.BillDeliveriesList.findIndex(f => f.id == data.id);
      //  if (index == -1) {
      //    this.BillDeliveriesList.push(data);
      //  }
      //  if (indexListBill == -1) {
      //    this.billList.push(data);
      //  }
      //  if (indexListBill > -1) {
      //    this.billList[indexListBill] = data;
      //  }
      //  var _index = this.billAnyList.findIndex(f => f.id == data.id);
      //  if (_index > -1) {
      //    this.billAnyList.splice(_index, 1)
      //    this.billAnyCount = this.billAnyList.length;
      //  }
      //  var _indexTable = this.billTableList.findIndex(f => f.id == data.id);
      //  if (_indexTable > -1) {
      //    this.billTableList.splice(_indexTable, 1)
      //    this.billTableCount = this.billTableList.length;
      //  }
      //  this.billDeliveryCount = this.BillDeliveriesList.length;

      //  if (index > -1) {
      //    this.billList[indexListBill] = data;
      //    this.BillDeliveriesList[index] = data;
      //  }
      //}
      

      //// in chkinvoice equle true and Safry
      //if (data.checkWiteInvoies == true && data.billPlaceId != 1 && data.tableNo == null) {
      //  var index = this.billAnyList.findIndex(f => f.id == data.id);
      //  if (index == -1) {
      //    this.billAnyList.push(data);
      //  }
      //  if (indexListBill == -1) {
      //    this.billList.push(data);
      //  }
      //  if (indexListBill > -1) {
      //    this.billList[indexListBill] = data;
      //  }

      //  var _index = this.BillDeliveriesList.findIndex(f => f.id == data.id);
      //  if (_index > -1) {
      //    this.BillDeliveriesList.splice(_index, 1);
      //    this.billDeliveryCount = this.BillDeliveriesList.length;
      //  }

      //  var _indexTable = this.billTableList.findIndex(f => f.id == data.id);
      //  if (_indexTable > -1) {
      //    this.billTableList.splice(_indexTable, 1)
      //    this.billTableCount = this.billTableList.length;

      //  }
      //  this.billAnyCount = this.billAnyList.length;

      //  if (index > -1) {
      //    this.billList[indexListBill] = data;
      //    this.billAnyList[index] = data;
      //  }
      //}



      ////......................................//


      //// check data if false
      //if (data.checkWiteInvoies == false && data.tableNo != null) {
      //  var _indexNewbill = this.billTableList.findIndex(f => f.id == data.id);
      //  var _indexbillList = this.billList.findIndex(f => f.id == data.id);
      //  if (_indexNewbill > -1) {
      //    this.billTableList.splice(_indexNewbill, 1);
      //    this.billList.splice(_indexbillList, 1);
      //    this.billTableCount = this.billTableList.length;
      //  }
      //}

      //if (data.checkWiteInvoies == false && data.billPlaceId == 1 && data.tableNo == null) {
      //  var _indexNewbill = this.BillDeliveriesList.findIndex(f => f.id == data.id);
      //  var _indexbillList = this.billList.findIndex(f => f.id == data.id);

      //  if (_indexNewbill > -1) {
      //    this.BillDeliveriesList.splice(_indexNewbill, 1);
      //    this.billList.splice(_indexbillList, 1);
      //    this.billDeliveryCount = this.BillDeliveriesList.length;
      //  }
      //}

      //if (data.checkWiteInvoies == false && data.billPlaceId != 1 && data.tableNo == null) {
      //  var _indexAnyList = this.billAnyList.findIndex(f => f.id == data.id);
      //  var _indexDeliverList = this.BillDeliveriesList.findIndex(f => f.id == data.id);
      //  var _indexBillTableList = this.billTableList.findIndex(f => f.id == data.id);
      //  var _indexBillList = this.billList.findIndex(f => f.id == data.id);

      //  if (_indexAnyList > -1) {
      //    this.billAnyList.splice(_indexAnyList, 1);
      //    this.billAnyCount = this.billAnyList.length;
      //  }
      //  if (_indexDeliverList > -1) {
      //    this.BillDeliveriesList.splice(_indexDeliverList, 1);
      //    this.billDeliveryCount = this.BillDeliveriesList.length;
      //  }
      //  if (_indexBillTableList > -1) {
      //    this.billTableList.splice(_indexBillTableList, 1);
      //    this.billTableCount = this.billTableList.length;
      //  }
      //  if (_indexBillList > -1) {
      //    this.billList.splice(_indexBillList, 1);
      //  }
      //}

      //if (data.tableNo) {
      // // this.TosterService.tablePost.next(data);
      //}


      this.getBillsPagginated();
    });


  }

  public EditBill = () => {
    this._hubConnection.on('EditBill', (data: Bill) => {
      this.TosterService.getTable.next(data);
    });
  }

  public DeleteBill = () => {
    this._hubConnection.on('DeleteBill', (data: Bill) => {
      //var _index = this.billList.findIndex(f => f.id == data.id);
      //if (_index != -1) {
      //  this.billList.splice(_index, 1);
      //}
      //if (data.billPlaceId == 1) {
      //  var index = this.BillDeliveriesList.findIndex(f => f.id == data.id);
      //  this.BillDeliveriesList.splice(index, 1)
      //  this.billDeliveryCount = this.BillDeliveriesList.length;
      //}
      //if (data.billPlaceId == 3) {
      //  var index = this.billAnyList.findIndex(f => f.id == data.id);
      //  this.billAnyList.splice(index, 1)
      //  this.billAnyCount = this.billAnyList.length;
      //}

      this.getBillsPagginated();

    });
  }

  changeTitle(language: string) {
    if (language == 'ar' || language == '') {
      this.pageTitle = "فاتورة المبيعات";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Bill Invoice";
    }
    this.titleService.setTitle(this.pageTitle);

  }
  clickFocus() {

    setTimeout(() => {
      (document.getElementById('myfocus') as HTMLElement).focus();

    }, 500);
  }

  refresh(): void {
    window.location.reload();
  }

  getLastDate(date) {
    this.billservice.GetLastBill(date).subscribe(order => {
      localStorage.setItem('orderNo', JSON.stringify(order));

      if (order==1) {
        this.numberOrder = 1;
      }
      else {
        this.numberOrder = order;
      }
    })
  }

  getTables() {
    this.tableService.getTablesPlaces().subscribe(data => {
      this.tableList = data;
    })
  }

  getBillRefrence(level: TablesPlaces) {
    document.querySelectorAll('.invLevel').forEach(element => {
      (element as HTMLElement).classList.remove('invLevelActive');
    });
    (document.querySelector('#level' + level.id) as HTMLElement).classList.add('invLevelActive');
    if (this.currentLang=='ar') {
      this.bill.reference = level.nameAr;
    }
    if (this.currentLang == 'en') {
      this.bill.reference = level.nameEn;
    }
  }

  getBillsPagginated() {
    this.bill.currentDate = this.settingsService.getCurrentDate();
    this.completedPagginatedTableVM.itemsPerPage = 200;
    //this.fromDate = new Date();
    //this.toDate = new Date();
    var _From = '';
    var _To = '';;
    _From = this.fromDate.toString();
    _From = this.datepip.transform(_From, "yyyy-MM-dd hh:mm");
    _To = this.datepip.transform(new Date, "yyyy-MM-dd hh:mm");



    this.billservice.getBillReportPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, _From, _To, null, 'billInvoice', 'date', '').subscribe(
      bills => {
        //bills.items.forEach(data => {
        //  this.filterDate = this.datepip.transform(data.currentDate, "yyyy-MM-dd");
        //  data.currentDate = this.filterDate
        //})
        //this.filterbillList = bills.items;
        this.billList = bills.items;
        this.filterListBill();
        this.completedPagginatedTableVM.totalCount = bills.totalCount;
        this.completedPagginatedTableVM.totalCount = this.countTables;
        this.completedPagginatedTableVM.calculateShowingNo();


      },
      error => {
      });

  }


  filterListBill() {
    var user = this.authService.getUser();
    this.billTableList = this.billList.filter(f => f.checkWiteInvoies == true && f.tableNo != null);
    this.BillDeliveriesList = this.billList.filter(f => f.checkWiteInvoies == true && f.billPlaceId == 1 && f.tableNo == null);
    this.billAnyList = this.billList.filter(f => f.checkWiteInvoies == true && f.billPlaceId != 1 && f.tableNo == null);

    this.billTableCount = this.billTableList.length;
    this.billDeliveryCount = this.BillDeliveriesList.length;
    this.billAnyCount = this.billAnyList.length;
  }

  getTotatBill() {
    this.getUserAndBranchAndCompanyInfo(this.bill);
    this.filterdbillVM = this.bill;

    var _From = '';
    var _To = '';;
    _From = this.fromDate.toString();
    _From = this.datepip.transform(_From, "yyyy-MM-dd hh:mm");
    _To = this.datepip.transform(new Date, "yyyy-MM-dd hh:mm");

    this.billservice.getBillReportTotalsTodayPaginated(_From, _To, this.filterdbillVM, 'reportToday', 'date','').subscribe(
      (result: TotalDay) => {
        //this.getUserAndBranchAndCompanyInfo(this.bill);
        result.user = this.bill.user;
        result.condetion = 'billInvoice';
        result.sarf = 0;
        var chkDebit = this.boxMoniesList.filter(f => f.boxMonyCategories.isDebit == true);
        if (chkDebit) {
          chkDebit.forEach(data => {
            result.sarf += data.debit;
          })
        }
        this.billservice.PrintTotalDay(result).subscribe(data => {

        });

      },
      error => { });
  }


  getItemByidPaginated(id) {
    this.completedPagginatedTableVM.itemsPerPage = 200;

    this.itemService.GetItemByidPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY,'').subscribe(
      pageddata => {

      },
      error => { });
  }

  GetItemByidPaginatedById(catId?) {

    var _itemPriceDefault = null;
    this.itemList = this.itemListPage.filter(f => f.itemCategoryId == catId);

    this.itemList.forEach(item => {
      this.itemPricesList = item.itemPrices;
      if (this.itemPricesList.length == 1) {
        item.itemPriceDefault = this.itemPricesList[0].price;
      }

      if (this.itemPricesList.length > 1) {
        _itemPriceDefault = this.itemPricesList.find(f => f.isDefullt == true);
        if (_itemPriceDefault == undefined || _itemPriceDefault == null) {
          item.itemPriceDefault = this.itemPricesList[0].price;
        }
        else {
          item.itemPriceDefault = _itemPriceDefault.price;

        }
      }

    });

    setTimeout(() => {

      document.querySelectorAll('.invCat button').forEach(element => {
        (element as HTMLElement).classList.remove('catActive');
      });
      (document.querySelector('.invCat button#cat' + catId) as HTMLElement).classList.add('catActive');
    }, 500);

  }
  public itemListPage: Item[] = [];
  GetAllItemByPaginated() {

    this.itemService.GetItemByidPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY,'').subscribe(
      pageddata => {
        this.itemListPage = pageddata.items;

        this.GetItemByidPaginatedById();
        //this.itemListPage.forEach(item => {
        //  this.itemPricesList = item.itemPrices;
        //  if (this.itemPricesList.length == 1) {
        //    item.itemPriceDefault = this.itemPricesList[0].price;
        //  }
        //  if (this.itemPricesList.length > 1) {
        //    item.itemPriceDefault = this.itemPricesList.find(f => f.isDefullt == true).price;
        //  }

        //});
      },
      error => { });
  }



  printRowItem() {
    this.chkprintRow = 1;
  }

  chekrow(event) {
    this.checked = event.checked;
  }
  exiteprintRowItem(billdetail: BillDetail) {
    this.newbilldetail = new BillDetail();
    this.chkprintRow = 2;
    this.checked = false
    //var index = this.bill.billDetails.findIndex(f => f.id == billdetail.id);
    //this.bill.billDetails[index] = billdetail;
    //this.sum();
  }
  public _detailsBefor: BillDetail[] = [];
  public _detailsIsSeparate: BillDetail[] = [];
  public _detailsIsFire: BillDetail[] = [];
  public _FinalyDetails: BillDetail[] = [];

  getRowDetails(billdetail: BillDetail, event) {
    this.checked = event.checked;


    if (event.checked == true) {
      var index = this.bill.billDetails.findIndex(f => f.id == billdetail.id);

      billdetail.isFire = event.checked;
      billdetail.isSeparate = event.checked;

      this.bill.billDetails[index] = billdetail;

      this._FinalyDetails = this.bill.billDetails.filter(f => f.isDelete == true);
      this._detailsIsSeparate = this.bill.billDetails.filter(f => f.isSeparate == false || f.isSeparate == null);
      this._detailsIsFire = this.bill.billDetails.filter(f => f.isFire == false || f.isFire == null || f.isFire == true);

      var chk = this._detailsBefor.findIndex(f => f.id == billdetail.id);
      if (chk == -1) {
        this._detailsBefor.push(billdetail);
      }
      else {
        this._detailsBefor[chk] = billdetail;
      }
    }

    else {
      billdetail.isFire = event.checked;
      billdetail.isSeparate = event.checked;
      var index = this.bill.billDetails.findIndex(f => f.id == billdetail.id);
      this.bill.billDetails[index] = billdetail;
      return;
    }
  }

  printIsFireOrSeparate(type) {

    if (this.bill.billDetails.length == 0 || this.checked== false) {
      return;
    }

    this.bill.billDetails = this._detailsBefor.filter(f => f.isFire == true || f.isSeparate == true);

    if (this.bill.billDetails.length > 0) {
      var _isFire = 0;
      var _isSeparate = 0;
      if (this._detailsBefor.length == 0) {
        return;
      }

      this.bill.billDetails = this._detailsBefor.filter(f => f.isFire == true || f.isSeparate == true);
      this.bill.checkWiteInvoies = true;
      this.getUserAndBranchAndCompanyInfo(this.bill);
      if (type == 'isFire') {
        //this.bill.billDetails = this.bill.billDetails.filter(f => f.isFire == true && f.isSeparate == false);
        for (var i = 0; i < this.bill.billDetails.length; i++) {
          this.bill.billDetails[i].isSeparate = false;
        }
        _isFire = 1;

        this.billservice.PrintBillFire(this.bill).subscribe(data => {
          if (type == 'isFire') {
            let msg = this.translate.get("Messages.SENDBILL").subscribe(msg => {
              this.TosterService.SucssesToaster.next(msg);
            });
          }
        })
      }
      if (type == 'isSeparate') {
        //this.bill.billDetails = this.bill.billDetails.filter(f => f.isSeparate == true && f.isFire == false);
        for (var i = 0; i < this.bill.billDetails.length; i++) {
          this.bill.billDetails[i].isFire = false;
        }
        _isSeparate = 1;

        this.billservice.PrintBillSepareate(this.bill).subscribe(data => {
          if (type == 'isFire') {
            let msg = this.translate.get("Messages.SENDBILL").subscribe(msg => {
              this.TosterService.SucssesToaster.next(msg);
            });
          }
        })
      }


      this.sum();



      if (_isSeparate == 1) {
        this.bill.billDetails = this._detailsIsSeparate;
        _isFire = 0;
      }
      if (_isFire == 1) {
        this.bill.billDetails = this._detailsIsFire;
        _isSeparate = 0;
      }
      this.sum();
    }
  }


  getBoxMoniesByDay() {
    this.boxMonyServer.getBoxMoniesByDay(this.fromDate, this.toDate).subscribe(data => {
      this.boxMoniesList = data;
    })
  }

  getAllBoxCategory() {
    this.boxCategorServer.getBoxMonyCategory().subscribe(data => {
      this.boxCategoryList = data;
      var find = this.boxCategoryList.find(f => f.nameAR == 'مبيعات نقدى');
      this.boxMony.boxMonyCategoryId = find.id;
      this.boxMony.boxMonyCategories = find;
    })
  }

  getAllBoxType() {
    this.boxCategorServer.getBoxMonyType().subscribe(data => {
      this.boxTypeList = data;
      var find = this.boxTypeList.find(f => f.nameAR == 'الخزنة الافتراضية');
      this.boxMony.boxMonyTypeId = find.id;
      this.boxMony.boxMonyTypes = find;
    })
  }

  // get DiscountType
  getAllDiscountType() {
    this.settServe.getAllDiscountType().subscribe(data => {
      this.listDiscountType = data;
      this.getValueFromDiscountType();
    });
  }
  getValueFromDiscountType() {
    var chkDiscount = this.listDiscountType.find(f => f.nameAr == 'نسبة');
    this.discountType = chkDiscount;
    if (chkDiscount != null) {
      this.bill.discountId = chkDiscount.id;
    }
    else {
      this.bill.discountId = 0;
    }
    this.sum();
  }
  // get serviceFees
  getVatTax() {
    this.taxServ.getAllTaxes().subscribe(data => {
      this.TaxesList = data;
        this.getValueFromTaxesList();

    });

  }
  getValueFromTaxesList() {
    //var chkService = this.TaxesList.find(f => f.nameAr === 'قيمة الخدمة' && f.isActive == true && f.isDelete == false);
    //this.chkVat = this.TaxesList.find(f => f.nameAr === 'القيمة المضافة' && f.isActive == true && f.isDelete == false);


      var chkService = null;
    if (this.TaxesList.length > 0) {

      this.TaxesList.forEach(tax => {
        if (tax.nameAr == 'قيمة الخدمة' && tax.isActive) {
          chkService = tax;
        }
        if (tax.nameAr == 'القيمة المضافة' && tax.isActive) {
          this.chkVat = tax;
          this.vatTaxe = tax.percentValue;
        }
      })

      if (chkService != null) {
        //Bill.prototype.serviceFees = chkService.percentValue;
        this.bill.serviceFees = chkService.percentValue;
      }

      else {
        this.bill.serviceFees = 0;
      }
    }
  }

  // get applications
  getApplication() {
    this.appServe.GetAllApplication().subscribe(data => {
      if (data == null) {
        this.applicationList = [];
      }
      else {
        this.applicationList = data;
      }
    });
  }
  getApplicationById(app: Application) {
    this.application = app;
    this.resultTotal = 0;
    this.bill.billPlaceId = 1;
    if (app.id == this.bill.applicationId) {
      this.bill.applicationId = null;
      this.bill.applicationValue = 0;
      this.ApplicationName = '';
    }
    else {

      if (app.discountId == 1) {
        var rse = app.price * this.bill.netTotal / 100;
        this.bill.applicationValue = rse / this.currency.bankValue;
      }
      else {
        this.bill.applicationValue = app.price;
      }

      this.bill.applicationId = app.id;
      this.ApplicationName = app.nameAr;
      this.bill.applicationDiscountid = app.discountId;
    }
    this.sum();
  }

  //get currencies
  getCurrencies() {
    this.currService.getAllCurrency().subscribe(data => {
      this.currenciesList = data;
      //this.bill.currencyId = this.currenciesList.find(f => f.isDefault == true).id;
      this.getValueCurrencyById();

    });
  }
  getCurrencyInChange(curr: Currencies) {

    this.currency = curr;
    this.bill.currencyId = curr.id;
    this.currencyNameAR = curr.nameAr;
    this.currencyNameEN = curr.nameEn;
    this.bill.currencies = curr;
    //this.bill.descountValue = 0;
    //this.bill.currentDiscount = 0;
    this.sum();
    this.checkPaymentKachOrAgel(this.bill.paymentType);
  }

  getValueCurrencyById() {

    var chkCurrency = this.currenciesList.find(f => f.isDefault == true);
    if (chkCurrency != null) {
      this.boxMony.currencies = chkCurrency;
      this.boxMony.currencyId = chkCurrency.id;
      this.bill.currencyId = chkCurrency.id;
      this.currencyNameAR = chkCurrency.nameAr;
      this.currencyNameEN = chkCurrency.nameEn;
      this.getCurrencyInChange(chkCurrency);
    }
    else {
      var chkCurrency = this.currenciesList[0];
      this.boxMony.currencies = chkCurrency;
      this.boxMony.currencyId = chkCurrency.id;
      this.bill.currencyId = chkCurrency.id;
      this.currencyNameAR = chkCurrency.nameAr;
      this.currencyNameEN = chkCurrency.nameEn;
      this.getCurrencyInChange(chkCurrency);
      //this.bill.currencyId = 0;
    }
    this.sum();
  }

  getNots() {
    this.billservice.getAllNote().subscribe(data => {
      this.NoteList = data;
    });
  }

  addNote() {
    if (this.note.nameAr === '') {

      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });

      return;
    }
    this.billservice.InsertOrUpdateNote(this.note).subscribe(data => {
      this.getNots();
      let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      this.note = new Note();
    });
  }

  delete_Note(id) {
    this.billservice.deleteNote(id).subscribe(data => { this.getNots(); this.clearNote(); });
  }

  deleteNoteConfirm() {
    this.modalRef.hide();
    this.delete_Note(this.note.id);
  }

  deleteNote(template: TemplateRef<any>, note: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.note = note;
  }


  getBillById(id) {
    this.loading = true;
    this.billservice.GetBillById(id).subscribe(data => {
      this.bill = data.items[0];
      this.loading = false;
      this.numberOrder = this.bill.orderNo;
      //this.newBillListDeteails = data.billDetails;
      this.bill.billDetails = this.bill.billDetails.filter(f => f.isDelete == false);
      this.bill.currentDate = this.bill.currentDate;
      this.bill.date = this.bill.date;
      this.numberOrder = this.bill.orderNo;
      this.isBill = true;
      localStorage.setItem('changeTableNo', this.bill.tableNo);

      this.bill.billDetails.forEach(data => {
        if (data.itemPrice.itemSize.sizeNameAr ==="لايوجد")
          data.itemPrice.itemSize.sizeNameAr = " "
      })
      //this.TosterService.requestNumberOrderChanged.next(this.bill.orderNo);
      //this.TosterService.requestNumberBillIdChanged.next(this.bill.id);
      //if (this.bill.tableNo != null) {
      //  this.TosterService.requestNumberTableChanged.next(this.bill.tableNo);
      //}


      var chk = this.currenciesList.find(f => f.isDefault == true);
      if (chk == undefined) {
        var chk = this.currenciesList[0];

      }
      this.currencyNameAR = chk.nameAr;
      this.currencyNameEN = chk.nameEn;

      this.resultTotal = this.bill.netTotal / chk.bankValue;

      this.application = this.bill.application;
      this.discountType = this.bill.discountType;

      this.sum();
    });
  }

  getDiscount(discount) {
    this.discountType = discount;
    this.bill.discountType = discount;
    this.sum();
  }

  getValueDiscount() {
    var chkDiscount = this.listDiscountType.find(f => f.nameAr === 'نسبة');
    if (chkDiscount != null) {
      this.discountType.nameAr = chkDiscount.nameAr;
    }
  }

  isClickNote() {
    if (this.isNoteBool == false) {
      (document.querySelector('.invSaveNote') as HTMLElement).style.display = 'block';
      this.isNoteBool = true
      return;
    }
    if (this.isNoteBool == true) {
      (document.querySelector('.invSaveNote') as HTMLElement).style.display = 'none';
      this.isNoteBool = false;
      return;
    }
  }

  clearNote() {
    this.note = new Note();
  }

  checkDelivery(place: BillPlace) {
    if (place.id != 2) {
      this.bill.tableNo = null;
    }
    this.bill.billPlace = place;
    this.bill.billPlaceId = place.id;
    localStorage.setItem('placeId', JSON.stringify(place.id));

    if (this.bill.billPlace.nameAR == 'تيك آوى' || this.bill.billPlace.nameAR == 'ديلفرى' || this.bill.billPlace.nameAR == 'توصيل') {
      this.bill.serviceFees = 0;
      this.bill.serviceFeesValue = 0;
    }
    if (this.bill.billPlace.nameAR == 'طلبات سيارة' || this.bill.billPlace.nameAR == 'سيارة') {
      $('#exampleModalCenterPlaceByCar').modal('show');

    }
    else {
      this.getValueFromTaxesList();
    }
    this.sum();

    if (this.bill.billPlaceId == 1) {
      //this.bill.paymentId = this.paymentTypeList.find(f => f.nameAR == 'آجل').id;
      this.checkPaymentKachOrAgel(this.bill.paymentType);
    }
  }

  isClickRowDetail(billdetail: BillDetail) {
    setTimeout(() => {
      document.querySelectorAll('.tableRow').forEach(element => {
        (element as HTMLElement).classList.remove('RowSelect');
      });
      (document.querySelector('.tableRow #billdetail' + billdetail.itemPrice.id) as HTMLElement).classList.add('RowSelect');
      this.rowObject = billdetail;
    }, 500);

  }

  getLastRow() {
    let last: any = this.bill.billDetails.length - 1;
    if (last != -1) {
      setTimeout(() => {
        document.querySelectorAll('.invTable tbody tr.tableRow').forEach(element => {
          (element as HTMLElement).classList.remove('RowSelect');
        });

        (document.querySelector('.invTable tbody #billdetail' + last) as HTMLElement).classList.add('RowSelect');
      }, 300);
    }
  }


  setMyStyles() {
    let styles = {
      'opacity': this.bill.id==0 ? '0.5' : '1',
      'cursor': this.bill.id == 0 ? 'no-drop' : 'default',
      //'pointer-events': this.chkprintRow == 0 ? 'none' : 'painted',


    };
    return styles;
  }

  setMyStylesIsSeparate() {
    let styles = {
      'opacity': this.chkprintRow != 0 ? '0.5' : '1',
      'cursor': this.chkprintRow != 0 ? 'no-drop' : 'default',
      'pointer-events': this.chkprintRow != 0 ? 'none' : 'all',

    };
    return styles;
  }

  setMyStylestems() {
    let styles = {
      'pointer-events': this.chkprintRow != 0 ? 'none' : 'all',
    };
    return styles;
  }

  selectsIndex;
  SelectedRow(details: BillDetail, index?, event?) {
    if (event!=undefined) {
      this.checked = event.checked;

    }
    this.newbilldetail = details;
    this.selectsIndex = index;
    setTimeout(() => {
      document.querySelectorAll('.invTable tbody tr.tableRow').forEach(element => {
        (element as HTMLElement).classList.remove('RowSelect');
      });
    }, 500);

    let last: any = this.bill.billDetails.lastIndexOf(details);
    if (last != -1 && this.bill.billDetails.length != 0) {
      setTimeout(() => {    //<<<---    using ()=> syntax
        (document.querySelector('.invTable tbody #billdetail' + index) as HTMLElement).classList.add('RowSelect');
      }, 500);

    }



    //this.rowObject = details;
    //this.rowObject.note = details.note;
    //this.rowObject.notePrice = details.notePrice;

  }

  // true
//  background-color: #28a745;
//color: #fff;
  // false
  //color: #202020;

  clickOpeneNote() {
    //console.log(this.newbilldetail);
    if (this.bill.billDetails.length > 0) {
      setTimeout(() => {
        this.NoteList.forEach(note => {
          var chk = this.newbilldetail.note.includes('-' + note.nameAr);
          if (chk) {
            (document.querySelector('#Note' + note.id) as HTMLElement).style.backgroundColor = '#c3bebe';
            (document.querySelector('#Note' + note.id) as HTMLElement).style.color = '#fff';

          } else {
            (document.querySelector('#Note' + note.id) as HTMLElement).style.backgroundColor = '#fff';
            (document.querySelector('#Note' + note.id) as HTMLElement).style.color = '#334236';

          }

        })
      }, 500);
    }


  }

  isClickGetNote(note: Note) {


    if (this.bill.billDetails.length > 0) {

      this.note = note;
      var chk = this.newbilldetail.note.includes(note.nameAr);
      if (chk) {


        if (this.currentLang == 'en') {
          this.newbilldetail.note.replace('-' + note.nameEn, '');
          this.newbilldetail.note = replace;
        }
        else {
          var replace = this.newbilldetail.note.replace('-' + note.nameAr, '');
          this.newbilldetail.note = replace;
        }
        this.newbilldetail.notePrice -= this.note.price;
        this.bill.netTotal -= this.note.price;

      }

      else {

        if (this.currentLang == 'en') {
          this.newbilldetail.note += '-' + this.note.nameEn.split('-', 1);
        }
        else {
          this.newbilldetail.note += '-' + this.note.nameAr.split('-', 1);
        }

        this.newbilldetail.notePrice += this.note.price;
        this.bill.netTotal += this.note.price;
      }

      this.sum();

    }
  }

  openPricesModal(template: TemplateRef<any>, selecteditem: Item) {
    this.item = selecteditem;
    this.itemPricesList = selecteditem.itemPrices;
    this.modalRef = this.modalService.show(template);

  }

  pushItemInDetails(selecteditem: Item, type: string) {
    //this.keyDown = true;
      this.item = selecteditem;
      var find;
      selecteditem.itemPrices.forEach(data => {
        //find = this.bill.billDetails.find(f => f.itemPrice.id == data.id && f.isPrint == true);
        find = this.bill.billDetails.find(f => f.itemPrice.id == data.id && f.isPrint);
      });

      if (find != null && find.isPrint && find.isDelete == false) {
        find.qty += 1;
        find.supTotal = find.itemSellPrice * find.qty;
        var total = find.vatTax * find.itemSellPrice / 100 * find.qty;
        find.totalAfterVatTax = find.supTotal + total;


        var index = this.bill.billDetails.findIndex(f => f.itemPrice.id == find.itemPriceId && f.isPrint);
        this.bill.billDetails[index] = find;

        //Select Row
        this.SelectedRow(find);
        this.sum();
        this.checkPaymentKachOrAgel(this.bill.paymentType);
      }
      else {
        this.pushItemRow(selecteditem)
      }

    
  }




  pushItemRow(selecteditem: Item) {
    this.newbilldetail = new BillDetail();
    this.newbilldetail.isPrint = true;
    this.newbilldetail.isDelete = false;
    this.item = selecteditem;
    if (this.bill.id > 0) {
      this.newbilldetail.isNew = true;
    }

    this.itemPricesList = selecteditem.itemPrices;
    this.itemPricesList.forEach(itemPrices => {
      this.newbilldetail.itemPrice.id = itemPrices.id
      this.newbilldetail.itemPriceId = itemPrices.id
      this.newbilldetail.itemId = this.item.id;
      this.newbilldetail.item = this.item;
      this.newbilldetail.unit = this.item.unit;
      this.newbilldetail.qty = 1;
      this.newbilldetail.unitId = selecteditem.unitId;
      this.newbilldetail.itemSellPrice = itemPrices.price;
      this.newbilldetail.itemPrice = itemPrices;

      if (this.newbilldetail.itemPrice.itemSize.sizeNameAr == 'لايوجد') {
        this.newbilldetail.itemPrice.itemSize.sizeNameAr = " ";
        this.newbilldetail.itemPrice.itemSize.sizeNameEn = " ";
      }
    });
    this.newbilldetail.vatTax = selecteditem.vat;
    this.newbilldetail.supTotal = this.newbilldetail.itemSellPrice * this.newbilldetail.qty;
    this.sumDetails();
    this.bill.billDetails.push(this.newbilldetail);
    //Select Row
    this.getLastRow();
    this.sum();
    this.checkPaymentKachOrAgel(this.bill.paymentType);
  }



  sumDetails() {
    let suptotal = 0;
    let total = this.newbilldetail.itemSellPrice + (this.newbilldetail.vatTax * this.newbilldetail.itemSellPrice / 100);
    //for (var i = 0; i < this.bill.billDetails.length; i++) {
    //  suptotal+= this.bill.billDetails[i].itemSellPrice;
    //}
    this.newbilldetail.totalAfterVatTax = total * this.newbilldetail.qty;
    //this.newbilldetail.supTotal = suptotal;
  }

  clearList() {
    this._billDtail = new BillDetail();
    this._detaiItemRemove = [];
    this._detailsBefor = [];
    this._detailsIsFire = [];
    this._detailsIsSeparate = [];
    this._FinalyDetails = [];
  }

  clearbill() {
    this.router.navigate(['/admin/billInvoice/']);
    this.clearList();
    document.querySelectorAll('.invWaits').forEach(element => {
      (element as HTMLElement).classList.remove('invWaitsActive');
    });
    this.enableBTN = 0;
    this.enableBTN1 = 0;
    this.loading = false;
    this.chkprintRow = 0;
    this.tableNo = null;
    this.TosterService.TableNo.next(null);
    this.checked = false




    var _date = this.settingsService.getCurrentDate();
    this.date = this.datepip.transform(new Date(), "yyyy-MM-dd h:mm:ss");
    this.currentDate = this.datepip.transform(_date, "yyyy-MM-dd");

    this.getLastDate(_date);


    this.selectedPeople = new People();
    this.bill = new Bill();

    this.bill.currentDate = this.currentDate;
    this.bill.date = this.date;



    this.currency = new Currencies();
    this.application = new Application();
    this.billDeliveries = new BillDeliveries();
    this.filterListBill();
    this.getValueFromTaxesList();
    this.getValueCurrencyById();
    this.getValueFromDiscountType();
    this.resultTotal = 0;

    this.bill.paymentType = this.paymentTypeList.find(f => f.nameAR == 'نقدى' || f.nameAR == 'كاش');
    this.bill.paymentId = this.bill.paymentType.id;
    this.bill.billPlace = this.billPlaceList.find(f => f.nameAR == 'محلى');
    this.bill.billPlaceId = this.bill.billPlace.id;

    this.getAllGetPeoples();
    this.filteredOptions = null;
    this.myControl.setValue('');

  }

  SelectItemPrice(selecteditemprice: ItemPrice, index) {
    //this.modalRef.hide();

    let find = this.bill.billDetails.find(f => f.itemPrice.id == selecteditemprice.id && f.isPrint);

    if (find != null && find.isPrint  && find.isDelete == false) {
      find.qty += 1;
      find.supTotal = find.itemSellPrice * find.qty;
      var total = find.vatTax * find.itemSellPrice / 100 * find.qty;
      find.totalAfterVatTax = find.supTotal + total;

      var _index = this.bill.billDetails.findIndex(f => f.itemPrice.id == find.itemPriceId && f.isPrint);
      this.bill.billDetails[_index] = find;
      //Select Row
      this.rowObject = find;

    }
    else {

      this.newbilldetail = new BillDetail();
      this.newbilldetail.isPrint = true;
      this.newbilldetail.isDelete = false;

      if (this.bill.id>0) {
        this.newbilldetail.isNew = true;
      }

      this.newbilldetail.itemPrice.id = selecteditemprice.id;
      this.newbilldetail.itemPriceId = selecteditemprice.id;
      this.newbilldetail.itemId = this.item.id;
      this.newbilldetail.vatTax = this.item.vat;
      this.newbilldetail.item = this.item;
      this.newbilldetail.unit = this.item.unit;
      this.newbilldetail.unitId = this.item.unitId;
      this.newbilldetail.qty = 1;

      this.newbilldetail.itemSellPrice = selecteditemprice.price;
      this.newbilldetail.itemPrice = selecteditemprice;

      if (this.newbilldetail.itemPrice.itemSize.sizeNameAr == 'لايوجد') {
        this.newbilldetail.itemPrice.itemSize.sizeNameAr = " ";
        this.newbilldetail.itemPrice.itemSize.sizeNameEn = " ";
      }
      this.newbilldetail.supTotal = this.newbilldetail.itemSellPrice * this.newbilldetail.qty;

      this.sumDetails();


      this.bill.billDetails.push(this.newbilldetail);
      //Select Row
      this.getLastRow();
    }
    this.sum();
    //this.bill.serviceFeesValue = this.bill.serviceFees * this.resultTotal / 100;
    this.checkPaymentKachOrAgel(this.bill.paymentType);
  }

  changePaid() {
    if (this.bill.paied === null || this.bill.paied === undefined) {
      this.bill.paied = 0;
      this.bill.remaining = 0;
      return;
    }

    this.bill.remaining = this.bill.paied - this.resultTotal;
  }

  checkPaymentKachOrAgel(payment: PaymentType) {
    var _payment =payment.nameAR.replace(' ','')
    if (_payment || _payment == 'كاش') {
      this.bill.remaining = 0;
      this.bill.paied = 0;
      this.bill.paymentId = 1;
    }

    if (_payment == 'فيزا') {
      this.bill.remaining = 0;
      this.bill.paied = 0;
      this.bill.paymentId = 3;

    }

    if (_payment == 'آجل') {
      this.bill.paied = 0;
      this.bill.remaining = this.resultTotal;
      this.bill.paymentId = 2;

    }
  }

  sum() {
    if (this.bill.currentDiscount == null || this.bill.currentDiscount == undefined) {
      this.bill.currentDiscount = 0;
    }
    this.resultTotal = 0;
    var total = 0;
    var quntity = 0;
    var totalAfterVat = 0;
    var vat = 0;
    var notePrice = 0;

    this.bill.billDetails = this.bill.billDetails.filter(f => f.isDelete == false);
    for (var i = 0; i < this.bill.billDetails.length; i++) {
      quntity += this.bill.billDetails[i].qty;
      total += this.bill.billDetails[i].supTotal;
      vat += (this.bill.billDetails[i].vatTax * this.bill.billDetails[i].itemSellPrice / 100) * this.bill.billDetails[i].qty;
      totalAfterVat += this.bill.billDetails[i].totalAfterVatTax;
      notePrice += this.bill.billDetails[i].notePrice;
    }
    this.bill.totalNotePrice = notePrice;

    this.bill.totalQty = quntity;
    this.bill.totalVatTax = vat;
    this.bill.supTotal = total;
    var _getVatTax = this.vatTaxe * this.bill.supTotal / 100;
    this.bill.totalAfterVatTax = this.bill.supTotal + _getVatTax;
    this.totalBillAfterVatTax = totalAfterVat;


    var totalDiscount = 0;
    this.bill.descountValue = 0;
    if (this.bill.currentDiscount > 0) {


      var chk = this.discountType.nameAr == 'نسبة';
      if (chk) {
        let totalDiscount = this.bill.currentDiscount * this.bill.supTotal / 100;
        this.bill.descountValue = totalDiscount;
      }
      else {
        this.bill.descountValue = this.bill.currentDiscount;
      }


      totalDiscount = this.bill.supTotal - this.bill.descountValue;
      this.bill.serviceFeesValue = this.bill.serviceFees * totalDiscount / 100;
      this.bill.totalVatTax = this.chkVat.percentValue * this.bill.supTotal / 100;
    }
    if (this.bill.currentDiscount == 0) {
      this.bill.serviceFeesValue = this.bill.serviceFees * this.bill.supTotal / 100;
      this.bill.totalVatTax = this.chkVat.percentValue * this.bill.supTotal / 100;
      totalDiscount = this.bill.supTotal - this.bill.descountValue;

    }

    this.bill.netTotal = totalDiscount + this.bill.applicationValue;
    this.bill.netTotal = this.bill.netTotal + this.bill.serviceFeesValue + this.bill.totalVatTax;
    this.bill.netTotal = this.bill.netTotal + notePrice;

    this.resultTotal = this.bill.netTotal;
    this.totalBill = this.bill.netTotal;


    if (this.selectedPeople.id != 0) {
      if (chk) {
        let totalDiscount = this.selectedPeople.discount * this.bill.supTotal / 100;
        this.bill.descountValue = totalDiscount;
      }
      else {
        this.bill.descountValue = this.selectedPeople.discount;
      }
    }
    this.resultTotal = this.resultTotal / this.currency.bankValue;
    this.totalBill = this.resultTotal / this.currency.bankValue;

  }

  removeRow(index, template: TemplateRef<any>, billdetail: BillDetail) {
    if (billdetail.id == 0) {
      this.bill.billDetails.splice(index, 1);
      this.sum();
    }
    else {
      this.deleteItem(index, template, billdetail)
    }
    var chk = this.bill.billDetails.length;
    if (chk == index) {
      index = index - 1;
    }
    let _billDetail = this.bill.billDetails[this.bill.billDetails.length - 1];
    this.SelectedRow(_billDetail, index);

  }

  hideModel() {
    this.fullService.closeAllModels();
  }

  IncreaseQty(billdetail: BillDetail) {
    billdetail.qty = billdetail.qty + 1;
    billdetail.supTotal = billdetail.itemSellPrice * billdetail.qty;
    billdetail.vatTaxValue = billdetail.vatTax * billdetail.itemSellPrice / 100;

    let total = billdetail.itemSellPrice + (billdetail.vatTax * billdetail.itemSellPrice / 100);
    billdetail.totalAfterVatTax = total * billdetail.qty;
    this.sum();
  }

  decreaseQty(billdetail: BillDetail) {
    billdetail.qty = billdetail.qty - 1
    billdetail.supTotal = billdetail.itemSellPrice * billdetail.qty
    billdetail.vatTaxValue = billdetail.vatTax * billdetail.itemSellPrice / 100;
    let total = billdetail.itemSellPrice + (billdetail.vatTax * billdetail.itemSellPrice / 100);
    billdetail.totalAfterVatTax = total * billdetail.qty;
    this.sum();
    if (billdetail.qty == 0) {
      //this.removeRow(billdetail);
    }

  }

  getAllGetPeoples() {
    this.peiopleService.getAllPeoples().subscribe(data => {
      this.peopleList = data.filter(f => f.isNotActive == true);
    });
  }

  getAllItemCategory() {
    this.serItemCategory.getAllItemCategories().subscribe(data => {
      var chk = data.filter(f => f.sellCategory == true);
      this.itemCategoryList = chk;

      var _user = JSON.parse(localStorage.getItem('User'));
      var nameAR = _user.userType.nameAR;
      var nameEN = _user.userType.nameEN;
      if (nameAR == '' || nameEN == 'admin') {
          this.itemCategoryList = this.itemCategoryList.map((value) => {
          if (value.id) {
            if (this.authService.HasItemCategory(value.id)) {
              return value;
            }
          }
          else {
            return undefined;
          }

        }).filter(x => x != undefined);

      }


    });
  }

  getAllBillPlace() {
    this.billservice.getAllBillPlaces().subscribe(data => {
      this.billPlaceList = data

      this.bill.billPlace = this.billPlaceList.find(f => f.nameAR == 'محلى');
      this.bill.billPlaceId = this.bill.billPlace.id;
      localStorage.setItem('placeId', JSON.stringify(this.bill.billPlaceId));

      this.checkDelivery(this.bill.billPlace)
    });
  }

  getAllBillPaymentType() {

    this.billservice.getAllBillPaymentType().subscribe(data => {

      this.paymentTypeList = data;
      this.bill.paymentType = this.paymentTypeList.find(f => f.nameAR == 'نقدى' || f.nameAR == 'كاش');
      this.bill.paymentId = this.bill.paymentType.id
      //this.getAllBillPlace();
      this.checkPaymentKachOrAgel(this.bill.paymentType);
    });
  }

  condetionsBill(checkInvoic: boolean) {

  }

  getUserAndBranchAndCompanyInfo(bill: Bill) {
    var _user = JSON.parse(localStorage.getItem('User'));
    bill.user = _user;
    bill.userId = _user.userId;
    bill.branch = _user.branch;
    bill.branchId = _user.branch.id;
    bill.companyInfo = _user.branch.companyInfo;

    this.boxMony.userId = _user.userId;
    this.boxMony.user = _user;
    this.boxMony.user.printerId = _user.printerId;
    this.boxMony.user.branchId = _user.branchId;
    this.boxMony.user.userTypeId = _user.userTypeId;
    this.boxMony.user.boxMonyTypeId = _user.boxMonyTypeId;
  }

  saveBill(checkInvoic: boolean, type?) {

    this.getUserAndBranchAndCompanyInfo(this.bill);


    if (this.bill.currentDiscount == null || this.bill.currentDiscount == undefined) {
      this.bill.currentDiscount = 0;
    }

    else if (this.bill.applicationId != undefined && this.bill.billPlaceId != 1) {
      let msg = this.translate.get("Messages.REQUIRDDELIVERY").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });

      return;
    }

    else if (this.bill.billDetails.length == 0) {
      let msg = this.translate.get("Messages.ITEMSREQUIRED").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });

      return;
    }
    else if (this.bill.paymentId == 2 && this.bill.peopleID == 0) {

      let msg = this.translate.get("Messages.PEOPLEREQUIRED").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }
    if (this.bill.billPlaceId != 2 && this.bill.tableNo != null) {
      let msg = this.translate.get("Messages.NODELIVERYFORTABLES").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });

      return;
    }

    else if (this.bill.checkWiteInvoies == false && this.bill.paymentId != 2) {
      this.bill.paied = this.resultTotal;
      this.bill.remaining = 0;
    }

    this.enableBTN = 1;
    this.enableBTN1 = 1;
    this.loading = true;
    this.bill.currentLang = this.currentLang;

    this.bill.currentDate = this.settingsService.getCurrentDate();
    this.bill.date = this.datepip.transform(new Date, "yyyy-MM-dd hh:mm a");

    this.bill.billDetails.forEach(data => {
      data.currentDate = this.bill.currentDate
      data.date = this.bill.date;
    });

    this.bill.billTaxes = [];
    this.TaxesList.forEach(tax => {

      this.billTaxes.taxesId = tax.id;
      this.billTaxes.percentValue = tax.percentValue;
      this.billTaxes.total = this.resultTotal;
      this.bill.billTaxes.push(this.billTaxes);
      this.billTaxes = new BillTaxes();
    });

    this.bill.billCurrencies = [];
    this.currenciesList.forEach(currency => {
      if (currency.id == this.bill.currencyId) {
        this.billCurrency.isSelected = true;
      }
      this.billCurrency.currencyId = currency.id;
      this.billCurrency.bankValue = currency.bankValue;
      this.billCurrency.total = this.bill.netTotal / currency.bankValue;;
      this.bill.billCurrencies.push(this.billCurrency);
      this.billCurrency = new BillCurrencies();
    });

    //if (checkInvoic == false && this.bill.tableNo != null) {
    //  this.bill.billDetails.forEach(data => {
    //    data.isNew = false;
    //  })
    //  this.bill.isApproverd = 2;
    //}

    if (checkInvoic == false && this.bill.id != 0) {
      this.bill.billDetails.forEach(data => {
        data.isNew = false;
      })
      this.bill.isApproverd = 2;
    }

    if (checkInvoic == false && this.bill.id == 0) {
      this.bill.billDetails.forEach(data => {
        data.isNew = false;
      })
      this.bill.isApproverd = 1;
    }

    if (checkInvoic == true) {
      this.bill.billDetails.forEach(data => {
        data.isNew = false;
      })
      this.bill.isApproverd = 1;
    }




    if (this.bill.paymentId == 2) {
      this.bill.remaining = this.bill.netTotal - this.bill.paied;
    }
    else {
      this.bill.paied = this.bill.netTotal;
    }
    if (this.bill.notes == '') {
      this.bill.notes = 'لا توجد ملاحظات';
    }
    this.bill.netTotal = this.resultTotal;
    this.bill.checkWiteInvoies = checkInvoic;
    this.bill.billTypeId = 1;
    this.bill.totalVatTax = Number((this.bill.totalVatTax).toFixed(2));
    this.bill.serviceFeesValue = Number((this.bill.serviceFeesValue).toFixed(2));
    this.bill.paied = Number((this.bill.paied).toFixed(2));
    this.bill.remaining = Number((this.bill.remaining).toFixed(2));
    this.bill.netTotal = Number((this.bill.netTotal).toFixed(2));
    this.billservice.InsertOrUpdateBill(this.bill).subscribe(
      result => {

        this.printablebill = result;
        if (this.printablebill == null) {
          this.printablebill = new Bill();
        }

        this.isPrinting = true;
        //if (checkInvoic == false) {

        //  var chk = this.boxMoniesList.find(f => f.boxMonyCategoryId == this.boxMony.boxMonyCategoryId);

        //  if (chk) {

        //    if (this.bill.paymentId == 2) {
        //      chk.credit += this.bill.paied;
        //    }
        //    else {
        //      chk.credit += this.resultTotal;
        //    }
        //    this.boxMonyServer.insertOrUpdateBoxMony(chk).subscribe(data => {

        //      this.getBoxMoniesByDay();
        //    });

        //  }

        //  else {

        //    if (this.bill.paymentId == 2) {
        //      this.boxMony.credit = this.bill.paied;
        //    }
        //    else {
        //      this.boxMony.credit = this.resultTotal;
        //    }
        //    this.boxMony.debit = 0;
        //    this.boxMony.currentDate = this.bill.currentDate;
        //    this.boxMony.date = new Date();
        //    this.boxMony.currentBalance = 0;
        //    this.boxMony.boxMonyCategoryId = 4;
        //    this.boxMony.currencyId = this.currency.id;
        //    this.boxMony.currencies = this.currency;
        //    this.boxMony.note = 'وارد مبيعات';

        //    this.boxMonyServer.insertOrUpdateBoxMony(this.boxMony).subscribe(data => { this.getBoxMoniesByDay() });
        //  }
        //}


        if (this._detaiItemRemove.length > 0) {
          this.enableBTN = 0;
          this.enableBTN1 = 0;
          this.loading = false;
          this.clearList();
          return;
        }
        this.clearbill();
        this.hideModel();

        if (checkInvoic == false) {
          let msg = this.translate.get("Messages.BILLSAVED").subscribe(msg => {
            this.TosterService.SucssesToaster.next(msg);
          });
          //this.TosterService.getTable.next(result);
        }
        else if (checkInvoic == true) {

          let msg = this.translate.get("Messages.BILLPAUSED").subscribe(msg => {
            this.TosterService.SucssesToaster.next(msg);
          });
        }

      },
      error => {
        console.log(error)
        let msg = this.translate.get("Messages.UNEXPEXTED").subscribe(msg => {
          this.TosterService.ErrorToaster.next(msg);
        });
        this.enableBTN = 0;
        this.enableBTN1 = 0;
        this.loading = false;
      }
    );
  }

  getBillInvoise(bill: Bill) {
    this.bill = bill;
    this.billservice.getBillDetailById(bill.id).subscribe(detail => {
      this.bill.billDetails = detail;
    })
  }


  onpeopleChange(peopleid) {
    this.filteredOptions.subscribe(peopels => {
      this.selectedPeople = peopels.find(x => x.name == this.myControl.value, 0);
      this.bill.currentDiscount = this.selectedPeople.discount;
      this.boxMony.people = this.selectedPeople;
      this.boxMony.peopleId = this.selectedPeople.id
      this.billDeliveries.deliveryName = this.selectedPeople.name;
      this.billDeliveries.deliveryPhone = this.selectedPeople.phone;
      this.billDeliveries.deliveryAddress = this.selectedPeople.address;
      this.bill.billDeliveries = [];
      this.bill.billDeliveries.push(this.billDeliveries);
      this.bill.pepoleName = this.selectedPeople.name;
      this.bill.peopleID = this.selectedPeople.id;
      this.sum();
    });
  }

  addPeople(people: BillDeliveries) {
    if (this.billDeliveries.deliveryName == '') {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      }); return;
      this.checkPeople = false;
    }
    if (this.selectedPeople.name == undefined && this.selectedPeople.phone == undefined && this.selectedPeople.address == undefined) {
      for (var i = 0; i < this.peopleList.length; i++) {
        this.peopleList[i]['PeopleName'];
        if (this.selectedPeople.name === this.peopleList[i]['name'] || this.selectedPeople.phone === this.peopleList[i]['phone'] || this.selectedPeople.address === this.peopleList[i]['address']) {
          let msg = this.translate.get("Messages.PEOPLEEXIST").subscribe(msg => {
            this.TosterService.ErrorToaster.next(msg);
          });
          return;
        }
      }
    }
    this.selectedPeople.name = people.deliveryName;
    this.selectedPeople.phone = people.deliveryPhone;
    this.selectedPeople.address = people.deliveryAddress;
    this.selectedPeople.peopleCategoryId = 1;
    this.selectedPeople.peopleTypeId = 1;

    //this.bill.billPlaceId = this.billPlaceList.find(f => f.nameAR == 'طلبات سيارة').id;

    if (this.bill.billPlaceId == 4) {
      this.billDeliveries.deliveryName = this.selectedPeople.name;
      this.billDeliveries.deliveryPhone = this.selectedPeople.numberCar;
    }
    else {

      this.billDeliveries.deliveryName = this.selectedPeople.name;
      this.billDeliveries.deliveryPhone = this.selectedPeople.phone;
      this.billDeliveries.deliveryAddress = this.selectedPeople.address;
      this.bill.billDeliveries = [];

      this.filteredOptions = this.peiopleService.getAllPeopleByPhoneOrName(people.deliveryName)
      this.checkPeople = true;
    }

    this.bill.billDeliveries.push(this.billDeliveries);

    this.peiopleService.InsertOrUpdatePeople(this.selectedPeople).subscribe(data => {
      this.getAllGetPeoples();
      this.bill.peopleID = data.id;
      this.bill.pepoleName = data.name;


      let msg = this.translate.get("Messages.PEOPLESAVED").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });

    });

  }


  getLastBill() {
    this.billservice.GetBillLastid().subscribe(data => {
      this.TosterService.requestNumberBillIdChanged.next(data.id);
    })
  }

  deleteBill(bill: Bill) {
    bill.isDelete = true;
    this.billservice.InsertOrUpdateBill(bill).subscribe(data => {
      let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      this.clearbill();
    })
  }

  deleteBillConfirm() {
    this.modalRef.hide();
    this.deleteBill(this.bill);
  }

  deleteBillById(template: TemplateRef<any>, bill: Bill) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.bill = bill;
  }

  //deleteBillbysignalR() {
  //  this._hubConnection.on('DeletedBill', (bill: Bill) => {
  //    this.playAudio();

  //    var _findBillDeliivrey = this.BillDeliveriesList.find(f => f.id == bill.id)
  //    var indexDelivery = this.BillDeliveriesList.findIndex(f => f.id == bill.id);
  //    var indexAny = this.billAnyList.findIndex(f => f.id == bill.id);

  //    if (_findBillDeliivrey != undefined || _findBillDeliivrey != null) {
  //      this.BillDeliveriesList.splice(indexDelivery, 1);
  //    }
  //    var _findBill = this.billAnyList.find(f => f.id == bill.id)
  //    if (_findBill != undefined || _findBill != null) {
  //      this.billAnyList.splice(indexAny, 1);
  //    }
  //    this.billDeliveryCount = this.BillDeliveriesList.length;
  //    this.billAnyCount = this.billAnyList.length;
  //  });
  //}

  qtyInp: number;
  qtyModal(num: number) {
    if (this.qtyInp === undefined) {
      this.qtyInp = num;
    } else {
      this.qtyInp = Number(this.qtyInp + '' + num);
    }

  }
  qtyModalMin() {
    this.qtyInp = undefined;
  }
  qtyModalOk(qty) {
    if (qty === 0 || qty === undefined) {
      return;
    } else {
      this.qtyDetails.qty = qty;


      this.bill.billDetails[this.selectsIndex].qty = qty;
      this.bill.billDetails[this.selectsIndex].supTotal =
        this.bill.billDetails[this.selectsIndex].itemSellPrice *
        this.bill.billDetails[this.selectsIndex].qty;
      //this.sumDetails();
      this.sum();
    }

  }

  playAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/Alarm-5c93c448-4c87-3803-8b1f-38c3eb930635.mp3";
    audio.load();
    audio.play();
  }

  printBill() {
    this.isPrinting = true;
    this.printablebill = new Bill();
    this.printablebill = this.bill;
    this.bill.checkWiteInvoies = false;
    this.getUserAndBranchAndCompanyInfo(this.printablebill);
    this.billservice.PrintBill(this.printablebill).subscribe(data => {

      let msg = this.translate.get("Messages.PRINTSUCCESS").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
    });

    //setTimeout(() => {
    //  this.clickResizePaper();
    //  this.isPrinting = false;
    //}, 500);
  }

  clickResizePaper() {
    // Open used in new window
    // let printContents, popupWin;
    // printContents = document.getElementById('printbill').innerHTML;
    // // printContents = (document.querySelector(printID) as HTMLElement).innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();


    let printContents, popupWin;
    printContents = document.getElementById('printbill').innerHTML;

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
						.printInvSum {margin: 5px 0px;}
						.printInvSum label {width: 100%; margin-bottom: 5px;}
						.printInvSum label strong {margin-left: 5px;font-size: 9px;}
						.printInvSum label span {font-size: 9px;}
						.printInvSum h3 {font-size: 11px;text-align: center;border: 1px solid #000;padding: 4px 0px;background-color: #f3f3f3;margin-top: 5px;margin-bottom: 0;}
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

  public _billDtail: BillDetail = new BillDetail();
  public _detaiItemRemove: BillDetail[] = [];
  index_;
  deleteItem(index, template: TemplateRef<any>, billDetail: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this._billDtail = billDetail;
    this._billDtail.isDelete = true;
    this.index_ = index;
  }

  deleteItemConfirm() {
    this.modalRef.hide();
    this.deleteRow(this._billDtail, this.index_);
  }

  deleteRow(billdetail: BillDetail, index) {


    billdetail.isPrint = false;
    billdetail.isNew = false;
    billdetail.isDelete = true;

    this._FinalyDetails = this.bill.billDetails;
    this.chkRemove = 1;
    this.bill.billDetails[index] = billdetail;
    $("#billdetail" + index).removeAttr("style").hide();
    var _detal = this.bill.billDetails.find(f => f.isDelete == true);

    // push in _detaiItemRemove billDetail equl is delete true
    this._detaiItemRemove.push(_detal);
    this.sum();

    // befor sum blii details equl is delete false
    this.bill.billDetails.forEach(data => {
      this._detaiItemRemove.push(data);
    })

    // _detaiItemRemove equl billDtails is delete true and false
    this.bill.billDetails = this._detaiItemRemove;
    this.bill.checkWiteInvoies = true;
    this.saveBill(true);
    this.sum();

  }

  printerConfirm() {
    this.modalRef.hide();
    this.getTotatBill();
  }

  cheackPrinter(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
  }


}



