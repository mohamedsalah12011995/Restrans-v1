import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemCategoryService } from '../item/item-category/item-category.service';
import { ItemsService } from '../item/items.service';
import { BillInvoiceService } from '../bill-invoice/bill-invoice.service';
import { Item } from '../item/Models/Item';
import { ItemCategory } from '../item/Models/ItemCategory';
import { Bill } from '../bill-invoice/Models/Bill';
import { ItemPrice } from '../item/Models/itemPrice';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BillDetail } from '../bill-invoice/Models/BillDetail';
import { BillPlace } from '../bill-invoice/Models/BillPlace';
import { PaymentType } from '../bill-invoice/Models/PaymentType ';
import { peopleService } from '../People/people.service';
import { People } from '../People/Models/people';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';
import { HeaderComponent } from '../Shared/Components/header/header.component';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { HomeService } from '../home.service';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { boxMony } from '../BoxMony/Models/boxMony';
import { DiscountType } from '../setting/Models/DiscountType';
import { SettingesService } from '../setting/setting.service';
import { Currencies } from '../setting/Models/Currencies';
import { setiingCurrency } from '../setting/Currency/setiingCurrency.service';
import { BillCurrencies } from '../bill-invoice/Models/BillCurrencies';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bill-Purchases',
  templateUrl: './bill-Purchases.component.html',
  styleUrls: ['./bill-Purchases.component.css'],
  providers: [ItemsService, ItemCategoryService, BillInvoiceService, BsModalService, peopleService, DatePipe, HomeService, SettingesService, setiingCurrency]
})
///** BillPurchases component*/
export class billPurchasesComponent {
  ///** BillPurchases ctor */
  priceitemDefult: number;
  itemList: Item[];
  itemCategoryList: ItemCategory[] = [];
  billList: Bill[];
  itemPricesList: ItemPrice[];
  SerchList: any = [];
  ItemObject: any = [];

  listDiscountType: DiscountType[] = [];

  currenciesList: Currencies[] = [];

  itemCategory: ItemCategory;
  item: Item;
  selectedFiles: FileList;
  selectedputh: any;
  modalRef: BsModalRef;

  bill: Bill; ///this object represent current selected bill
  billdetail: BillDetail;
  newbilldetail: BillDetail

  billPlaceList: BillPlace[];
  paymentTypeList: PaymentType[];
  peopleList: People[];
  selectedPeople: People;
  boxMony: boxMony;

  currentDate: any;
  date: any;
  billId: number = 0;
  IsVatCancelled: boolean;
  itemPriceDefullt: number = 0;
  itemName: string = '';
  SelectedItem: Item;
  pageTitle: string = "فاتورة شراء";


  myControl = new FormControl();
  filteredOptions: Observable<People[]>;
  checkPeople: boolean = false;


  itembycode = new FormControl();
  itembycodefilteredOptions: Observable<Item[]>;

  itembyname = new FormControl();
  itembynamefilteredOptions: Observable<Item[]>;

  discountType: DiscountType;

  billCurrency: BillCurrencies;


  itemTabledisplayedColumns = ['No', 'Code', 'ItemName', 'Count', 'Unit', 'PurchasePrice', 'SellingPrice', 'Discount', 'Total', 'Delete'];
  // itemTable: BillDetail[]= [];

  constructor(private datepip: DatePipe, private modalService: BsModalService, private itemService: ItemsService, private serItemCategory: ItemCategoryService,
    private billservice: BillInvoiceService, private peiopleService: peopleService, public TosterService: ToastWrapperService,
    public translate: TranslateService, private currService: setiingCurrency, private route: ActivatedRoute, private router: Router, private homeServe: HomeService, private titleService: Title, private settServe: SettingesService) {

    this.bill = new Bill();
    this.billdetail = new BillDetail();
    this.selectedPeople = new People();
    this.boxMony = new boxMony();
    this.titleService.setTitle(this.pageTitle);
    this.discountType = new DiscountType();
  }


  //get currencies
  getCurrencies() {
    this.currService.getAllCurrency().subscribe(data => {
      this.currenciesList = data;
      // this.bill.currencyId = this.currenciesList.find(f => f.isDefault == true).id;
      this.getValueCurrencyById();

    });
  }

