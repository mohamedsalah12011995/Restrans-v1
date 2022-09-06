import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../bill-invoice/Models/Bill';

@Component({
	selector: 'app-print-invoice',
	templateUrl: './print-invoice.component.html',
	styleUrls: ['./print-invoice.component.css']
})
export class PrintInvoiceComponent implements OnInit {
  ResizePaper = 'col-md-5';
  @Input()  printablebill: Bill = new Bill();
	constructor() { }

	ngOnInit() {
	}

	ClickResizePaper(SizePaper){
		this.ResizePaper = SizePaper;
	}
}
