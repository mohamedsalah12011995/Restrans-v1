import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { ItemCategoryService } from '../item/item-category/item-category.service';
import { ItemCategory } from '../item/Models/ItemCategory';
import { Bill } from '../bill-invoice/Models/Bill';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { SettingsService } from '../Shared/settings.service';
import { PagginatedTableVM } from 'src/app/Shared/classes/pagginated.table.viewmodel';
import { BillInvoiceService } from '../bill-invoice/bill-invoice.service';
import { TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
  providers: [HomeService, ItemCategoryService, SettingsService, BillInvoiceService],

})
export class KitchenComponent implements OnInit {

  itemCategoryList: ItemCategory[] = [];

  public NewbillList: Bill[] = [];
  public canceledbillList: Bill[] = [];
  public activebillList: Bill[] = [];

  public finishedList: Bill[] = [];
  public billList: Bill[] = [];


  completedPagginatedTableVM: PagginatedTableVM;

  fromDate: Date = new Date();
  toDate: Date = new Date();

  currentLang: string = "";
  pageTitle: string = "";
  private _hubConnection: HubConnection | undefined;

  onMessageSent$: any;
  constructor(private homeServe: HomeService,  private route: ActivatedRoute, private serItemCategory: ItemCategoryService,
    private settingsService: SettingsService, private billservice: BillInvoiceService, public authService: AuthService,
    private titleService: Title, public translate: TranslateService) {

    this.completedPagginatedTableVM = new PagginatedTableVM();

    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);
  }

  ngOnInit() {

    var kitchen=  './kitchen' ; 
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(kitchen)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));

    this.AddBill();
    this.deleteBillbysignalR();
    this.EditBill();

    this.currentLang = this.authService.CurrentLang;

    this.titleService.setTitle(this.pageTitle);
    this.homeServe.displayNamePages();
    this.getBillsPagginated();
    this.AddBill();

  }



  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "المطبخ";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "kitchen";
      this.titleService.setTitle(this.pageTitle);
    }
  }


  public AddBill = () => {
    this._hubConnection.on('AddBill', (data: Bill) => {

      if (data.isApproverd == 0) {
        var index = this.NewbillList.findIndex(f => f.id == data.id);
        if (index == -1) {
          this.NewbillList.push(data);
        }
        else {
          this.NewbillList[index] = data;
        }
      }

      if (data.isApproverd == 1) {
        var index = this.activebillList.findIndex(f => f.id == data.id);
        if (index == -1) {
          this.activebillList.push(data);
        }
        else {
          this.activebillList[index] = data;
        }
      }

      if (data.isApproverd == 2) {
        var index = this.finishedList.findIndex(f => f.id == data.id);
        if (index == -1) {
          this.finishedList.push(data);
        }
        else {
          this.finishedList[index] = data;
        }
      }

      if (data.isDelete == true) {
        var index = this.canceledbillList.findIndex(f => f.id == data.id);
        if (index == -1) {
          this.canceledbillList.push(data);
        }
        else {
          this.canceledbillList[index] = data;
        }
      }
      
    });
  }

  deleteBillbysignalR() {
    this._hubConnection.on('DeletedBill', (bill: Bill) => {

      var _indexNewbill = this.NewbillList.findIndex(f => f.id == bill.id);

      var indexActiveBill = this.activebillList.findIndex(f => f.id == bill.id);
     // var indexAny = this.canceledbillList.findIndex(f => f.id == bill.id);
   

      if (_indexNewbill > -1) {

        bill = this.NewbillList[_indexNewbill];
        this.NewbillList.splice(_indexNewbill, 1);
      }

      if (indexActiveBill > -1) {
        bill = this.activebillList[indexActiveBill];

        this.activebillList.splice(indexActiveBill, 1);
      }
      this.canceledbillList.push(bill);

    });
  }

  public EditBill = () => {
    this._hubConnection.on('EditBill', (data: Bill) => {


      if (data.isApproverd == 1) {
        //var index = this.activebillList.findIndex(f => f.id == data.id);
        var indexFind = this.NewbillList.find(f => f.id == data.id);
        var index = this.NewbillList.indexOf(indexFind);
          this.activebillList.push(data);
          this.NewbillList.splice(index, 1);
      }

      if (data.isApproverd == 2) {
        var indexFind = this.activebillList.find(f => f.id == data.id);
        var index = this.activebillList.indexOf(indexFind);

        this.finishedList.push(data);
        this.activebillList.splice(index, 1);

        }
      

      if (data.isDelete == true) {
        var index = this.canceledbillList.findIndex(f => f.id == data.id);
        if (index == -1) {
          this.canceledbillList.push(data);
        }
        else {
          this.canceledbillList[index] = data;
        }
      }


    });
  }


  searchableBill: Bill = new Bill();

  getBillsPagginated() {

    this.completedPagginatedTableVM.itemsPerPage = 200;
    this.fromDate = new Date();
    this.toDate = new Date();

    this.searchableBill.currentDate = new Date();

    this.billservice.BillListPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, this.fromDate, this.toDate, this.searchableBill, 'kitchen').subscribe(
      bills => {
        //this.filterbillList = bills.items;
        this.billList = bills.items;

        this.NewbillList = bills.items.filter(f => f.isApproverd == 0 && f.isDelete == false);
        this.activebillList = bills.items.filter(f => f.isApproverd == 1 && f.isDelete == false);
        this.finishedList = bills.items.filter(f => f.isApproverd == 2 && f.isDelete == false);
        this.canceledbillList = bills.items.filter(f => f.isDelete == true);


        for (var i = 0; i < this.NewbillList.length; i++) {
        }


        this.completedPagginatedTableVM.totalCount = bills.totalCount;


      },
      error => {
        console.error(error);

      });

  }


  getAllItemCategory() {
    this.serItemCategory.getAllItemCategories().subscribe(data => this.itemCategoryList = data);
  }

  public finishBill(bill: Bill) {

    bill.isApproverd = 2;
    this.billservice.InsertOrUpdateBill(bill).subscribe(
      result => {

      })
      , error => {

      }

  }

  public acceptBill(bill: Bill) {
    bill.isApproverd = 1;
    this.billservice.InsertOrUpdateBill(bill).subscribe(
      result => {
      })
      , error => {

      }
    bill = new Bill();

  }

  hideBill(bill: Bill) {
    bill.isDelete = true
    this.billservice.InsertOrUpdateBill(bill).subscribe(
      result => {
      })
      , error => {

      }

  }
}
