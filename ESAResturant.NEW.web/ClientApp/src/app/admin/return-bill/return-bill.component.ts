import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../date.adapter';
import { HeaderComponent } from '../Shared/Components/header/header.component';

@Component({
	selector: 'app-return-bill',
	templateUrl: './return-bill.component.html',
	styleUrls: ['./return-bill.component.css'],
	providers: [
		{
			provide: DateAdapter, useClass: AppDateAdapter
		},
		{
			provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
		}
	]
})
export class ReturnBillComponent implements OnInit {

	constructor() { }
	itemTabledisplayedColumns = ['No', 'Code', 'Item', 'Count', 'Unit', 'SalePrice', 'Discount', 'VatTax', 'TotalVat', 'Total', 'add'];
	itemTable = ELEMENT_DATA;

	ngOnInit() {
		this.HideSlider();
	}
	HideSlider() {
		HeaderComponent.prototype.ToggleSidebar('close');
	}
}

export interface PeriodicElement {
	no: number;
	code: number;
	itemName: string;
	count: number;
	unit: number;
	note: string;
	sellingPrice: number;
	discount: number;
	vatTax: number;
	totalVat: number;
	total: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{ no: 1, code: 1, itemName: 'Hydrogen', count: 1, unit: 0, note: 'asdsd', sellingPrice: 15, discount: 0, vatTax: 5, totalVat: 500, total: 15 },
	{ no: 2, code: 2, itemName: 'Helium', count: 1, unit: 0, note: 'asdsd', sellingPrice: 15, discount: 0, vatTax: 5, totalVat: 500, total: 15 },
	{ no: 3, code: 3, itemName: 'Lithium', count:1, unit: 0, note: 'asdsd', sellingPrice: 15, discount: 0, vatTax: 5, totalVat: 500, total: 15 },
	{ no: 4, code: 4, itemName: 'Beryllium', count: 1, unit: 0, note: 'asdsd', sellingPrice: 15, discount: 0, vatTax: 5, totalVat: 500, total: 15 },
	{ no: 5, code: 5, itemName: 'Boron', count: 1, unit: 0, note: 'asdsd', sellingPrice: 15, discount: 0, vatTax: 5, totalVat: 500, total: 15 },
	{ no: 6, code: 6, itemName: 'Carbon', count: 1, unit: 0, note: 'asdsd', sellingPrice: 15, discount: 0, vatTax: 5, totalVat: 500, total: 15 },
	{ no: 7, code: 7, itemName: 'Nitrogen', count: 1, unit: 0, note: 'asdsd', sellingPrice: 15, discount: 0, vatTax: 5, totalVat: 500, total: 15 },
	{ no: 8, code: 8, itemName: 'Oxygen', count: 1, unit: 0, note: 'asdsd', sellingPrice: 15, discount: 0, vatTax: 5, totalVat: 500, total: 15 },
	{ no: 9, code: 9, itemName: 'Fluorine', count: 1, unit: 0, note: 'asdsd', sellingPrice: 15, discount: 0, vatTax: 5, totalVat: 500, total: 15 },
	{ no: 10, code: 10, itemName: 'Neon', count: 1, unit: 0, note: 'asdsd', sellingPrice: 15, discount: 0, vatTax: 5, totalVat: 500, total: 15 },
];