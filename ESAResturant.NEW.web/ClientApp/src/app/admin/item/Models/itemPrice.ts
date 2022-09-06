import { Item } from "./Item";
import { ItemSize } from "./ItemSize";
import { ItemComponent } from "./ItemComponent";

export class ItemPrice {

  constructor() {
    this.id = 0;
    this.itemId = 0;
    this.sizeId = 0;
    this.price = 0;
    this.quantityOnCart = 1;
    this.isDefullt = false;
    this.isDelete = false;
    this.itemSizeList = [];
    this.itemComponents = [];
  }


  id: number;
  itemId?: number;
  sizeId?: number;
  price: number;
  isDefullt: boolean;
  isDelete: boolean;
  item?: Item;
  itemSize?: ItemSize;
  itemComponents: ItemComponent[];

quantityOnCart: number = 1;

  itemSizeList: ItemSize[];

}


