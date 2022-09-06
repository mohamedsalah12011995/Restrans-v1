import { Component,OnInit, TemplateRef } from '@angular/core';
import { ItemsService} from '../item/items.service';
import { HttpClient} from '@angular/common/http'
import { ItemCategoryService } from './item-category/item-category.service';
import { ItemCategory } from './Models/ItemCategory';
import { Item } from './Models/Item';
import { ItemPriceComponent} from './item-price/item-price.component';
import { ItemPrice } from './Models/itemPrice';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';
import { DateAdapter, MAT_DATE_FORMATS, PageEvent } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../date.adapter';
import { ItemSize } from './Models/ItemSize';
import { ItemSizeService } from './item-size/item-Size.service';
import { ItemPriceService } from './item-price/item-price.service';
import { Unit } from './Models/Unit';
import { UnitService } from './Unit/Unit.service';
import { TaxesService } from '../setting/Taxes/Taxes.service';
import { Taxes } from '../setting/Models/Taxes';
import { PagginatedTableVM } from 'src/app/Shared/classes/pagginated.table.viewmodel';
import { HomeService } from '../home.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { UplodeFileService } from '../../Shared/uplodeFile.service';


//import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, Control } from '@angular/common';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  //encapsulation: ViewEncapsulation.None,
  providers: [ItemsService, ItemCategoryService, ItemSizeService, ItemPriceService, UnitService, TaxesService, HomeService,
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})


/** Item component*/
export class ItemComponent {
  /** Item ctor */
  private BaseItemrUrl: string = environment.baseUrl + 'api/Upload/';

  itemList: Item[];
  filterItemList: Item[] = [];
  itemCategoryList: ItemCategory[] = [];
  SerchList: Item[] = [];
  itemForCategoryList: Item[];
  unitList: Unit[];

  itemCategory: ItemCategory;
  item: Item;
  newItem: Item = new Item();


  selectedFiles: FileList;
  selectedputh: any;
  ImagePath: string;
  ImageName: string;

  exampleParent: any;
  itemPrice: ItemPrice;
  // Data Table
  //displayedColumns = ['n', 'sizeNameAr', 'sizeNameEn', 'price'];
  // dataSource = ELEMENT_DATA;
  itemPriceList: any;
  itemSizeList: ItemSize[];
  TaxesList: Taxes[];
  // displayedColumns: string[] = ['N', 'sizeNameAr', 'sizeNameEN', 'price'];
  //dataSource = this.itemPriceList;

  //userForm: FormGroup;
  imageSrc: any;
  fileNames: any;
  pathName: any;

  formData: FormData = new FormData();


  isnew: boolean;

  modalRef: BsModalRef;
  itemPagginatedTableVM: PagginatedTableVM;
  filterditemVM: Item = new Item();

  pageEvent: PageEvent;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  currentLang: string = '';
  pageTitle: string = "";

