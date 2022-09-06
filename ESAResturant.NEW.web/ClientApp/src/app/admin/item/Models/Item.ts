import { ItemPrice } from "./itemPrice";
import { ItemSize } from "./ItemSize";
import { ItemCategory } from "./ItemCategory";
import { Unit } from "./Unit";
import { BillDetail } from "../../bill-invoice/Models/BillDetail";
import { ItemComponent } from "./ItemComponent";

export class Item {

  constructor() {
    this.id = 0;
    this.code = '';
    this.nameAR = '';
    this.nameEN = '';
    this.note = '';
    this.imageName = '';
    this.imagePath = '';
    this.itemCategoryId = 0;
    this.discountId = 0;
    this.vat = 0;
    this.unitId = 0;
    this.smallUnitQty = 0;
    this.averagePrice = 0;
    this.totalAveragePrice = 0;
    this.itemPriceDefault = 0;
    //this.itemIndex = 0;

    this.isDelete = false;
    this.itemPrices = [];
  }

  id: number;
  code: string;
  nameAR: string;
  nameEN: string;
  note: string;
  imageName: string;
  imagePath: string;
  itemCategoryId: number;
  currentDicount: number;
  discountId?: number;
  vat: number;
  unitId: number;
  smallUnitQty: number;
  averagePrice: number;
  totalAveragePrice: number;
  lastPurchaseDate: Date;
  lastSeleDate: Date;
  isDelete: boolean;

  lowestSellPrice: number;
  buyPrice: number;
  lowestQuantity: number;
  isForSell: boolean;
  barCode1: string;
  barCode2: string;
  barCode3: string;
  currentQuantity: number;
  firstQuantity: number;



  itemPriceDefault?: number;
  itemIndex: number;



  itemCategory: ItemCategory;
  unit: Unit;
  itemPrices: ItemPrice[];
  billDetails: BillDetail[]
  itemComponents: ItemComponent[];
}