  currencyName: string = '';
  getValueCurrencyById() {
    var chkCurrency = this.currenciesList.find(f => f.isDefault == true);
    if (chkCurrency != null) {
      this.bill.currencyId = chkCurrency.id;
      this.currencyName = chkCurrency.nameAr;
      this.getCurrencyInChange(chkCurrency);
    }
    else {
      this.bill.currencyId = 0;
    }
    this.sum();
  }

  ngOnInit() {
    this.billCurrency = new BillCurrencies();
    this.getAllGetPeoples();
    this.getAllBillPaymentType();
    this.getCurrencies();
    this.homeServe.displayNamePages();
    this.getAllDiscountType();
    this.getAllItem();

    this.myControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(data => {
      if (data == null || data == undefined || data.trim() == '') {
      }
      else {

        this.filteredOptions = this.peiopleService.getAllPeopleByPhoneOrName(data)
        this.checkPeople = true;
      }
    });


    this.itembycode.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(data => {
      if (data == null || data == undefined || data.trim() == '') {
      }
      else {

        this.itembycodefilteredOptions = this.itemService.getPurchacedItemsBycode(data)
        this.checkPeople = true;
      }
    });

    this.itembyname.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(data => {
      if (data == null || data == undefined || data.trim() == '') {
      }
      else {

        this.itembynamefilteredOptions = this.itemService.getPurchacedItemsByName(data)
        this.checkPeople = true;
      }
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


  // get DiscountType
  getAllDiscountType() {
    this.settServe.getAllDiscountType().subscribe(data => {
      this.listDiscountType = data;
      this.getValueFromDiscountType();
    });
  }



  getItemById(id: number) {
    this.itemService.getItemById(id).subscribe(data => {
      console.log(id);
      this.item = data;
      this.billdetail = new BillDetail();
      this.billdetail.item = this.item;
      this.billdetail.itemId = this.item.id;
      this.billdetail.vatTax = this.item.vat;
      this.billdetail.qty = 1;
      this.bill.billDetails.push(this.billdetail);
      console.log(this.bill.billDetails);
    })
  }



  pushItemInDetails(selecteditem: Item) {
    debugger;
    this.item = selecteditem;
    var find;
    //find = this.bill.billDetails.find(f => f.itemPrice.id == data.id && f.isNew == true);
    find = this.bill.billDetails.find(f => f.itemId == this.item.id);

    if (find != null) {
      find.qty += 1;
      find.supTotal = find.itemBuyPrice * find.qty;
      var total = find.vatTax * find.itemSellPrice / 100 * find.qty;
      find.totalAfterVatTax = find.supTotal + total;
    }
    else {
      this.billdetail = new BillDetail();
      //this.billdetail.isNew = true;
      //this.itemPricesList = selecteditem.itemPrices;

      this.billdetail.itemBuyPrice = this.item.buyPrice;
      this.billdetail.itemId = this.item.id;
      this.billdetail.item = this.item;
      this.billdetail.unit = this.item.unit;
      this.billdetail.qty = selecteditem.currentQuantity;
      this.billdetail.unitId = selecteditem.unitId;
      /*this.billdetail.itemSellPrice = this.item.buyPrice*/;


      //this.newbilldetail.vatTax = selecteditem.vat;
      this.billdetail.supTotal = this.billdetail.itemBuyPrice * this.billdetail.qty;

      let total = this.billdetail.itemBuyPrice + (this.billdetail.vatTax * this.billdetail.itemBuyPrice / 100);
      this.billdetail.totalAfterVatTax = total * this.billdetail.qty;

      this.bill.billDetails.push(this.billdetail);
      //console.log(this.newbilldetail.itemPrice.itemSize.sizeNameEn);
      //console.log(selecteditem);
    }
    this.checkPaymentKachOrAgel(this.bill.paymentId);
    this.sum();
  }

  //AddItemToBill(item: Item) {


  //  var billDetail = new BillDetail();
  //  billDetail.item = item;

  //  billDetail.itemId = item.id;
  //  billDetail.itemBuyPrice = item.buyPrice;
  //  billDetail.itemSellPrice = item.lowestSellPrice;
  //  billDetail.unitId = item.unitId;
  //  billDetail.qty = 1;
  //  billDetail.vatTax = item.vat;



  //  billDetail.supTotal = billDetail.qty * billDetail.itemBuyPrice;






  //  billDetail.vatTaxValue = 0;
  //  billDetail.discountValue = 0;
  //  billDetail.netTotal = 0;





  //  if (billDetail.discount > 0) {

  //    billDetail.discountValue = this.calculateDiscountTotalPrice(billDetail);
  //  } else {
  //    billDetail.discount = 0;
  //  }

  //  if (billDetail.vatTax > 0) {
  //    billDetail.vatTaxTotalPrice = (billDetail.subTotal - billDetail.discountTotalPrice) * (billDetail.vatTax / 100);
  //  }
  //  else {
  //    billDetail.vatTax = 0;
  //  }


  //  billDetail.total = billDetail.subTotal + billDetail.vatTaxTotalPrice - billDetail.discountTotalPrice;




  //  if (this.bill.billDetails.find(x => x.itemCode == billDetail.itemCode, 0) == undefined) {
  //    this.bill.billDetails.push(billDetail);

  //    this.selectedrowindex = this.bill.billDetails.length - 1;
  //    this.selectedbilldetail = billDetail;
  //  }
  //  else {
  //    this.selectedbilldetail = this.bill.billDetails.find(x => x.itemCode == billDetail.itemCode, 0);

  //    this.selectedrowindex = this.bill.billDetails.findIndex(d => d.itemCode == billDetail.itemCode, 0);

  //  }
  //  //    this.bill.billDetails.push(billDetail);
  //  this.sum();


  //}

  getDiscount(discount) {
    this.discountType = discount;
    this.bill.discountType = discount;
    this.sum();
  }



  sum() {
    // this is sum by details
    debugger;
    this.billdetail.supTotal = this.billdetail.itemBuyPrice * this.billdetail.qty - this.billdetail.discount;

    let result = this.billdetail.itemBuyPrice + (this.billdetail.vatTax * this.billdetail.itemBuyPrice / 100);
    this.billdetail.netTotal = result * this.billdetail.qty - this.billdetail.discount;

    //this is sum by bill
    var total = 0;
    var quntity = 0;

    for (var i = 0; i < this.bill.billDetails.length; i++) {
      quntity += this.bill.billDetails[i].qty;
      total += this.bill.billDetails[i].supTotal;
    }

    this.bill.totalQty = quntity;
    this.bill.supTotal = total
    this.bill.netTotal = this.bill.supTotal + this.bill.serviceFees - this.bill.currentDiscount;
    //this.checkPaymentKachOrAgel(this.bill.paymentId);
  }

  checkPaymentKachOrAgel(paymentId) {
    console.log(paymentId);

    if (paymentId == this.paymentTypeList.find(f => f.nameAR === 'كاش').id ||
      paymentId == this.paymentTypeList.find(f => f.nameAR === 'فيزا').id) {
      this.bill.paied = 0;
      this.bill.remaining = 0;
    }
    else if (paymentId == this.paymentTypeList.find(f => f.nameAR === 'آجل').id) {
      this.bill.paied = 0;
      this.bill.remaining = this.bill.netTotal
      this.bill.remaining = this.bill.netTotal - this.bill.paied;
    }
    //this.checkPaymentKachOrAgel(this.bill.paymentId);
  }

  getAllGetPeoples() {
    this.peiopleService.getAllPeoples().subscribe(data => {
      this.peopleList = data;
      this.peopleList.filter(f => f.peopleType.nameAR == 'مورد');
      console.log(this.peopleList);
    });
  }


  getAllItem() {
    this.itemService.All_Item().subscribe(data => {
      this.itemList = data.filter(X => X.isForSell == false);
      console.log(this.itemList);
      this.itemList = data.filter(X => X.isForSell == false);
      //data.forEach(item => {
      //  this.itemService.pushItemPrice.next(item.itemPrices);
      //})
    });
  }

  totalAvareg() {

  }
  public newBillDetail = new BillDetail();
  onSelectNewItemByCode(event: Item): void {

    this.itembycodefilteredOptions.subscribe(items => {

      this.SelectedItem = items.find(x => x.nameAR == this.itembycode.value, 0);

      if (this.SelectedItem) {
        this.itemName = this.SelectedItem.nameAR;

        this.pushItemInDetails(this.SelectedItem);
      }
      else {
        let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
          this.TosterService.ErrorToaster.next(msg);
        });
      }

    });

    return;
  }

  onSelectNewItemByName(event: any): void {

    console.log(event.item);
    this.SelectedItem = event.item;

    if (this.SelectedItem) {
      this.itemName = this.SelectedItem.nameAR;
      this.pushItemInDetails(this.SelectedItem);
    }
    else {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
    }

    //this.itembynamefilteredOptions.subscribe(items => {

    //  this.SelectedItem = items.find(x => x.nameAR == this.itembyname.value, 0);

    //  if (this.SelectedItem) {
    //    this.itemName = this.SelectedItem.nameAR;

    //    this.pushItemInDetails(this.SelectedItem);
    //  }
    //  else {
    //    let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
    //      this.TosterService.ErrorToaster.next(msg);
    //    });
    //  }

    //});

    return;
  }


  //onSelectNewItem(event: TypeaheadMatch): void {

  //  debugger;
  //  this.SelectedItem = event.item;
  //  if (this.SelectedItem) {
  //    this.itemName = this.SelectedItem.nameAR;

  //    this.pushItemInDetails(this.SelectedItem);
  //    //this.TosterService.ErrorToaster.next("برجاء اختيار الصنف")
  //  } else {
  //    this.TosterService.ErrorToaster.next("برجاء اختيار الصنف");

  //  }

  //  return;
  //}
  currency: Currencies = new Currencies();
  getCurrencyInChange(curr: Currencies) {
    this.currency = curr;
    this.bill.currencyId = curr.id;
    this.currencyName = curr.nameAr;
    this.bill.currencies = curr;
    this.sum();
  }



  saveBill(checkInvoic: boolean) {

    this.bill.checkWiteInvoies = checkInvoic;

    this.bill.billTypeId = 2;
    this.bill.currentDate = this.currentDate;
    this.bill.date = this.date;
    this.bill.remaining = this.bill.netTotal - this.bill.paied;


    this.bill.billCurrencies = [];
    this.currenciesList.forEach(currency => {
      if (currency.id == this.bill.currencyId) {
        this.billCurrency.isSelected = true;
      }
      this.billCurrency.bankValue = currency.bankValue;
      this.billCurrency.currencyId = currency.id;
      this.billCurrency.total = this.bill.netTotal / currency.bankValue;;
      this.bill.billCurrencies.push(this.billCurrency);
      this.billCurrency = new BillCurrencies();
    });
    this.billservice.InsertOrUpdateBill(this.bill).subscribe(
      result => {
        let msg = this.translate.get("Messages.BILLSAVED").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
        });
        //this.getBillsByCheckWait();
        this.clearbill();
      },
      error => {
        let msg = this.translate.get("Messages.UNEXPEXTED").subscribe(msg => {
          this.TosterService.ErrorToaster.next(msg);
        });


      }
    );


  }
  clearbill() {
    this.bill = new Bill();
    this.billdetail = new BillDetail();
    this.myControl.setValue('');

  }
  getAllBillPaymentType() {
    this.billservice.getAllBillPaymentType().subscribe(data => {
      this.paymentTypeList = data;
      this.bill.paymentId = this.paymentTypeList.find(f => f.nameAR == 'كاش').id;
      //this.checkPaymentKachOrAgel();
    });
  }




  onpeopleChange(peopleid) {
    this.filteredOptions.subscribe(peopels => {
      this.selectedPeople = peopels.find(x => x.name == this.myControl.value, 0);
      this.bill.currentDiscount = this.selectedPeople.discount;
      this.boxMony.people = this.selectedPeople;
      this.boxMony.peopleId = this.selectedPeople.id

      this.bill.pepoleName = this.selectedPeople.name;
      this.bill.peopleID = this.selectedPeople.id;
      this.sum();
    });
  }

}













