import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, PageEvent } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../date.adapter';
import { HeaderComponent } from '../../Shared/Components/header/header.component';
import { Title } from '@angular/platform-browser';
import { ReportsService } from '../reports.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-report-items',
  templateUrl: './report-items.component.html',
  styleUrls: ['./report-items.component.css'],
  providers: [
	  {
		  provide: DateAdapter, useClass: AppDateAdapter
    },
    ReportsService,
	  {
		  provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
	  }
  ]
})
export class ReportItemsComponent implements OnInit {
	displayedColumnsAbstract: string[] = ['position', 'itamCode', 'itemName', 'category', 'countSells', 'totalSells', 'countRefundSells', 'totalRefundSells', 'countBuy', 'totalBuy', 'countRefundBuys', 'totalRefundBuys', 'total'];
	dataSourceAbstract = Abstract_DATA;
	
	displayedColumnsDetailed: string[] = ['position', 'itamCode', 'itemName', 'category', 'categoryNum', 'billNum', 'count', 'unit', 'buyPrice', 'sellPrice', 'discount', 'vatPercent', 'totalVat', 'total', 'Profit', 'dateToday', 'User'];
	dataSourceDetailed = Detailed_DATA;
	repAbstract = true;
	repDetailed = false;


  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  currentLang: string = "";
  pageTitle: string = "";

  constructor(private titleService: Title, private reportServer: ReportsService, public translate: TranslateService) {
    this.currentLang = translate.currentLang;
    this.changeTitle(this.currentLang);

    //this.getReportItems();
 }


  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "تقرير الأصناف";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Report Items";
      this.titleService.setTitle(this.pageTitle);
    }
  }
  getReportItems() {
    this.reportServer.getReportItems().subscribe(data => {  });
  }


	ChangeRep(check){
		
		if (this.repAbstract === check) {
			if (check == true) {
				return this.repDetailed = true;
			}
		  this.repDetailed = false;
		}
		if (this.repDetailed === check) {
			if (check == true) {
				return this.repAbstract = true;
			}
		  this.repAbstract = false;
		}
	}
	ngOnInit() {
  }

  
}
export interface Abstract {
	position: number;
	itamCode: string;
	itemName: string;
	category: string;
	countSells: number;
	totalSells: number;
	countRefundSells: number;
	totalRefundSells: number;
	countBuy: number;
	totalBuy: number;
	countRefundBuys: number;
	totalRefundBuys: number;
	total: number;
}

