import { Item } from '../../item/Models/Item';
import { ItemPrice } from '../../item/Models/itemPrice';
import { Unit } from '../../item/Models/Unit';
import { Bill } from './Bill';

export class BillDetail {

  constructor() {

    this.id = 0;
    this.billId = 0;
    this.itemId = 0;
    this.itemSellPrice = 0;
    this.itemBuyPrice = 0;
    this.qty = 1;
    this.unitId = 0;
    this.smallUnitQty = 0;

    this.supTotal = 0;
    this.vatTax = 0;
    this.vatTaxValue = 0;
    this.totalAfterVatTax = 0;

    this.discount = 0;
    this.discountValue = 0;

    this.notePrice = 0;
    this.netTotal = 0;
    this.itemPriceId = 0;

    this.currentDate = new Date();
    this.date = new Date();
    this.tableNo = '';
    this.note = '';
    this.isNew = false;
    this.isDelete = false;
    this.isFire = false;
    this.isSeparate = false;
    this.isFinshed = false;

    this.bill = new Bill();
    this.unit = new Unit();
    this.item = new Item();
    this.itemPrice = new ItemPrice();
  }





  id: number;
  billId: number;
  itemId: number;
  itemSellPrice: number;
  itemBuyPrice: number;
  qty: number;
  unitId: number;
  smallUnitQty: number;
  supTotal: number;    //total after vat calac 

  vatTax: number;
  vatTaxValue: number;
  totalAfterVatTax: number;
  discount: number;
  discountValue: number;
  netTotal: number;
  currentDate: Date;
  date: Date;
  notePrice: number;
  note: string;
  tableNo: string;
  itemPriceId: number;
  isNew?: boolean;
  isDelete?: boolean;

  isPrint?: boolean;
  isFire?: boolean;
  isSeparate?: boolean;
  isFinshed?: boolean;
  bill:Bill
  item: Item;
  unit: Unit;
  itemPrice: ItemPrice;
}