//import { Component, OnInit, TemplateRef, Input } from '@angular/core';
//import { DatePipe } from '@angular/common';
//import { Router, ActivatedRoute } from '@angular/router';
//import { ItemCategoryService } from '../item/item-category/item-category.service';
//import { ItemsService } from '../item/items.service';
//import { BillInvoiceService } from '../bill-invoice/bill-invoice.service';
//import { Item } from '../item/Models/Item';
//import { ItemCategory } from '../item/Models/ItemCategory';
//import { Bill} from '../bill-invoice/Models/Bill';
//import { ItemPrice } from '../item/Models/itemPrice';
//import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
//import { BillDetail } from '../bill-invoice/Models/BillDetail';
//import { BillPlace } from '../bill-invoice/Models/BillPlace';
//import { PaymentType } from '../bill-invoice/Models/PaymentType ';
//import { peopleService } from '../People/people.service';
//import { People } from '../People/Models/people';
//import { ToastWrapperService } from '../Shared/toast-wrapper.service';
//import { HeaderComponent } from '../Shared/Components/header/header.component';
//import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
//import { HomeService } from '../home.service';
//import { Title } from '@angular/platform-browser';
//import { Location } from '@angular/common';


//@Component({
//	selector: 'app-bill-Purchases',
//	templateUrl: './bill-Purchases.component.html',
//  styleUrls: ['./bill-Purchases.component.css'],
//  providers: [ItemsService, ItemCategoryService, BillInvoiceService, BsModalService, peopleService, DatePipe, HomeService]
//})
/////** BillPurchases component*/
//export class billPurchasesComponent {
/////** BillPurchases ctor */
//  priceitemDefult: number;
//  itemList: Item[];
//  itemCategoryList: ItemCategory[] = [];
//  billList: Bill[];
//  itemPricesList: ItemPrice[];
//  SerchList: any = [];
//  ItemObject: any = [];



