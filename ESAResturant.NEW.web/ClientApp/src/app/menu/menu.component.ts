import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../admin/item/items.service';
import { ItemCategoryService } from '../admin/item/item-category/item-category.service';
import { TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../admin/item/Models/Item';
import { ItemCategory } from '../admin/item/Models/ItemCategory';
import { ItemPrice } from '../admin/item/Models/itemPrice';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { peopleService } from '../admin/People/people.service';
import { ToastWrapperService } from '../admin/Shared/toast-wrapper.service';
import { ApplicationService } from '../admin/setting/Application/application.service';
import { TaxesService } from '../admin/setting/Taxes/Taxes.service';
import { SettingesService } from '../admin/setting/setting.service';
import { setiingCurrency } from '../admin/setting/Currency/setiingCurrency.service';
import { Currencies } from '../admin/setting/Models/Currencies';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../admin/Shared/settings.service';
import { BoxMoniesService } from '../admin/BoxMony/boxMonies.service';
import { boxMonyCategoryService } from '../admin/BoxMony/boxMonyCategory.service';
import { Title } from '@angular/platform-browser';
import { MatStepper } from '@angular/material';
import { BillInvoiceService } from '../admin/bill-invoice/bill-invoice.service';
import { BillDetail } from '../admin/bill-invoice/Models/BillDetail';
import { Bill } from '../admin/bill-invoice/Models/Bill';
import { PaymentType } from '../admin/bill-invoice/Models/PaymentType ';
import { BillPlace } from '../admin/bill-invoice/Models/BillPlace';
import { AuthService } from '../Shared/Services/auth.service';
import { User } from '../users/Models/User';
import { BillCurrencies } from '../admin/bill-invoice/Models/BillCurrencies';
import { TranslateService } from '@ngx-translate/core';
import { BillTaxes } from '../admin/bill-invoice/Models/BillTaxes';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { PagginatedTableVM } from '../Shared/classes/pagginated.table.viewmodel';
import { Location } from '@angular/common';
import { number } from 'prop-types';
import { FullScreenService } from '../Shared/fullscreen.service';
import { TablesService } from '../admin/tables/tables.service';
import { TablesPlaces } from '../admin/tables/Models/TablesPlaces';


declare var $: any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
    SettingsService, ItemsService, ItemCategoryService, BillInvoiceService, BsModalService, peopleService, DatePipe, TablesService,
    ApplicationService, TaxesService, SettingesService, setiingCurrency, TranslateService, BoxMoniesService, boxMonyCategoryService, AuthService, setiingCurrency
  ]
})
export class MenuComponent implements OnInit {
  isLinear = false;

  countDisplay: number = 1;
  itemCategoryList: ItemCategory[] = [];

