import { Component, Input, TemplateRef } from '@angular/core';
import { ItemSize } from '../Models/ItemSize';
import { Item } from '../Models/item';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { ItemSizeService } from './item-Size.service';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-ItemSize',
    templateUrl: './Item-Size.component.html',
  styleUrls: ['./Item-Size.component.css'],
  providers: [ItemSizeService]
})
/** ItemSize component*/
export class ItemSizeComponent
{
  /** ItemSize ctor */
  item: Item
  @Input()
  itemSizeList: ItemSize[];
  itemSize: ItemSize
  isShow: boolean;
  hh: any;

  modalRef: BsModalRef;

  currentLang: string = "";

  constructor(public TosterService: ToastWrapperService, private serItemSize: ItemSizeService, private modalService: BsModalService,
    private titleService: Title, public translate: TranslateService) {

    this.currentLang = translate.currentLang;
    //this.changeTitle(this.currentLang);

    this.itemSize = new ItemSize();
    this.itemSizeList = [];
    this.isShow = true;
  }

  ngOnInit() {
    this.getItemSize();
  }



  getItemSize() {
    this.serItemSize.getAllItemSize().subscribe(data => {
      this.itemSizeList = data
      console.log(data);
    });
  }

  InsertOrUpdateItemSize(type) {
    if (this.itemSize.sizeNameAr === '') {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      return;
    }
    if (type === 'add') {
      for (var i = 0; i < this.itemSizeList.length; i++) {
        if (this.itemSize.sizeNameAr == this.itemSizeList[i].sizeNameAr) {
          let msg = this.translate.get("Messages.SIZEEXIST").subscribe(msg => {
            this.TosterService.SucssesToaster.next(msg);
          });
          return;
        }
      }
    }

    this.serItemSize.InsertOrUpdateItemSize(this.itemSize).subscribe(data => { this.getItemSize() });

    if (type === 'add') {
      let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      this.clear();
      return;
    }
    if (type === 'edit') {
      let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      return;
    }
  }


  deleteItemSizeConfirm() {
    this.modalRef.hide();
    this.delete_ItemSize(this.itemSize);
  }


  deleteItemSize(template: TemplateRef<any>, itemSize: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.itemSize = itemSize;
  }

  delete_ItemSize(itemSize: ItemSize) {
    this.itemSize = itemSize;
    this.serItemSize.deleteItemSize(itemSize.id).subscribe(data => {
      if (data) {
        this.getItemSize();
        let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
        });
      }

      else {
        let msg = this.translate.get("Messages.ITEMSIZENOTDELETED").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
        });
      }
      this.clear();

    })
  }

  getById(itemS: ItemSize) {
    this.itemSize = new ItemSize();
    this.itemSize = itemS;
    console.log(itemS);
    this.isShow = false;

    if (itemS.sizeNameEn == '' || null) {
      itemS.sizeNameEn = itemS.sizeNameAr;
    }
  }

  clear() {
    this.itemSize = new ItemSize();
    this.isShow = true;
  }
}
