import { Component } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../date.adapter';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';


@Component({
    selector: 'app-report-customer',
    templateUrl: './report-customer.component.html',
    styleUrls: ['./report-customer.component.css'],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})
/** ReportCustomer component*/
export class ReportCustomerComponent {
/** ReportCustomer ctor */
  currentLang: string = "";
  pageTitle: string = "";

  constructor(private titleService: Title, private _location: Location, public translate: TranslateService) {
    this.currentLang = translate.currentLang;
    this.changeTitle(this.currentLang);
  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "العملاء والموردين";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Customers and Suppliers";
      this.titleService.setTitle(this.pageTitle);
    }
  }
  navigateBack() {
    this._location.back();
  }
}
