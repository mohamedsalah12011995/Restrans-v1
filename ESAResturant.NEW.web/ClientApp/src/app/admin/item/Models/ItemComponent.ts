import { Item } from "./Item";
import { ItemPrice } from "./itemPrice";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";

export class ItemComponent {

  constructor() {
    this.id = 0;
    this.itemSizeId = 0;
    this.itemComponentId = 0;
    this.quantity = 0;

    this.myControl = new FormControl();
    //this.myControl.valueChanges.pipe(
    //  debounceTime(300)
    //).subscribe(data => {
    //  if (data == null || data == undefined || data.trim() == '') {
    //  }
    //  else {
    //    this.filteredOptions = this.itemService.getAllItemsByName(data)
    //  }
    //});
  }


  id: number;
  itemSizeId: number;
  itemComponentId: number;
  quantity: number;


  item?: Item;
  itemPrice?: ItemPrice;

  myControl: FormControl;
  filteredOptions: Observable<Item[]>;


}

