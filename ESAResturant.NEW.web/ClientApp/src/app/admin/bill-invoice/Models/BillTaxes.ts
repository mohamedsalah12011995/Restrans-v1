import { Taxes } from "../../setting/Models/Taxes";
import { Bill } from "./Bill";

export class BillTaxes  {

  constructor() {

    this.id = 0;
    this.billId = 0;
    this.taxesId = 0;
    this.total = 0;
    this.percentValue = 0;

  }
  
  id: number;
  billId: number;
  taxesId: number;
  total: number;
  percentValue: number;
  bill: Bill;
  Taxes: Taxes;
}


