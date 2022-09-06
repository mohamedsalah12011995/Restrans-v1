import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { ItemsService } from '../items.service';
import { Item } from '../Models/Item';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ItemComponent } from '../Models/ItemComponent';
import { ItemPrice } from '../Models/itemPrice';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-components-item',
  templateUrl: './components-item.component.html',
  styleUrls: ['./components-item.component.css'],
  providers: [ToastWrapperService, ItemsService]

})


export class ComponentsItemComponent implements OnInit {


  itemList: Item[]=[];
  itemName: string;
  SelectedItem: Item;
  @Input()
  itemPrice: ItemPrice;
  @Output() OnItemPriceChanged = new EventEmitter();

  newItemComponent: ItemComponent;

  selctedunitnameAr: string = ' ';
  selctedunitnameEn: string = ' ';
  myControl = new FormControl();
  filteredOptions: Observable<Item[]>;
  @ViewChild(MatAutocompleteTrigger) _auto: MatAutocompleteTrigger;

  currentLang: string = "";

  constructor(public TosterService: ToastWrapperService, private itemService: ItemsService,
    private titleService: Title, public translate: TranslateService) {



    this.currentLang = translate.currentLang;
    //this.changeTitle(this.currentLang);


    this.newItemComponent = new ItemComponent();
    this.newItemComponent.myControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(data => {
      if (data == null || data == undefined || data.trim() == '') {
      }
      else {
        this.filteredOptions = this.itemService.getAllItemsByName(data)
      }
    });

    this.SelectedItem = new Item();

    this.myControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(data => {
      if (data == null || data == undefined || data.trim() == '') {
      }
      else {
        this.filteredOptions = this.itemService.getAllItemsByName(data)
      }
      });

   
  }

  ngOnInit() {
    this.getAllItem();

    this.itemPrice.itemComponents.forEach(itemcomp => {
      itemcomp.myControl = new FormControl();
      itemcomp.filteredOptions = new Observable<Item[]>();
      itemcomp.filteredOptions = this.itemService.getAllItemsByName(itemcomp.item.nameAR)

      itemcomp.filteredOptions.subscribe(x => {

        itemcomp.myControl.setValue(itemcomp.item.nameAR);
        this._auto.autocomplete.autoActiveFirstOption = true
          ;
        let options = this._auto.autocomplete.options.toArray()
        itemcomp.myControl.updateValueAndValidity();

      })

      itemcomp.myControl.valueChanges.pipe(
        debounceTime(300)
      ).subscribe(data => {


        if (data == null || data == undefined || data.trim() == '') {}
        else {
          itemcomp.filteredOptions = this.itemService.getAllItemsByName(data)
        }

        });

      //itemcomp.filteredOptions.subscribe(x => {
      //  x.push(itemcomp.item);
      //});
      //itemcomp.myControl.setValue(itemcomp.item)
    });

  }





  getAllItem() {
    this.itemService.All_Item().subscribe(data => {
      this.itemList = data.filter(X => X.isForSell == false);
      this.itemList = data.filter(X => X.isForSell == false);
      //data.forEach(item => {
      //  this.itemService.pushItemPrice.next(item.itemPrices);
      //})
    });
  }


  removeRow(index) {
    this.itemPrice.itemComponents.splice(index, 1);
  }

  onSelectNewItem(event: any): void {



    this.filteredOptions.subscribe(items => {

      this.SelectedItem = items.find(x => x.nameAR == this.myControl.value || x.nameEN == this.myControl.value, 0);
      this.newItemComponent.item = this.SelectedItem;
      this.selctedunitnameAr = this.SelectedItem.unit.nameAr;
      this.selctedunitnameEn = this.SelectedItem.unit.nameEn;
    });

  return;
  }


  onSelectItemforcomponent(event: TypeaheadMatch, itemcomponent: ItemComponent): void {


    this.filteredOptions.subscribe(items => {

      this.SelectedItem = items.find(x => x.nameAR == this.myControl.value || x.nameEN == this.myControl.value, 0);
      itemcomponent.item = this.SelectedItem;
      //this.selctedunitname = this.SelectedItem.unit.nameAr;
    });

    return;



    itemcomponent.item = event.item;
    this.SelectedItem = event.item;
    itemcomponent.itemComponentId = this.SelectedItem.id;

    return;
}

  additemComponentRow() {
    if (this.newItemComponent.item == undefined || this.newItemComponent.item == null) {


      return;
    }

   
    this.itemPrice.itemComponents.push(this.newItemComponent);

    this.OnItemPriceChanged.emit(this.itemPrice);

    this.newItemComponent = new ItemComponent();
    this.newItemComponent.myControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(data => {
      if (data == null || data == undefined || data.trim() == '') {
      }
      else {
        this.newItemComponent.filteredOptions = this.itemService.getAllItemsByName(data)
      }
    });




    this.itemName = '';
    this.newItemComponent.filteredOptions = this.itemService.getAllItemsByName(this.SelectedItem.nameAR)

    this.newItemComponent.filteredOptions.subscribe(x => {


      this.newItemComponent.myControl.setValue(x[0].nameAR);
      this._auto.autocomplete.autoActiveFirstOption = true;


      this.newItemComponent.item = x[0];
      let options = this._auto.autocomplete.options.toArray()
      this.newItemComponent.myControl.updateValueAndValidity();

    });

  }





}
