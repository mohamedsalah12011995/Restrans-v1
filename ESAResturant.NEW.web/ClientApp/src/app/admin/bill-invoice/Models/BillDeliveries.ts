import { Bill } from "./Bill";

export class BillDeliveries  {

  constructor() {

    this.id = 0;
    this.billId = 0;
    this.deliveryName = '';
    this.deliveryPhone = '';
    this.deliveryAddress = '';
  }
  
  id: number;
  deliveryName: string;
  deliveryPhone: string;
  deliveryAddress: string;
  billId: number;
  bill: Bill;
}