  itemList: Item[];
  billTaxes: BillTaxes;
  TaxesList: BillTaxes[] = [];
  itemPricesList: ItemPrice[];
  SelectedItemPrice: ItemPrice = new ItemPrice();
  SerchList: any = [];
  ItemObject: any = [];
  billdetail: BillDetail;
  itemPriceDefullt: number = 0;
  item: Item;
  bill: Bill; ///this object represent current selected bill
  newbilldetail: BillDetail
  billPlaceList: BillPlace[];
  paymentTypeList: PaymentType[];
  IsVatCancelled: boolean;
  isNote: boolean = false
  billTableCount:number=0;
  totalAfterVatTax: number = 0;
  totalNotePrice: number = 0;
  resultServiceFees: number = 0;
  totalBillAfterVatTax: number = 0;
  resultTotal: number = 0;
  cartbill: Bill;
  numberOrder: number = 0;
  currentDate: any;
  currenciesList: Currencies[];
  isLoginError: boolean = true;
  user: User;
  UserID: any;
  loginModel: any;
  modalRef: BsModalRef;
  filterDate: any
  pageTitle: string = "";
  private _hubConnection: HubConnection | undefined;
  completedPagginatedTableVM: PagginatedTableVM;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  newDetails: BillDetail[] = [];
  filterbillList: Bill[] = [];
  isFull: boolean = true;
  tableList: TablesPlaces[] = [];
  isFindTable: boolean = false;
  tableNumber: string = null;
  constructor(private datepip: DatePipe, private modalService: BsModalService, private itemService: ItemsService,
    private serItemCategory: ItemCategoryService, private billservice: BillInvoiceService, private route: ActivatedRoute,
    private peiopleService: peopleService, public TosterService: ToastWrapperService, private router: Router,
    private appServe: ApplicationService, private taxServ: TaxesService, private settServe: SettingesService,
    private currService: setiingCurrency, private settingsService: SettingsService, private fullScrean: FullScreenService,
    private boxMonyServer: BoxMoniesService, private boxCategorServer: boxMonyCategoryService, private tableService: TablesService,
    private titleService: Title, private _formBuilder: FormBuilder, public authService: AuthService,
    private toasterService: ToastWrapperService, public translate: TranslateService, private _location: Location) {
    this.bill = new Bill();
    this.cartbill = new Bill();
    this.newbilldetail = new BillDetail();
    this.completedPagginatedTableVM = new PagginatedTableVM();
    this.fromDate = this.settingsService.getCurrentDate();
    this.toDate = this.settingsService.getCurrentDate();
    this.getUser();

  }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  currentLang: string;

  ngOnInit() {
    this.billCurrency = new BillCurrencies();
    this.currenciesList = [];
    this.getAllBillPlace();

    this.getAllBillPaymentType();
    this.getAllItemCategory();
    this.getCurrencies();
    this.GetAllItemByPaginated();

    this.bill.currentDate = this.settingsService.getCurrentDate();
    this.currentDate = this.datepip.transform(this.bill.currentDate, "yyyy-MM-dd");
    if (this.bill.currentDate == null || this.bill.currentDate == undefined) {
      this.TosterService.ErrorToaster.next("برجاء فتح اليوم !!");
    }
    this.loginModel = {
      userName: '',
      password: ''
    };

    this.languagechanged('ar');
    // this.currentLang = this.authService.CurrentLang;
    // this.translate.use(this.currentLang);


    var kitchen = './kitchen';
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(kitchen)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => {
      console.error(err.toString())
    });