const Abstract_DATA: Abstract[] = [
	{ position: 1, itamCode: '12', itemName: 'Hydrogen', category: '', countSells: 0, totalSells: 0, countRefundSells: 0, totalRefundSells: 0, countBuy: 0, totalBuy: 0, countRefundBuys: 0, totalRefundBuys: 0, total: 0},
	{ position: 2, itamCode: '12', itemName: 'Helium', category: '', countSells: 0, totalSells: 0, countRefundSells: 0, totalRefundSells: 0, countBuy: 0, totalBuy: 0, countRefundBuys: 0, totalRefundBuys: 0, total: 0},
	{ position: 3, itamCode: '12', itemName: 'Lithium', category: '', countSells: 0, totalSells: 0, countRefundSells: 0, totalRefundSells: 0, countBuy: 0, totalBuy: 0, countRefundBuys: 0, totalRefundBuys: 0, total: 0},
	{ position: 4, itamCode: '12', itemName: 'Beryllium', category: '', countSells: 0, totalSells: 0, countRefundSells: 0, totalRefundSells: 0, countBuy: 0, totalBuy: 0, countRefundBuys: 0, totalRefundBuys: 0, total: 0},
	{ position: 5, itamCode: '12', itemName: 'Boron', category: '', countSells: 0, totalSells: 0, countRefundSells: 0, totalRefundSells: 0, countBuy: 0, totalBuy: 0, countRefundBuys: 0, totalRefundBuys: 0, total: 0},
	{ position: 6, itamCode: '12', itemName: 'Carbon', category: '', countSells: 0, totalSells: 0, countRefundSells: 0, totalRefundSells: 0, countBuy: 0, totalBuy: 0, countRefundBuys: 0, totalRefundBuys: 0, total: 0},
	{ position: 7, itamCode: '12', itemName: 'Nitrogen', category: '', countSells: 0, totalSells: 0, countRefundSells: 0, totalRefundSells: 0, countBuy: 0, totalBuy: 0, countRefundBuys: 0, totalRefundBuys: 0, total: 0},
	{ position: 8, itamCode: '12', itemName: 'Oxygen', category: '', countSells: 0, totalSells: 0, countRefundSells: 0, totalRefundSells: 0, countBuy: 0, totalBuy: 0, countRefundBuys: 0, totalRefundBuys: 0, total: 0},
	{ position: 9, itamCode: '12', itemName: 'Fluorine', category: '', countSells: 0, totalSells: 0, countRefundSells: 0, totalRefundSells: 0, countBuy: 0, totalBuy: 0, countRefundBuys: 0, totalRefundBuys: 0, total: 0},
	{ position: 10, itamCode: '12', itemName: 'Neon', category: '', countSells: 0, totalSells: 0, countRefundSells: 0, totalRefundSells: 0, countBuy: 0, totalBuy: 0, countRefundBuys: 0, totalRefundBuys: 0, total: 0},
];
export interface Detailed {
	position: number;
	itamCode: string;
	itemName: string;
	category: string;
	categoryNum: number;
	billNum: number;
	count: number;
	unit: string;
	buyPrice: number;
	sellPrice: number;
	discount: number;
	vatPercent: number;
	totalVat: number;
	total: number;
	Profit: number;
	dateToday: string;
	Use: string;
}
const Detailed_DATA: Detailed[] = [
	{ position: 1, itamCode: '12', itemName: 'Hydrogen', category: '', categoryNum: 0, billNum: 0, count: 0, unit: 'حبة', buyPrice: 0, sellPrice: 0, discount: 0, vatPercent: 0, totalVat: 0, total: 0, Profit: 0, dateToday: '24-04-2019', Use: 'أشرف مصطفى'},
	{ position: 2, itamCode: '12', itemName: 'Hydrogen', category: '', categoryNum: 0, billNum: 0, count: 0, unit: 'حبة', buyPrice: 0, sellPrice: 0, discount: 0, vatPercent: 0, totalVat: 0, total: 0, Profit: 0, dateToday: '24-04-2019', Use: 'أشرف مصطفى'},
	{ position: 3, itamCode: '12', itemName: 'Hydrogen', category: '', categoryNum: 0, billNum: 0, count: 0, unit: 'حبة', buyPrice: 0, sellPrice: 0, discount: 0, vatPercent: 0, totalVat: 0, total: 0, Profit: 0, dateToday: '24-04-2019', Use: 'أشرف مصطفى'},
	{ position: 4, itamCode: '12', itemName: 'Hydrogen', category: '', categoryNum: 0, billNum: 0, count: 0, unit: 'حبة', buyPrice: 0, sellPrice: 0, discount: 0, vatPercent: 0, totalVat: 0, total: 0, Profit: 0, dateToday: '24-04-2019', Use: 'أشرف مصطفى'},
	{ position: 5, itamCode: '12', itemName: 'Hydrogen', category: '', categoryNum: 0, billNum: 0, count: 0, unit: 'حبة', buyPrice: 0, sellPrice: 0, discount: 0, vatPercent: 0, totalVat: 0, total: 0, Profit: 0, dateToday: '24-04-2019', Use: 'أشرف مصطفى'},
	{ position: 6, itamCode: '12', itemName: 'Hydrogen', category: '', categoryNum: 0, billNum: 0, count: 0, unit: 'حبة', buyPrice: 0, sellPrice: 0, discount: 0, vatPercent: 0, totalVat: 0, total: 0, Profit: 0, dateToday: '24-04-2019', Use: 'أشرف مصطفى'},
	{ position: 7, itamCode: '12', itemName: 'Hydrogen', category: '', categoryNum: 0, billNum: 0, count: 0, unit: 'حبة', buyPrice: 0, sellPrice: 0, discount: 0, vatPercent: 0, totalVat: 0, total: 0, Profit: 0, dateToday: '24-04-2019', Use: 'أشرف مصطفى'},
	{ position: 8, itamCode: '12', itemName: 'Hydrogen', category: '', categoryNum: 0, billNum: 0, count: 0, unit: 'حبة', buyPrice: 0, sellPrice: 0, discount: 0, vatPercent: 0, totalVat: 0, total: 0, Profit: 0, dateToday: '24-04-2019', Use: 'أشرف مصطفى'},
	{ position: 9, itamCode: '12', itemName: 'Hydrogen', category: '', categoryNum: 0, billNum: 0, count: 0, unit: 'حبة', buyPrice: 0, sellPrice: 0, discount: 0, vatPercent: 0, totalVat: 0, total: 0, Profit: 0, dateToday: '24-04-2019', Use: 'أشرف مصطفى'},
	{ position: 10, itamCode: '12', itemName: 'Hydrogen', category: '', categoryNum: 0, billNum: 0, count: 0, unit: 'حبة', buyPrice: 0, sellPrice: 0, discount: 0, vatPercent: 0, totalVat: 0, total: 0, Profit: 0, dateToday: '24-04-2019', Use: 'أشرف مصطفى'},
];
