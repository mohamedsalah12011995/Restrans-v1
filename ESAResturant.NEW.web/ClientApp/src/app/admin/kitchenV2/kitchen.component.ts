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
import { DatePipe } from '@angular/common';
import { Subscription, interval } from 'rxjs';




@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
  providers: [HomeService, ItemCategoryService, SettingsService, BillInvoiceService, DatePipe],

})
export class KitchenComponentV2 implements OnInit {

  itemCategoryList: ItemCategory[] = [];

  public NewbillList: Bill[] = [];
  // public canceledbillList: Bill[] = [];
  // public activebillList: Bill[] = [];

  public finishedList: Bill[] = [];
  public billList: Bill[] = [];

  completedPagginatedTableVM: PagginatedTableVM;

  fromDate: Date;
  toDate: Date;

  private _hubConnection: HubConnection | undefined;

  user: any;
  currentLang: string = '';
  pageTitle: string = "";

  private updateSubscription: Subscription;

  _list = [];
  _categorylist = [];
  onMessageSent$: any;
  constructor(private homeServe: HomeService, private route: ActivatedRoute, private serItemCategory: ItemCategoryService, private datepip: DatePipe,
    public authService: AuthService, private billservice: BillInvoiceService, public translate: TranslateService, private titleService: Title,
    private settingsService: SettingsService) {
    this.completedPagginatedTableVM = new PagginatedTableVM();

    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);

