import { Bill } from "./Bill";
import { Currencies } from "../../setting/Models/Currencies";

export class BillCurrencies  {

  constructor() {

    this.id = 0;
    this.billId = 0;
    this.currencyId = 0;
    this.bankValue = 0;
    this.isSelected = false;

  }
  
  id: number;
  billId: number;
  currencyId: number;
  bankValue: number;
  total: number;
  isSelected: boolean;
  bill: Bill;
  Currencies: Currencies;
}