//  itemCategory: ItemCategory;
//  item: Item;
//  selectedFiles: FileList;
//  selectedputh: any;
//  modalRef: BsModalRef;

//  bill: Bill; ///this object represent current selected bill
//  billdetail: BillDetail;
//  newbilldetail: BillDetail

//  billPlaceList: BillPlace[];
//  paymentTypeList: PaymentType[];
//  peopleList: People[];
//  currentDate: any;
//  date: any;
//  billId: number = 0;
//  IsVatCancelled: boolean;
//  itemPriceDefullt: number = 0;
//  itemName: string = '';
//  SelectedItem: Item;
//  pageTitle: string = "فاتورة شراء";

//	itemTabledisplayedColumns = ['No', 'Code', 'ItemName', 'Count', 'Unit', 'PurchasePrice', 'SellingPrice', 'Discount', 'Total', 'Delete'];
//	// itemTable: BillDetail[]= [];

//  constructor(private datepip: DatePipe, private modalService: BsModalService, private itemService: ItemsService, private serItemCategory: ItemCategoryService,
//    private billservice: BillInvoiceService, private peiopleService: peopleService, public TosterService: ToastWrapperService,
//    private route: ActivatedRoute, private router: Router, private homeServe: HomeService, private _location: Location, private titleService: Title) {