    this.user = JSON.parse(localStorage.getItem('User'));

  }

  ngOnInit() {

    const kitchen=  './kitchen' ; 
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(kitchen)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => {
      console.error(err.toString())
      this.playAudio();
    });

    localStorage.setItem('NewbillList', JSON.stringify(0));


    //this.AddBill();
    //this.deleteBillbysignalR();
    //this.EditBill();
    this.getBillsPagginated();
    this.getFinshedBillsPagginated();
    //setInterval('this.getBillsPagginated()', 10000);

    this.updateSubscription = interval(5000).subscribe(
      () => {
        this.getBillsPagginated();
      }
    );

  }

 

  changeTitle(language) {
    if (language === 'ar') {
      this.pageTitle = "المطبخ";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language === 'en') {
      this.pageTitle = "kitchen";
      this.titleService.setTitle(this.pageTitle);
    }
  }
  printBill(data: Bill) {
    //const newBill = new Bill();
    //newBill = data;
    data.checkWiteInvoies = true;
    this.billservice.getBillById(data.id).subscribe((bill: Bill) => {
      bill.billDetails.forEach(b => { b.isNew = true, b.isPrint = true; }); 
      this.billservice.PrintBill(bill).subscribe(data => {

      });
    })

  }

  public AddBill = () => {
    this._hubConnection.on('AddBill', (data: Bill) => {

      

      const indexNewList = this.NewbillList.findIndex(f => f.id === data.id);
      data.billDetails = data.billDetails.map((value) => {
        if (value.item) {
          if (this.authService.HasItemCategory(value.item.itemCategoryId)) {
            return value;
          }
        }
        else {
          return undefined;
        }

      }).filter(x => x !== undefined);

      if (data.isDelete === false && data.isApproverd===1) {
        if (indexNewList === -1) {
          this.NewbillList.unshift(data);
        }
        else {
          this.NewbillList[indexNewList] = data;
        }

        const chkDetails = this.NewbillList.findIndex(f => f.id === data.id);

        if (data.billDetails.length === 0) {
          this.NewbillList.splice(chkDetails, 1);
          return;
        }
        setTimeout(() => {
          (document.getElementById('#KBD' + data.id) as HTMLElement).classList.add('NewOrder');
          //(document.querySelector('#KBD' + data.id) as HTMLElement).classList.add('NewOrder');
        }, 500);

        this.NewbillList[indexNewList].billDetails.forEach(_detail => {
          if (_detail !== undefined) {
            this.setMyStyles(_detail.isNew)
          }
        })

        if (data.tableNo === null) {
          this.chkStyleTable(data.tableNo);
        }
      }
      this.playAudio();
    });
  }

  deleteBillbysignalR() {
    this._hubConnection.on('DeleteBill', (bill: Bill) => {
      this.playAudio();

      const _indexNewbill = this.NewbillList.findIndex(f => f.id === bill.id);

      if (_indexNewbill > -1) {
        setTimeout(() => {  
          (document.getElementById('#KBD'+ bill.id) as HTMLElement).classList.add('CancelOrder');
          //(document.querySelector('#KBD'+ bill.id) as HTMLElement).classList.add('CancelOrder');
        }, 500);
      }

    
    });
  }


  setMyStyles(isNew) {
    if (isNew === true) {
      const styleIsNew = {
        'background-color': '#7fde29f2',
        'color': '#000000',

      };
      return styleIsNew;
    }
  }

  chkStyleTable(table) {
    if (table === null) {
      const styleIsNew = {
        'background-color': '#73af38',
        'color': '#000000',
      };
      return styleIsNew;
    }
  }


  searchableBill: Bill = new Bill();

  getBillsPagginated() {

    this.completedPagginatedTableVM.itemsPerPage = 200000;

    const _date = this.settingsService.getCurrentDate();
    this.fromDate = _date;
    this.toDate = _date;
    //this.fromDate = this.datepip.transform(new Date(_date), "yyyy-MM-dd");
    //this.toDate = this.datepip.transform(new Date(), "yyyy-MM-dd h:mm:ss");

    this.searchableBill.currentDate = new Date();
    this.billservice.BillListPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, this.fromDate, this.toDate, this.searchableBill, 'kitchen').subscribe(
      bills => {
        this.NewbillList = bills.items;


          this.NewbillList.forEach(data => {
            const chk = this.authService.getUserType();
            if (chk !== 1) {
              data.billDetails = data.billDetails.map((value) => {
                if (value.item) {
                  if (this.authService.HasItemCategory(value.item.itemCategoryId)) {
                    return value;
                  }
                }
                else {
                  return undefined;
                }
              }).filter(x => x !== undefined);
            };

            // data.billDetails.forEach(f => f.isFinshed === false);


          if (data.billDetails.length === 0) {
            const index = this.NewbillList.findIndex(f => f.id === data.id);
            if (index > -1) {
              this.NewbillList.splice(index, 1);
            }
          }


          data.billDetails.forEach(f => {
            if (f.isNew === true) {
              this.setMyStyles(f.isNew);
            }
          })

          const ListLength = Number(localStorage.getItem('NewbillList'));
          if (this.NewbillList.length > ListLength) {
            this.playAudio();
            localStorage.setItem('NewbillList', JSON.stringify(this.NewbillList.length));
          }
          //data.billDetails = data.billDetails.filter(f => f.isFinshed === false);
          //console.log(data.billDetails);

        })

        this.completedPagginatedTableVM.totalCount = bills.totalCount;
        const CancelOrders = this.NewbillList.filter(f => f.isDelete === true)

        CancelOrders.forEach(e => {
          setTimeout(() => {    //<<<---    using ()=> syntax
            //(document.getElementById('#KBD' + e.id) as HTMLElement).classList.add('CancelOrder');
            //(document.querySelector('#KBD' + e.id) as HTMLElement).classList.add('CancelOrder');
          }, 500);
        });

        const NewOrders = this.NewbillList.filter(f => f.isApproverd === 1)
        NewOrders.forEach(e => {
          setTimeout(() => {    //<<<---    using ()=> syntax
            //(document.getElementById('#KBD' + e.id) as HTMLElement).classList.add('NewOrder');
            //(document.querySelector('#KBD' + e.id) as HTMLElement).classList.add('NewOrder');
          }, 500);
        });
      },
      error => {
        console.error(error);

      });

    //................................ END Pagginated....................................//

    for (let i = 0; i < this.NewbillList.length; i++) {
      const element = this.NewbillList[i];
      if (element.isDelete === true) {
        const index = this.NewbillList.findIndex(f => f.id === element.id);
        if (index > -1) {


          for (let i = 0; i < index; i++) {
            const element = index[i];
            if (element.isApproverd === -1) {
              setTimeout(() => {    //<<<---    using ()=> syntax
                //(document.getElementById('#KBD' + element.id) as HTMLElement).classList.add('CancelOrder');
                (document.querySelector('#KBD' + element.id) as HTMLElement).classList.add('CancelOrder');
              }, 500);
            }
          }
        }

      }
    }
  }


  hideBillInKitchen(bill: Bill) {

    bill.isApproverd = 1;
    bill.billDetails.forEach(data => {
      data.isNew = false;
      data.isPrint = false;
      data.isFinshed = true;
    })

    this.billservice.updateBill(bill).subscribe(
      () => {
        //bill = new Bill();
        //this.getBillsPagginated();
        //this.getFinshedBillsPagginated();
      })
  }


  getFinshedBillsPagginated() {
    // ................... Get Finshed Bill ...................//
    this.completedPagginatedTableVM.itemsPerPage = 20;
    this.searchableBill.currentDate = new Date();
    this.billservice.BillListFinshedPaginated(this.completedPagginatedTableVM.currentPage, this.completedPagginatedTableVM.itemsPerPage, this.completedPagginatedTableVM.sortKey, this.completedPagginatedTableVM.sortOrderBY, this.fromDate, this.toDate, this.searchableBill, 'finshedBill').subscribe(
      bills => {
        this.finishedList = bills.items;

        console.log(this.finishedList)

        this.finishedList.forEach(data => {

          const chk = this.authService.getUserType();
          if (chk !== 1) {
            data.billDetails = data.billDetails.map((value) => {
              if (value.item) {
                if (this.authService.HasItemCategory(value.item.itemCategoryId)) {
                  return value;
                }
              }
              else {
                return undefined;
              }

            }).filter(x => x !== undefined);
          }
          data.billDetails = data.billDetails.filter(f => f.isFinshed === true);


        })

      },
      error => {
        console.error(error);

      });


    //................................ END Pagginated....................................//

  }


  getAllItemCategory() {
    this.serItemCategory.getAllItemCategories().subscribe(data => this.itemCategoryList = data);
  }




  public finishBill(bill: Bill) {
    bill.isApproverd = 2;
    bill.billDetails.forEach(data => {
      data.isNew = false;
      data.isPrint = false;
      data.isFinshed = true;
      data.note = ' (تم الإنهاء)';
    })
    // bill.billDetails.forEach(f => f.isNew = true);
    this.billservice.updateBill(bill).subscribe(
      () => {
        bill = new Bill();
        this.getBillsPagginated();
        this.getFinshedBillsPagginated();
      })
      , error => {
        console.error(error);

      }

  }


  hideBill(bill: Bill) {
    bill.isDelete = true
    this.billservice.InsertOrUpdateBill(bill).subscribe(
      result => {
      })
      , error => {

      }


  }

  playAudio() {
    const audio = new Audio();
    audio.src = "../../../assets/notification/notification-Kitchen.mp3";
    audio.load();
    audio.play();
  }
  printablebill: Bill = new Bill();
  printRow(bill: Bill) {
    this.billservice.getBillById(bill.id).subscribe(data => {
      this.printablebill = data;

      setTimeout(() => {    //<<<---    using ()=> syntax
        this.clickResizePaper('printbill');
      }, 500);

    })
  }
  clickResizePaper(type) {
    // Open used in new window
    // let printContents, popupWin;
    // printContents = document.getElementById('printbill').innerHTML;
    // // printContents = (document.querySelector(printID) as HTMLElement).innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();


    let printContents, popupWin;
    if (type ==='printbill') {
      printContents = document.getElementById('printbill').innerHTML;
    }
    if (type === 'printItems') {
      printContents = document.getElementById('printItems').innerHTML;

    }

    if (type === 'printMiniToday') {
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
}
