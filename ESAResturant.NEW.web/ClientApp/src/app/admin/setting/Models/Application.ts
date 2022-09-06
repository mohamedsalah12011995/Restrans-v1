import { Bill } from "../../bill-invoice/Models/Bill";

export class Application {

  constructor() {

    this.id = 0;
    this.nameAr = '';
    this.nameEn = '';
    this.price = 0;
    this.discountId = 0;
    this.isDelete = false;
  }

  id: number;
  nameAr: string;
  nameEn: string;
  price: number;
  discountId: number;
  isDelete: boolean
  image: string;
  bill: Bill
}