//    this.bill = new Bill();
//    this.billdetail = new BillDetail();

//    this.titleService.setTitle(this.pageTitle);
//  }

//	ngOnInit() {
//      this.getAllGetPeoples();
//      this.getAllBillPaymentType();
//      this.getAllItem();
//    }


//  navigateBack() {
//    this._location.back();
//  }

//  getItemById(id: number) {
//    this.itemService.getItemById(id).subscribe(data => {
//      console.log(id);
//      this.item = data;
//      this.billdetail = new BillDetail();
//      this.billdetail.item = this.item;
//      this.billdetail.itemId = this.item.id;
//      this.billdetail.vatTax = this.item.vat;
//      this.billdetail.qty = 1;
//      this.bill.billDetails.push(this.billdetail);
//      console.log(this.bill.billDetails);
//    })
//  }



//  pushItemInDetails(selecteditem: Item) {
//    this.item = selecteditem;
//    var find;
//    selecteditem.itemPrices.forEach(data => {
//      //find = this.bill.billDetails.find(f => f.itemPrice.id == data.id && f.isNew == true);
//      find = this.bill.billDetails.find(f => f.itemPrice.id == data.id);
//    });
//    if (find != null) {
//      find.qty += 1;
//      find.supTotal = find.itemSellPrice * find.qty;
//      var total = find.vatTax * find.itemSellPrice / 100 * find.qty;
//      find.totalAfterVatTax = find.supTotal + total;
//    }
//    else {
//      this.billdetail = new BillDetail();
//      //this.billdetail.isNew = true;
//      this.itemPricesList = selecteditem.itemPrices;
//      this.itemPricesList.forEach(itemPrices => {
//        this.billdetail.itemPrice.id = itemPrices.id
//        this.billdetail.itemId = this.item.id;
//        this.billdetail.item = this.item;
//        this.billdetail.unit = this.item.unit;
//        this.billdetail.qty = 1;
//        this.billdetail.unitId = selecteditem.unitId;
//        this.billdetail.itemSellPrice = itemPrices.price;
//        this.billdetail.itemPrice = itemPrices;
//      })
//      //this.newbilldetail.vatTax = selecteditem.vat;
//      //this.newbilldetail.supTotal = this.newbilldetail.itemSellPrice * this.newbilldetail.qty;

