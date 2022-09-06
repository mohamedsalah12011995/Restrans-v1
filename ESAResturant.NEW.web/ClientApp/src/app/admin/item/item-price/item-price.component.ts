import { Component, Input, TemplateRef } from '@angular/core';
import { ItemPriceService } from '../item-price/item-price.service';
import { ItemPrice } from '../Models/itemPrice';
import { ItemSize } from '../Models/ItemSize';
import { Item } from '../Models/item';
import { ItemsService } from '../items.service';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { ItemSizeService } from '../item-size/item-Size.service';
import { ItemComponent } from '../Models/ItemComponent';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-item-price',
    templateUrl: './item-price.component.html',
  styleUrls: ['./item-price.component.css'],
  providers: [ItemPriceService, ItemPriceService, ItemSizeService]
})
/** itemPrice component*/
export class ItemPriceComponent
{
  /** itemPrice ctor */
  item: Item
  @Input()
  itemPriceList: ItemPrice[];
  @Input()
  itemSizeList: ItemSize[];

  @Input()
  isDisplay: boolean;
  //itemSizeList: ItemSize[];
  itemPrice: ItemPrice;
  itemSize: ItemSize
  isShow: boolean;
  modalRef: BsModalRef;

  recommededComponents: ItemComponent[] = [];
  currentLang: string = "";

  constructor(public TosterService: ToastWrapperService, private serItemPrice: ItemPriceService, private itemService: ItemsService,
    private serItemSize: ItemSizeService, private modalService: BsModalService, private titleService: Title, public translate: TranslateService) {
    this.currentLang = translate.currentLang;
    //this.changeTitle(this.currentLang);

    this.itemPrice = new ItemPrice();
    this.itemSize = new ItemSize();
    //this.itemPriceList = [];
    //this.itemSizeList = []; 
    this.isShow = true;
  }

  ngOnInit() {
    // this.getItemSize();
    //this.getAllItemPrice();

    this.TosterService.ItemPriceSubject.subscribe((data : ItemPrice) => {
     // this.itemPrice = new ItemPrice();
      this.clear();
    })

  }



  getItemPriceByItemId(id) {
    this.serItemPrice.getItemPriceByItemId(id).subscribe(data => {

      this.itemPriceList = data


    });
  }
  getAllItemPrice() {
    this.serItemPrice.getAllItemPrice().subscribe(data => {
      this.itemPriceList = data;
      this.itemPriceList.forEach(v => {

        v.itemSizeList = this.itemSizeList;
        console.log(v);
      });
    });
  }

  getItemSize() {
    this.serItemSize.getAllItemSize().subscribe(data => {
      this.itemSizeList = data


    });
  }

  GetItemSize(itemSize: ItemSize) {
    this.itemPrice.itemSize = itemSize;
  }

  addRow() {
    this.itemPrice.itemId = this.itemService.ItemObject.id;
    var chk = this.itemPriceList.filter(f => f.isDefullt == true)
    if (chk.length == 1 && this.itemPrice.isDefullt == true) {
      this.itemPrice.isDefullt = false;
      let msg = this.translate.get("Messages.ITEMPRICECHECK").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }

    if (this.itemPrice.price == undefined || this.itemPrice.price== null) {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }

    else {
      this.itemPrice.itemSizeList = this.itemSizeList;
      this.itemPriceList.push(this.itemPrice);
      this.itemService.ListItemPrice = this.itemPriceList;
      console.log(this.itemService.ListItemPrice);
      this.recommededComponents = this.itemPrice.itemComponents;
      let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      this.clear();
    }

  }



  editRow(itemPrice: ItemPrice) {
    debugger;
    var chk = this.itemPriceList.filter(f => f.isDefullt == true)
    if (chk.length > 1) {

      this.itemPrice.isDefullt = false;
      let msg = this.translate.get("Messages.ITEMPRICECHECK").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }

    if (itemPrice.sizeId == 0 || itemPrice.price == 0) {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }
    else {
      itemPrice = this.itemPrice;
      let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      this.itemService.ListItemPrice = this.itemPriceList;
    }

  }

  deleteItemPriceConfirm() {
    this.modalRef.hide();
    this.deleteItem_Price(this.itemPrice);
  }


  deleteItemPrice(template: TemplateRef<any>, itemPrice: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.itemPrice = itemPrice;
  }

  deleteItem_Price(itemPrice: ItemPrice) {
    this.itemPrice = itemPrice;
      this.serItemPrice.deleteItemPrice(itemPrice.id).subscribe(data => {
        this.TosterService.SucssesToaster.next("تم الحذف بنجاح");
        this.getItemPriceByItemId(itemPrice.itemId);
      });
    
  }

  getById(itemPrice: ItemPrice) {
    this.itemPrice = new ItemPrice();
    this.itemPrice = itemPrice;
    console.log(itemPrice);
    this.isShow = false;
  }

  clear(): void  {

    this.itemPrice = new ItemPrice();
    this.isShow = true;

   if (this.recommededComponents != null) {

      this.recommededComponents.forEach((value, index) => {
        var newItem = new ItemComponent();
        newItem.item = value.item;
        newItem.itemComponentId = value.item.id;

        this.itemPrice.itemComponents.push(newItem);

      });
    }
  }



  openSizeModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-dialog modal-dialog-centered modal-lg' })
    );

    this.modalService.onHide.subscribe(e => {
      this.getItemSize();

    });
  }

  closeItemSizemodal() {
    this.getItemSize();

    //refresh ItemSize list on close modal
    this.modalRef.hide();
  }
  openComponentItemModal(template: TemplateRef<any>, selecteditemPrice: ItemPrice) {

    this.itemPrice = selecteditemPrice;


    console.log(this.itemPrice);
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-dialog modal-dialog-centered modal-lg' })
    );

    this.modalService.onHide.subscribe(e => { });
  }

  opennewComponentItemModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-dialog modal-dialog-centered modal-lg' })
    );

    this.modalService.onHide.subscribe(e => { });
  }

  ItemPriceChanged(selecteditemPrice: ItemPrice) {

    this.itemPrice = selecteditemPrice;


    console.log("this.itemPrice");
    console.log(this.itemPrice);
 }


}
