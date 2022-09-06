import { Injectable } from '@angular/core';
import { ToastWrapperService } from './toast-wrapper.service';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  isDayOpened: boolean = false;
  dateDay: any;
  private UserDateUrl: string = environment.baseUrl + 'api/UserDate/';

  constructor(private toasterService: ToastWrapperService, private datepip: DatePipe) { }

  SetCurrentDate(date: Date) {
    var myMoment: any = moment(date).toDate();

    this.isDayOpened = true;
    localStorage.removeItem("CurrentDate");
    localStorage.setItem("CurrentDate", JSON.stringify(myMoment));

    var _date = JSON.parse(localStorage.getItem('CurrentDate'));

  }

  RemoveCurrentDate() {
    localStorage.removeItem("CurrentDate");
    this.toasterService.requestDateChanged.next(null);

  }

  getCurrentDate() {
    //this.toasterService.CurrentDateUser.subscribe(date => {
    //  localStorage.setItem("CurrentDate", JSON.stringify(date.currentDate));
    //})
    var currentDate = localStorage.getItem("CurrentDate");
    if (currentDate == undefined || currentDate == null || currentDate == '' || currentDate == "null") {
      //this.toasterService.ErrorToaster.next("برجاء فتح اليوم !!");

      this.isDayOpened = false;
      return null;
    }
    else {
      var currentDatetime = new Date(currentDate);
      var currentDatetime = new Date();
      this.isDayOpened = true;
      this.dateDay = this.datepip.transform(new Date(currentDatetime), "yyyy-MM-dd");
      this.toasterService.requestDateChanged.next(this.dateDay);

      return currentDatetime;

    }

  }
}


export class TotalDay {
  constructor() {
    this.totalBillCount =  Number((0).toFixed(2));
    this.sumBillNetTotals =  Number((0).toFixed(2));
    this.sumBillCash = Number((0).toFixed(2));;
    this.sumBillVisa = Number((0).toFixed(2));;
    this.sumBillRemaining = Number((0).toFixed(2));;
    this.sumBillTotalVatTax = Number((0).toFixed(2));;
    this.totalServices = Number((0).toFixed(2));;
    this.totalDiscount = Number((0).toFixed(2));;
    this.qabd = Number((0).toFixed(2));;
    this.sarf = Number((0).toFixed(2));;
  }
  totalBillCount: number
  sumBillNetTotals: number
  sumBillCash: number;
  sumBillVisa: number
  sumBillRemaining: number
  sumBillTotalVatTax: number
  totalServices: number
  totalDiscount: number

  qabd: number
  sarf: number
  dateFrom: Date
  dateTo: Date
  user: any
  condetion: string;
}