//      //let total = this.newbilldetail.itemSellPrice + (this.newbilldetail.vatTax * this.newbilldetail.itemSellPrice / 100);
//      //this.newbilldetail.totalAfterVatTax = total * this.newbilldetail.qty;

//      //this.bill.billDetails.push(this.newbilldetail);
//      //console.log(this.newbilldetail.itemPrice.itemSize.sizeNameEn);
//      //console.log(selecteditem);
//    }
//    this.checkPaymentKachOrAgel(this.bill.paymentId);
//    this.sum();
//  }






//  sum() {
//    // this is sum by details
//    this.billdetail.supTotal = this.billdetail.itemBuyPrice * this.billdetail.qty - this.billdetail.discount;

//    let result = this.billdetail.itemBuyPrice + (this.billdetail.vatTax * this.billdetail.itemBuyPrice / 100);
//    this.billdetail.netTotal = result * this.billdetail.qty - this.billdetail.discount;

//    //this is sum by bill
//     var total = 0;
//    var quntity = 0;

//    for (var i = 0; i < this.bill.billDetails.length; i++) {
//      quntity += this.bill.billDetails[i].qty;
//      total += this.bill.billDetails[i].supTotal;
//    }

//    this.bill.totalQty = quntity;
//    this.bill.supTotal = total
//    this.bill.netTotal = this.bill.supTotal + this.bill.serviceFees - this.bill.currentDiscount;
//    //this.checkPaymentKachOrAgel(this.bill.paymentId);
//  }

//  checkPaymentKachOrAgel(paymentId) {
//    console.log(paymentId);

//    if (paymentId == this.paymentTypeList.find(f => f.nameAR === 'كاش').id ||
//      paymentId == this.paymentTypeList.find(f => f.nameAR === 'فيزا').id) {
//      this.bill.paied = 0;
//      this.bill.remaining = 0;
//    }
//    else if (paymentId == this.paymentTypeList.find(f => f.nameAR === 'آجل').id) {
//      this.bill.paied = 0;
//      this.bill.remaining = this.bill.netTotal
//      this.bill.remaining = this.bill.netTotal - this.bill.paied;
//    }
//    this.checkPaymentKachOrAgel(this.bill.paymentId);
//  }

//  getAllGetPeoples() {
//    this.peiopleService.getAllPeoples().subscribe(data => {
//      this.peopleList = data;
//      this.peopleList.filter(f => f.peopleType.nameAR == 'مورد');
//      console.log(this.peopleList);
//    });
//  }


//  getAllItem() {
//    this.itemService.All_Item().subscribe(data => {
//      this.itemList = data.filter(X => X.isForSell == false);
//      console.log(this.itemList);
//      this.itemList = data.filter(X => X.isForSell == false);
//      //data.forEach(item => {
//      //  this.itemService.pushItemPrice.next(item.itemPrices);
//      //})
//    });
//  }




//  onSelectNewItem(event: TypeaheadMatch): void {

//    this.SelectedItem = event.item;
//    this.itemName = this.SelectedItem.nameAR;
//    this.TosterService.ErrorToaster.next("برجاء اختيار الصنف");
//    return;
//  }




//  saveBill(checkInvoic: boolean) {

//    this.bill.checkWiteInvoies = checkInvoic;
//    this.bill.tableNo = Bill.prototype.tableNo
//    console.log(Bill.prototype.tableNo);

//    this.bill.billTypeId = 1;
//    this.bill.currentDate = this.currentDate;
//    this.bill.date = this.date;
//    this.bill.remaining = this.bill.netTotal - this.bill.paied;
//    this.billservice.InsertOrUpdateBill(this.bill).subscribe(
//      result => {
//        this.TosterService.SucssesToaster.next("   تم حفظ الفاتوره بنجاح ");

//        //this.getBillsByCheckWait();
//        this.clearbill();
//      },
//      error => {
//        this.TosterService.ErrorToaster.next("   لم يتم الحفظ  ");


//      }
//    );


//  }
//  clearbill() {
//    this.bill = new Bill();
//    this.billdetail = new BillDetail();

//  }
//  getAllBillPaymentType() {
//    this.billservice.getAllBillPaymentType().subscribe(data => {
//      this.paymentTypeList = data;
//      this.bill.paymentId = this.paymentTypeList.find(f => f.nameAR == 'كاش').id;
//      //this.checkPaymentKachOrAgel();
//    });
//  }

//}
