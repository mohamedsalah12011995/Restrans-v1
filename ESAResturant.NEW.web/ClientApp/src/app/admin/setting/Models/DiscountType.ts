import { Bill } from "../../bill-invoice/Models/Bill";

export class DiscountType {

  constructor() {

    this.id = 0;
    this.nameAr = '';
    this.nameEn = '';
  }

  id: number;
  nameAr: string;
  nameEn: string;
  bill: Bill
}