  countItems: number = 0;
  changeImg: boolean = false;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  constructor(public TosterService: ToastWrapperService, private itemService: ItemsService, private serItemCategory: ItemCategoryService,
    private serItemSize: ItemSizeService, private serItemPrice: ItemPriceService, private http: HttpClient, private taxServ: TaxesService,
    public translate: TranslateService, private modalService: BsModalService, private unitServ: UnitService, private uplodeService: UplodeFileService,
    private homeServe: HomeService, private _location: Location, private titleService: Title, public authService: AuthService) {
    this.item = new Item();
    this.clearimg();
    this.SerchList = this.itemList;
    this.filterItemList = this.itemList;
    this.itemPagginatedTableVM = new PagginatedTableVM();
    this.isnew = true;

    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);

  }
  ngOnInit() {
    this.itemPagginatedTableVM.currentPage = 0;
    this.getAllItemCategory();
    this.getUnits();

    //this.getAllItem();
    this.itemService.PriceListUpdated.subscribe((pricelist: ItemPrice[]) => {
      let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });


      this.item.itemPrices = pricelist;
      // this.modalRef.hide();
    });
    this.getItemSize();
    this.getItemByInvoise();
    this.getVatTax();
    this.homeServe.displayNamePages();
    this.getItemsPagginated();

  }
  navigateBack() {
    this._location.back();
  }


  changeTitle(language: string) {
    if (language == 'ar' || language == '') {
      this.pageTitle = "أصناف البيع";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Item Sell";
    }
    this.titleService.setTitle(this.pageTitle);

  }

  Pagginatedchanged(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.itemPagginatedTableVM.currentPage = pageEvent.pageIndex;
    this.itemPagginatedTableVM.itemsPerPage = pageEvent.pageSize;
    this.itemPagginatedTableVM.totalCount = pageEvent.length;
    this.getItemsPagginated();
  }


  getItemsPagginated() {
    var All = 100000
    this.itemPagginatedTableVM.itemsPerPage = All;
    this.filterditemVM.isForSell = true;
    this.itemService.getItemsPaginated(this.itemPagginatedTableVM.currentPage, this.itemPagginatedTableVM.itemsPerPage, this.itemPagginatedTableVM.sortKey, this.itemPagginatedTableVM.sortOrderBY, this.filterditemVM, 'IsForSell').subscribe(
      pageddata => {
        this.itemList = pageddata.items;
        this.countItems = this.itemList.length;

        this.itemPagginatedTableVM.totalCount = pageddata.totalCount;
        this.itemPagginatedTableVM.calculateShowingNo();
        this.filterItemList = this.itemList.filter(x => x.isForSell == true);

      },
      error => { });


  }






  //  getVatTax
  getVatTax() {
    this.taxServ.getAllTaxes().subscribe(data => {
      this.TaxesList = data;
      this.getValueFromTaxesList();
    });
  }
  getValueFromTaxesList() {
    var chk = this.TaxesList.find(f => f.nameAr === 'القيمة المضافة' || f.nameAr === ' القيمة المضافة' || f.nameAr === ' القيمة المضافه' && f.isActive == true);

    if (chk != null) {
      Item.prototype.vat = chk.percentValue;
      this.item.vat = chk.percentValue;
    }
    else {
      this.item.vat = 0;
    }
  }

  getItemPriceByItemId(id) {
    this.serItemPrice.getItemPriceByItemId(id).subscribe(data => this.itemPriceList = data);
  }

  getItemByInvoise() {
    this.itemService.GetItemsByInvoise().subscribe(data => { });
  }

  getUnits() {
    this.unitServ.getAllUnit().subscribe(data => {
      this.unitList = data.filter(x => x.isForSell == true);;
    });
  }

  getItemSize() {
    this.serItemSize.getAllItemSize().subscribe(data => {
      this.itemSizeList = data;
    });
  }


  getAllItemCategory() {
    this.serItemCategory.getAllItemCategories().subscribe(data => {
      this.itemCategoryList = data.filter(f => f.sellCategory == true && f.buyCategory == false);
    });
  }
  getAllItem() {
    this.itemService.All_Item().subscribe(data => {

      this.itemList = data.filter(x => x.isForSell == true);
      this.SerchList = data.filter(x => x.isForSell == true);
    });
  }

  All_ItemForCategory(catId: number) {
    this.itemService.All_ItemForCategory(catId).subscribe(data => {
      this.itemForCategoryList = data;
    })
  }

  messageCheck() {

  }

  InsertOrUpdateItem(type) {


    this.item.isDelete = false;
    this.item.isForSell = true;
    if (this.item.nameAR == ''|| this.item.itemCategoryId == 0 || this.item.unitId == 0) {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }

    if (this.item.nameEN == '' || this.item.nameEN == null || this.item.nameEN == undefined) {
      this.item.nameEN = this.item.nameAR;
    }

    else if (this.item.itemPrices.length == 0) {
      let msg = this.translate.get("Messages.ADDONEPRICE").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }

    else if (this.item.itemPrices.length > 1) {
      var chk = null;
      chk = this.item.itemPrices.find(f => f.isDefullt == true);
      if (chk == null || chk == undefined) {
        let msg = this.translate.get("Messages.ADDONEPRICE").subscribe(msg => {
          this.TosterService.ErrorToaster.next(msg);
        });
        return;
      }

      let chkIsDefullt = null;
      chkIsDefullt = this.item.itemPrices.filter(f => f.isDefullt == true);
      if (chkIsDefullt.length > 1) {
        let msg = this.translate.get("Messages.ITEMPRICECHECK").subscribe(msg => {
          this.TosterService.ErrorToaster.next(msg);
        });
        return;
      }

    }




    if (type == 'add') {

    var _item = this.itemList.find(f => f.nameAR == this.item.nameAR || f.nameEN == this.item.nameEN)
    if (_item) {

      let msg = this.translate.get("Messages.ITEMEXIST").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
      }
      if (this.item.itemPrices.length==0) {
        let msg = this.translate.get("Messages.ADDONEPRICE").subscribe(msg => {
          this.TosterService.ErrorToaster.next(msg);
        });
        return;
      }

      if (this.item.id != 0) {
        this.item.id = 0;
        if (this.item.itemPrices != null) { this.item.itemPrices.forEach(f => { f.id = 0;});}
        if (this.item.itemComponents != null) { this.item.itemComponents.forEach(f => {f.id = 0;});}
      }
    }




    if (this.imageSrc == "./-available.jpg") {
      this.item.imageName = "available.jpg";
      this.item.imagePath = "./-available.jpg";
    }

    if (this.changeImg) {
      this.uploadFile(this.fileNames);
      this.uplodeService.uploadFileItem(this.formData).subscribe(data => {
        this.item.imagePath = './files/Item/' + data;
        this.item.imageName = data.toString();
        this.itemService.InsertOrUpdateItem(this.item).subscribe(data => {
          this.getItemPriceByItemId(data.id);
          this.formData = new FormData();
          //this.getItemsPagginated();
          if (this.item.id === 0) {
            this.itemList.push(data)

            let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => { this.TosterService.SucssesToaster.next(msg); });
            this.clear();
            this.clearimg();
          }
          else {
            var itemIndex = this.itemList.findIndex(f => f.id == data.id);
            this.itemList[itemIndex] = data;
            let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
              this.TosterService.SucssesToaster.next(msg);
              this.changeImg = false;
            });
          }
        });

      })
    }
    else if (!this.changeImg) {

      this.itemService.InsertOrUpdateItem(this.item).subscribe(data => {
        this.getItemPriceByItemId(data.id);
        this.formData = new FormData();

        //this.getItemsPagginated();
        if (this.item.id === 0) {
          this.itemList.push(data)
          this.filterItemList = this.itemList;
          let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => { this.TosterService.SucssesToaster.next(msg); });
          this.clear();
          this.clearimg();
        }
        else {
          var itemIndex = this.itemList.findIndex(f => f.id == data.id);
          this.itemList[itemIndex] = data;
          let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
            this.TosterService.SucssesToaster.next(msg);
            this.changeImg = false;
          });
        }

      });
    }
  }


  //delete(itemId: number) {

  //  if (confirm("هل تريد تأكيد الحذف ؟")) {
  //    this.itemService.Delete_Item(itemId).subscribe(data => {

  //      var itemindex = this.filterItemList.findIndex(x => x.id == itemId, 0);
  //      this.filterItemList.splice(itemindex, 1);

  //      this.getItemsPagginated();
  //      this.clear();
  //    });
  //  }

  //  let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
  //    this.TosterService.SucssesToaster.next(msg);
  //  });

  //}
  getById(item: Item) {
    this.item = new Item();

    this.itemService.getItemById(item.id).subscribe(data => {
      this.item = data;
      this.itemPriceList = data.itemPrices;
      this.imageSrc = data.imagePath;
      this.ImageName = data.imageName;
      this.isnew = false;
      this.itemService.ItemObject = data;
    })



  }
  clear() {
    this.item = new Item();
    this.item.itemCategoryId = 1;
    this.item.unitId = 1;
    this.getVatTax();
    this.imageSrc = "./-available.jpg";
    this.ImageName = null;
    this.fileNames = null;
    this.changeImg = false;

    this.isnew = true;
    this.getItemSize();
    this.getValueFromTaxesList();
    ItemPriceComponent.prototype.itemPrice = new ItemPrice();
    this.TosterService.ItemPriceSubject.next(ItemPrice)
  }


  //Clear

  clearimg() {
    this.imageSrc = "./-available.jpg";
    this.ImageName = null;
    this.changeImg = false;

  }



  uploadFile(files) {
    for (let file of files) {
      this.formData.append('file', file);
      this.ImageName = file.name;
    }
    return this.formData;
  }


  getSelectedOptionPrint(event) {
    //this.itemCategory.id = event;
  }
  //Read url Img
  detectFiles(Files) {
    this.changeImg = true;
    this.fileNames = Files;
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }
  //Serch items

  SerchItem(name) {

    if (name == null) {
      this.SerchList = this.itemList;
    }
    else {
      this.filterItemList = this.itemList.filter(f => f.nameAR.toLowerCase().includes(name.toLowerCase()));
    }
  }




  closePrintermodal() {
    this.getAllItemCategory();
    this.getUnits();
    //refresh printer list on close modal
    this.modalRef.hide();
  }


  openPricesModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-dialog modal-dialog-centered modal-lg' })
    );

    this.modalService.onHide.subscribe(e => {
      this.getAllItemCategory();

    });
  }



  deleteItemConfirm() {
    this.modalRef.hide();
    this.deleteitem()
  }

  itemId = 0;
  deleteItem(template: TemplateRef<any>, item: Item) {
    this.itemId = item.id
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
  }

  deleteitem() {
    this.itemService.Delete_Item(this.itemId).subscribe(data => {
      this.getItemsPagginated();
      this.clear();
      let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
    });
  }

  categoryGroupList = [];
  filterListByCategory() {
    this.itemCategoryList.forEach(g => {
      var _listItem = this.itemList.filter(f => f.itemCategoryId == g.id);
      this.categoryGroupList.push({
        name: g.nameAR,
        value: _listItem
      });
    })
  }

}