    this.AddBill();
    this.getBillsPagginated();
    this.getTables();
  }

  getTables() {
    this.tableService.getTablesPlaces().subscribe(data => {
      this.tableList = data;
    })
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

  hideModel() {
    $('.modal').modal('hide');
    (document.getElementById('modelDetails') as HTMLElement).style.display = 'none';
  }

  public AddBill = () => {
    this._hubConnection.on('AddBill', (data: Bill) => {

      if (data.tableNo != null) {
        var _FindBill = this.filterbillList.findIndex(f => f.id == data.id);
        if (_FindBill != -1) {

          if (this.filterbillList[_FindBill].id == data.id) {

            this.filterbillList[_FindBill] = data;

            if (this.filterbillList[_FindBill].checkWiteInvoies == false) {
              this.filterbillList.splice(_FindBill);
            }

          }
        }
        else {
          this.filterbillList.push(data);
        }

      }
    })
  }


  refresh(): void {
    window.location.reload();
  }



  getUser() {
    var _user = JSON.parse(localStorage.getItem('User'));
    this.bill.user = _user;
    this.bill.branch = _user.branch;
    this.bill.branchId = _user.branch.id;
    this.bill.userId = _user.userId;
    this.authService.getToken();
  }

  clearbill() {

    this.bill = new Bill();
    this.cartbill = new Bill();
    this.currency = new Currencies();
    this.newbilldetail = new BillDetail();
    this.tableNumber = null;
    this.newDetails = [];
    this.getValueCurrencyById();
    this.bill.paymentId = this.paymentTypeList.find(f => f.nameAR == 'كاش' || f.nameAR == 'نقدى').id;
    this.bill.billPlaceId = this.billPlaceList.find(f => f.nameAR == 'محلى').id;
    this.getUser();

  }



  openModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });

  }

  changeTitle(language: string) {
    if (language == 'ar') {
      this.pageTitle = "قائمة الأسعار";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "menu";
      this.titleService.setTitle(this.pageTitle);
    }
  }

  languagechanged(type: string) {
    this.currentLang = type;
    this.authService.CurrentLang = this.currentLang;
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang)
    if (this.currentLang == 'ar') {
      document.getElementById('theme').setAttribute('href', '');
      document.querySelector('body').setAttribute('dir', 'rtl');
    }
    else if (this.currentLang == '' || this.currentLang == 'en') {
      document.getElementById('theme').setAttribute('href', 'assets/css/style-en.css');
      document.querySelector('body').setAttribute('dir', 'ltr');
    }
    this.itemCategoryList = [];
    this.bill.currentLang = type;
    this.getAllItemCategory();
  }

  getBillsPagginated() {
    this.bill.currentDate = this.settingsService.getCurrentDate();
    var All = 2000
    this.completedPagginatedTableVM.itemsPerPage = All;

    var _From = this.datepip.transform(new Date(this.fromDate), "yyyy-MM-dd");
    var _To = this.datepip.transform(new Date(this.toDate), "yyyy-MM-dd h:mm a");

    this.billservice.getBillReportPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, _From, _To, null, 'billInvoice', 'date', null).subscribe(
      bills => {
        this.filterbillList = bills.items;
        this.filterbillList = this.filterbillList.filter(f => f.checkWiteInvoies == true && f.tableNo != null);
        this.billTableCount = this.filterbillList.length;
      },
      error => {
      });
  }


  getCurrencies() {
    this.currService.getAllCurrency().subscribe(data => {
      this.currenciesList = data;
      this.getValueCurrencyById();
    });
  }
  currencyName: string = '';

  getValueCurrencyById() {
    if (this.currenciesList.length != 0) {
      var chkCurrency = this.currenciesList.find(f => f.isDefault == true);
      if (chkCurrency != null) {
        this.bill.currencyId = chkCurrency.id;
        this.currencyName = chkCurrency.nameAr;
        this.getCurrencyInChange(chkCurrency);
      }
      else {
        var chkCurrency = this.currenciesList[0];
        this.bill.currencyId = chkCurrency.id;
        this.currencyName = chkCurrency.nameAr;
        this.getCurrencyInChange(chkCurrency);
        //this.bill.currencyId = 0;
      }
      this.sum();
    }

  }


  currency: Currencies = new Currencies();
  getCurrencyInChange(curr: Currencies) {
    this.currency = curr;
    this.bill.currencyId = curr.id;
    this.currencyName = curr.nameAr;
    this.bill.currencies = curr;
    this.sum();
  }

  getAllItemCategory() {
    this.serItemCategory.getAllItemCategories().subscribe(data => {
      if (data) {
        var chk = data.filter(f => f.sellCategory == true);
        this.itemCategoryList = chk;
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


  getTable(table) {
    this.bill.reference = table;
  }

  onSelectItem(selecteditem: Item) {
    this.item = selecteditem;
    this.itemPricesList = selecteditem.itemPrices;
    var _itemPrice = null;

    if (selecteditem.itemPrices.length == 1) {
      this.SelectedItemPrice = selecteditem.itemPrices[0];
    }

    if (selecteditem.itemPrices.length > 1) {
      _itemPrice = this.itemPricesList.find(f => f.isDefullt == true);
      if (_itemPrice == undefined) {
        selecteditem.itemPriceDefault = this.itemPricesList[0].price;
      }
      else {
        selecteditem.itemPriceDefault = _itemPrice.itemPriceDefault;
      }
    }


    this.SelectedItemPrice.quantityOnCart = 1;
    if (!this.SelectedItemPrice) {
      this.SelectedItemPrice = new ItemPrice();
    }
  }

  SelectItemPrice(selecteditemprice: ItemPrice, newqty: number) {
    if (selecteditemprice.id == 0) {
      let msg = this.translate.get("Messages.ADDONEPRICE").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      return;
    }

    this.SelectedItemPrice = selecteditemprice;

    if (newqty == -1) {
      this.SelectedItemPrice.quantityOnCart -= 1;
    }
    else {
      this.SelectedItemPrice.quantityOnCart += 1;
    }

  }
  setItemPricesSelected(selecteditemprice: ItemPrice) {
    this.SelectedItemPrice = new ItemPrice();
    this.SelectedItemPrice = selecteditemprice;
    //this.SelectedItemPrice.quantityOnCart = this.SelectedItemPrice.quantityOnCart;
    if (this.SelectedItemPrice.quantityOnCart == undefined) {
      this.SelectedItemPrice.quantityOnCart = 1;
    }

    this.newbilldetail = new BillDetail();
    this.newbilldetail.isPrint = true;
    this.newbilldetail.itemPrice.id = selecteditemprice.id;
    this.newbilldetail.itemPriceId = selecteditemprice.id;
    this.newbilldetail.itemId = this.item.id;
    this.newbilldetail.vatTax = this.item.vat;
    this.newbilldetail.item = this.item;
    this.newbilldetail.unit = this.item.unit;
    this.newbilldetail.unitId = this.item.unitId;
    this.newbilldetail.qty = this.SelectedItemPrice.quantityOnCart;

    this.newbilldetail.itemSellPrice = selecteditemprice.price;
    this.newbilldetail.itemPrice = selecteditemprice;
    this.newbilldetail.supTotal = this.newbilldetail.itemSellPrice * this.newbilldetail.qty;

  }

  pushItemInDetails(selecteditem: Item) {


    this.item = selecteditem;
    var find = this.bill.billDetails.find(f => f.itemPrice.id == this.SelectedItemPrice.id);

    if (find != null && find.isPrint) {
      find.qty += this.SelectedItemPrice.quantityOnCart;
      find.supTotal = find.itemSellPrice * find.qty;
      var total = find.vatTax * find.itemSellPrice / 100 * find.qty;
      find.totalAfterVatTax = find.supTotal + total;
    }
    else if (selecteditem.itemPrices.length == 1 && find == undefined) {
      this.setItemPricesSelected(selecteditem.itemPrices[0]);

      this.bill.billDetails.push(this.newbilldetail);
      this.newDetails.push(this.newbilldetail);
      this.sumDetails();
    }

    else {
      this.setItemPricesSelected(this.SelectedItemPrice);
      this.bill.billDetails.push(this.newbilldetail);
      this.newDetails.push(this.newbilldetail);

    }
    this.sum();
  }

  addtocart(stepper: MatStepper) {

    if (this.SelectedItemPrice.id == 0) {
      let msg = this.translate.get("Messages.ADDONEPRICE").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }

    this.cartbill = Object.assign({}, this.bill);
    stepper.previous();
    this.pushItemInDetails(this.item);
    this.sumDetails();
    this.sum();
    //this.clear();
    //this.GetItemByidPaginatedById();
  }
  clear() {
    this.newbilldetail = new BillDetail();
    this.item = new Item();
    this.SelectedItemPrice = new ItemPrice();
    this.countDisplay = 1;

  }




  menuHome(stepper: MatStepper) {
    stepper.previous();
    stepper.previous();

  }

  getBillById(bill) {
    this.billservice.GetBillById(bill.id).subscribe(data => {
      this.bill = data.items[0];
      this.bill.billDetails = this.bill.billDetails.filter(f => f.isDelete == false);
      if (this.newDetails.length > 0) {
        this.newDetails.forEach(data => {
          if (data) {
            this.bill.billDetails.push(data);
          }
        })
      }

      this.isFindTable = true;
      this.tableNumber = this.bill.tableNo;
      this.bill.currentDate = this.bill.currentDate;
      this.bill.date = this.bill.date;

      var chk = this.currenciesList.find(f => f.isDefault == true);
      if (chk == undefined) {
        var chk = this.currenciesList[0];
      }

      this.cartbill = Object.assign({}, this.bill);


      this.sum();
    });
  }



  //getAllItem(catId: number) {
  //  this.itemService.All_ItemForCategory(catId).subscribe(data => {
  //    this.itemList = data;

  //    // foreach in itemList
  //    this.itemList.forEach(item => {

  //      this.itemPricesList = item.itemPrices;
  //      item.itemPriceDefault = this.itemPricesList.find(f => f.isDefullt == true).price;

  //      if (this.itemPricesList.length == 1) {
  //        item.itemPriceDefault = this.itemPricesList[0].price;
  //      }

  //    });

  //  })

  //}



  GetItemByidPaginatedById(catId?) {

    this.itemList = this.itemListPage.filter(f => f.itemCategoryId == catId)
    var _itemPrice = null;
    this.itemList.forEach(item => {
      this.itemPricesList = item.itemPrices;
      if (this.itemPricesList.length == 1) {
        item.itemPriceDefault = this.itemPricesList[0].price;
      }
      if (this.itemPricesList.length > 1) {
        _itemPrice = this.itemPricesList.find(f => f.isDefullt == true);
        if (_itemPrice == undefined) {
          item.itemPriceDefault = this.itemPricesList[0].price;
        }
        else {
          item.itemPriceDefault = _itemPrice.price;
        }
      }

    });

  }

  public itemListPage: any = [];

  GetAllItemByPaginated() {

    this.itemService.GetItemByidPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, '').subscribe(
      pageddata => {
        this.itemListPage = pageddata.items;

        this.GetItemByidPaginatedById();

        //var _itemPrice = null;
        //this.itemListPage.forEach(item => {
        //  this.itemPricesList = item.itemPrices;

        //  if (this.itemPricesList.length == 1) {
        //    item.itemPriceDefault = this.itemPricesList[0].price;
        //  }
        //  if (this.itemPricesList.length > 1) {
        //    _itemPrice = this.itemPricesList.find(f => f.isDefullt == true);
        //    if (_itemPrice == undefined) {
        //      item.itemPriceDefault = this.itemPricesList[0].price;
        //    }
        //    else {
        //      item.itemPriceDefault = _itemPrice.price;
        //    }
        //  }
        //});
      },
      error => { });
  }



  getAllBillPlace() {
    this.billservice.getAllBillPlaces().subscribe(data => {
      this.billPlaceList = data
      if (data) {
        this.bill.billPlaceId = this.billPlaceList.find(f => f.nameAR == 'محلى').id;
      }
    });
  }


  getAllBillPaymentType() {
    this.billservice.getAllBillPaymentType().subscribe(data => {
      this.paymentTypeList = data;
      if (data) {
        this.bill.paymentId = this.paymentTypeList.find(f => f.nameAR == 'كاش' || f.nameAR == 'نقدى').id;

      }

    });
  }


  openLoginModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-dialog modal-dialog-centered modal-lg' })
    );
  }

  showModel() {

  }

  openModelLogin() {
    this.bill.tableNo = this.tableNumber;
    if (this.tableNumber == '' || this.tableNumber == null || this.tableNumber == undefined) {
      let msg = this.translate.get("Messages.TABLENULL").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }


    if (this.bill.billDetails.length == 0) {
      let msg = this.translate.get("Messages.ITEMSREQUIRED").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }

    if (this.tableNumber == '' || this.tableNumber == null || this.tableNumber == undefined) {
      let msg = this.translate.get("Messages.TABLENULL").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }


    $('#exampleModalCenter').modal('hide');

    $('#exampleModalCenterLogin').modal('show');
  }

  login() {

  }









  ViewCart(stepper: MatStepper) {

    this.sum();
    this.cartbill = Object.assign({}, this.bill);
    stepper.selectedIndex = 2;
  }


  sum() {
    this.resultTotal = 0;
    var total = 0;
    var quntity = 0;
    var totalAfterVat = 0;
    var vat = 0;
    var notePrice = 0;

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
    this.bill.totalAfterVatTax = totalAfterVat;
    this.totalBillAfterVatTax = totalAfterVat;
    this.bill.netTotal = this.bill.totalAfterVatTax;
  }

  totalBill: number = 0;





  sumDetails() {
    let total = this.newbilldetail.itemSellPrice + (this.newbilldetail.vatTax * this.newbilldetail.itemSellPrice / 100);
    this.newbilldetail.totalAfterVatTax = total * this.newbilldetail.qty;
  }

  removeRow(index: number) {
    this.bill.billDetails.splice(index, 1);
    this.sum();
  }

  billCurrency: BillCurrencies;


  getUserAndBranchAndCompanyInfo(bill: Bill) {

    var _user = JSON.parse(localStorage.getItem('User'));
    bill.user = _user;
    bill.userId = _user.userId;
    bill.branch = _user.branch;
    bill.branchId = _user.branch.id;
    bill.companyInfo = _user.branch.companyInfo;
  }

  checkAndSave(checkInvoic: boolean, type: string) {

    var chkTable = new Bill();
    chkTable = this.filterbillList.find(f => f.tableNo == this.tableNumber);
    if (type == 'add' && chkTable) {
      let msg = this.translate.get("Messages.TABLENOTBUSY").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }


    this.authService.login(this.loginModel).subscribe(
      result => {
        if (result != null || result != undefined) {

          this.saveBill(checkInvoic, type);

        }
        else {
          this.toasterService.ErrorToaster.next("خطاء فى تسجيل الدخول ..");
          //(document.querySelector('.winLoading') as HTMLElement).style.display = 'none';
          return;
        }
      },
      error => {
        this.isLoginError = true;
        this.toasterService.ErrorToaster.next("خطاء فى تسجيل الدخول ..");
        //(document.querySelector('.winLoading') as HTMLElement).style.display = 'none';
        return;
      }
    );

  }




  saveBill(check: boolean, type) {
    this.getUserAndBranchAndCompanyInfo(this.bill);


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


    this.bill.currentDate = this.settingsService.getCurrentDate();
    this.currentDate = this.datepip.transform(this.bill.currentDate, "yyyy-MM-dd");
    this.bill.currentDate = this.currentDate;




    this.TosterService.requestNumberBillIdChanged.next();
    this.bill.checkWiteInvoies = check;
    this.bill.billTypeId = 1;
    this.bill.discountId = 1;
    this.bill.billPlaceId = 2;
    this.bill.billPlace = this.billPlaceList.find(f => f.nameAR == 'محلى');
    this.bill.paymentId = 1;
    if (this.bill.tableNo == undefined) {
      this.bill.tableNo = null;
    }

    this.bill.remaining = this.bill.netTotal - this.bill.paied;
    this.bill.paied = Number((this.bill.paied).toFixed(2));
    this.bill.remaining = Number((this.bill.remaining).toFixed(2));
    this.bill.netTotal = Number((this.bill.netTotal).toFixed(2));
    this.bill.date = new Date();
    this.billservice.InsertOrUpdateBill(this.bill).subscribe(
      result => {

        this.billservice.PrintBill(result).subscribe(data => {

        });

        let msg = this.translate.get("Messages.SENDBILL").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
        });

        this.isLoginError = false;
        this.clearbill();
      },
      error => {
        this.TosterService.ErrorToaster.next("   لم يتم الحفظ  ");
      }
    );
  }



}
