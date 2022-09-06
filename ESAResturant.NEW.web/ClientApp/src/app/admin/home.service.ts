import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from './bill-invoice/Models/Bill';
import { Subject } from 'rxjs';
//import { Router } from '../admin/';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url: any;
  namePage: any;
  isDayOpened: boolean = false;

  public requestNumberOrderChanged = new Subject();


  constructor(private router: Router) { }

  displayNamePages() {
    this.url = location.origin + window.location.pathname;
  }

  name_Home: string = location.origin + '/admin';
  name_Items: string = location.origin + '/admin/items';
  name_Itemsbuy: string = location.origin + '/admin/items-buy';
  name_Storehous: string = location.origin + '/admin/storehous';
  name_Peoples: string = location.origin + '/admin/peoples';
  name_reportCustomer: string = location.origin + '/admin/report-customer';
  name_billInvoice: string = location.origin + '/admin/billInvoice';
  name_billPurchases: string = location.origin + '/admin/billPurchases';
  name_tables: string = location.origin + '/admin/tables';
  name_reportToday: string = location.origin + '/admin/reportToday';
  name_reportInvoices: string = location.origin + '/admin/report-invoices';
  name_reportItems: string = location.origin + '/admin/report-items';
  name_reportApplication: string = location.origin + '/admin/report-application';
  name_reportTaxes: string = location.origin + '/admin/report-Taxes';
  name_application: string = location.origin + '/admin/application';
  name_currencies: string = location.origin + '/admin/currencies';
  name_Taxes: string = location.origin + '/admin/Taxes';
  name_kitchen: string = location.origin + '/admin/kitchen';
}
