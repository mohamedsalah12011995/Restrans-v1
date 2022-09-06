import { Bill } from "../../bill-invoice/Models/Bill";

export class Currencies {

  constructor() {

    this.id = 0;
    this.nameAr = '';
    this.nameEn = '';
    this.bankValue = 1;
    this.CreatedBy = 0;
    this.ModifiedBy = 0;
    this.isDefault = false;
    this.isDelete = false;
  }

  id: number;
  nameAr: string;
  nameEn: string;
  bankValue: number;
  CreatedAt: Date;
  CreatedBy: number;
  ModifiedAt: Date;
  ModifiedBy: number;
  isDefault: boolean;
  isDelete: boolean;
  bill: Bill;
}

