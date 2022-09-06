import { Item } from "./Item";
import { BillDetail } from "../../bill-invoice/Models/BillDetail";

export class Unit {

  constructor() {
    this.id = 0;
    this.nameAr = '';
    this.nameEn = '';
    this.isForSell = false;
    this.isForBuy = false;
    this.isDelete = false;
    this.item=[]
    this.billDetails = [];
  }


  id: number;
  nameAr: string;
  nameEn: string;
  isForSell: boolean;
  isForBuy: boolean;
  isDelete: boolean;
  item: Item[];
  billDetails: BillDetail[]
}
