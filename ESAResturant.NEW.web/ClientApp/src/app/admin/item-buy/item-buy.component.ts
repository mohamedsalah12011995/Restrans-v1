import { Component, OnInit, TemplateRef } from '@angular/core';
import { ItemsService } from '../item/items.service';
import { ItemCategoryService } from '../item/item-category/item-category.service';
import { ItemSizeService } from '../item/item-size/item-Size.service';
import { ItemPriceService } from '../item/item-price/item-price.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '../date.adapter';
import { DateAdapter, MAT_DATE_FORMATS, PageEvent } from '@angular/material';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ToastWrapperService } from '../Shared/toast-wrapper.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Item } from '../item/Models/Item';
import { environment } from '../../../environments/environment';
import { ItemCategory } from '../item/Models/ItemCategory';
import { ItemPrice } from '../item/Models/itemPrice';
import { ItemSize } from '../item/Models/ItemSize';
import { Unit } from '../item/Models/Unit';
import { UnitService } from '../item/Unit/Unit.service';
import { PagginatedTableVM } from 'src/app/Shared/classes/pagginated.table.viewmodel';
import { HomeService } from '../home.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-item-buy',
  templateUrl: './item-buy.component.html',
  styleUrls: ['./item-buy.component.css'],
  providers: [ItemsService, ItemCategoryService, ItemSizeService, ItemPriceService, UnitService, HomeService, {
    provide: DateAdapter, useClass: AppDateAdapter
  },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]

})
export class ItemBuyComponent implements OnInit {

  /** Item ctor */
  private BaseItemrUrl: string = environment.baseUrl + 'api/Upload/';

  itemList: Item[];
  itemCategoryList: ItemCategory[] = [];
  SerchList: any = [];
  itemForCategoryList: Item[];
  unitList: Unit[];

  itemCategory: ItemCategory;
  item: Item;
  selectedFiles: FileList;
  selectedputh: any;
  ImageName: string;

  exampleParent: any;
  itemPrice: ItemPrice;
  // Data Table
  //displayedColumns = ['n', 'sizeNameAr', 'sizeNameEn', 'price'];
  // dataSource = ELEMENT_DATA;
  itemPriceList: any;
  itemSizeList: ItemSize[];
  // displayedColumns: string[] = ['N', 'sizeNameAr', 'sizeNameEN', 'price'];
  //dataSource = this.itemPriceList;

  //userForm: FormGroup;
  imageSrc: any;
  formData: any;
  fileNames: any;

  isnew: boolean;

  modalRef: BsModalRef;
  itemPagginatedTableVM: PagginatedTableVM;
  filterditemVM: Item = new Item();

  currentLang: string = '';
  pageTitle: string = "";

  countItems: number = 0;

  pageEvent: PageEvent;
  constructor(public TosterService: ToastWrapperService, private itemService: ItemsService, private serItemCategory: ItemCategoryService,
    private serItemSize: ItemSizeService, private serItemPrice: ItemPriceService, private http: HttpClient, private modalService: BsModalService,
    private unitServ: UnitService, private _location: Location, private homeServe: HomeService, private titleService: Title, public authService: AuthService, public translate: TranslateService)
  {


    this.item = new Item();
    this.item.code = this.makeitemCode(6);

    this.clearimg();
    this.SerchList = this.itemList;
    this.itemPagginatedTableVM = new PagginatedTableVM();


    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);

    this.isnew = true;
    this.getUnits();

  }
  pageSizeOptions: number[] = [5, 10, 25, 100];

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  ngOnInit() {

    //HeaderComponent.prototype.ToggleSidebar('close');
    //this.currentLang = this.authService.CurrentLang;

    this.itemPagginatedTableVM.currentPage = 0;
    this.getItemsPagginated();

    this.getAllItemCategory();
    //this.getAllItem();

    this.itemService.PriceListUpdated.subscribe((pricelist: ItemPrice[]) => {
      this.TosterService.SucssesToaster.next("تم اضافة الاسعار بنجاح");
      this.item.itemPrices = pricelist;
      // this.modalRef.hide();

    });
    this.getItemSize();
    //this.getItemByInvoise();

    this.homeServe.displayNamePages();
  }




  navigateBack() {
    this._location.back();
  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "أصناف البيع";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Item Sell";
      this.titleService.setTitle(this.pageTitle);
    }
  }


  getUnits() {
    this.unitServ.getAllUnit().subscribe(data => {
      this.unitList = data.filter(x => x.isForBuy == true);
    });
  }


  getItemPriceByItemId(id) {
    this.serItemPrice.getItemPriceByItemId(id).subscribe(data => this.itemPriceList = data);
  }

  getItemByInvoise() {
    this.itemService.GetItemsByInvoise().subscribe(data => {  });
  }

  getItemSize() {
    this.serItemSize.getAllItemSize().subscribe(data => {
      this.itemSizeList = data;
    });
  }


  getAllItemCategory() {
    this.serItemCategory.getAllItemCategories().subscribe(data => {
      this.itemCategoryList = data.filter(f => f.buyCategory == true);
      //this.itemCategoryList = data.filter(f => f.sellCategory =! true);
    })
  ;
  }
  getAllItem() {
    //this.itemService.All_Item().subscribe(data => {
    //  this.itemList = data.filter(X => X.isForSell == false);
    //  console.log(this.itemList);
    //  this.SerchList = data.filter(X => X.isForSell == false);
      //data.forEach(item => {
      //  this.itemService.pushItemPrice.next(item.itemPrices);
      //})
   // });
  }

  All_ItemForCategory(catId: number) {
    this.itemService.All_ItemForCategory(catId).subscribe(data => {
      this.itemForCategoryList = data;
    })
  }

  InsertOrUpdateItem(type) {

    this.item.isForSell = false;
    this.item.isDelete = false;
    if (this.item.nameAR == '' || this.item.nameEN == '') {
      this.TosterService.ErrorToaster.next("   من فضلك اكمل البيانات ");
      return;
    }

    else if (this.item.itemCategoryId == 0) {
      this.TosterService.ErrorToaster.next("   من فضلك اختر الفئة ");
      return;
    }

    //else if (this.item.itemPrices.length == 0) {
    //  this.TosterService.ErrorToaster.next("   من فضلك اضف سعر واحد على الاقل ");
    //  return;
    //}

    if (type === 'add') {
      if (this.imageSrc == "./files/img/-available.jpg") {
        this.item.imageName = "available.jpg";
        this.item.imagePath = "./files/img/-available.jpg";
      }
      else if (this.imageSrc != null) {
        this.item.imagePath = this.uploadFile(this.fileNames);
        this.item.imageName = this.ImageName;

      }

      this.item.itemPrices = this.itemService.ListItemPrice;
      this.itemService.InsertOrUpdateItem(this.item).subscribe(data => {
        this.getItemsPagginated();
        //this.getItemPriceByItemId(data.id);
      });
      this.TosterService.SucssesToaster.next("   تم الحفظ بنجاح ");
      this.clear();
      this.clearimg();
    }


    if (type === 'edit') {
      if (this.imageSrc != this.item.imagePath) {
        this.item.imagePath = this.uploadFile(this.fileNames);
        this.item.imageName = this.ImageName;
      }
      this.item.itemPrices = this.itemService.ListItemPrice;
      this.itemService.InsertOrUpdateItem(this.item).subscribe(data => {
        this.getItemsPagginated();
        this.getItemPriceByItemId(data.id);
      });
      this.TosterService.SucssesToaster.next("   تم التعديل  بنجاح ");
    }

  }

  //edit() {


  //  if (this.item.nameAR == '' || this.item.nameEN == '') {
  //    this.TosterService.ErrorToaster.next("   من فضلك اكمل البيانات ");

  //    return;
  //  }

  //  else if (this.item.itemCategoryId == 0) {
  //    this.TosterService.ErrorToaster.next("   من فضلك اختر الفئة ");
  //    return;
  //  }
  //  else if (this.item.itemPrices.length == 0) {
  //    this.TosterService.ErrorToaster.next("   من فضلك اضف سعر واحد على الاقل ");
  //    return;
  //  }

  //  if (this.imageSrc != this.item.imagePath) {
  //    this.item.imagePath = this.uploadFile(this.fileNames);
  //    this.item.imageName = this.ImageName;
  //    this.itemService.InsertOrUpdateItem(this.item).subscribe(data => { this.getAllItem() });
  //  }
  //  else {
  //    this.itemService.InsertOrUpdateItem(this.item).subscribe(data => { this.getAllItem() });
  //  }
  // this.TosterService.SucssesToaster.next("   تم التعديل  بنجاح ");
  //}

  delete(itemId: number) {

    if (confirm("هل تريد تأكيد الحذف ؟")) {
      this.itemService.Delete_Item(itemId).subscribe(data => { this.getAllItem() });
    }
    this.TosterService.SucssesToaster.next("   تم الحذف  ");
  }
  getById(item: Item) {
    this.item = new Item();
    this.item = item;
    this.imageSrc = item.imagePath;
    this.isnew = false;
    this.itemService.ItemObject = item;
  }
  clear() {
    this.item = new Item();
    this.item.code = this.makeitemCode(6);
    this.imageSrc = "./files/img/-available.jpg";
    this.ImageName = null;
    this.isnew = true;
    //this.getItemSize();
    //this.getAllItemCategory();

  }


  //Clear

  clearimg() {
    this.imageSrc = "./files/img/-available.jpg";
    this.ImageName = null;
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
    this.filterditemVM.isForSell = false;
    this.itemService.getItemsPaginated(this.itemPagginatedTableVM.currentPage, this.itemPagginatedTableVM.itemsPerPage, this.itemPagginatedTableVM.sortKey, this.itemPagginatedTableVM.sortOrderBY, this.filterditemVM,'isBuy').subscribe(
      pageddata => {
        this.itemList = pageddata.items;
        this.countItems = this.itemList.length;

        this.itemPagginatedTableVM.totalCount = pageddata.totalCount;
        this.itemPagginatedTableVM.calculateShowingNo();
        this.SerchList = this.itemList.filter(x => x.isForSell == false);

      },
      error => { });


  }


  ////uplode Photo 
  uploadFile(files) {
    const formData = new FormData();
    for (let file of files) {
      formData.append(file.name, file);
      this.ImageName = file.name;
    }
    let url = this.BaseItemrUrl + "UploadFile_Item";

    const uploadReq = new HttpRequest('POST', url, formData, {
      reportProgress: true,
    });
    this.http.request(uploadReq).subscribe(event => { });
    return './files/img/' + this.ImageName;
  }

  //Event


  getSelectedOptionPrint(event) {
    this.itemCategory.id = event;
  }
  //Read url Img
  detectFiles(Files) {
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

  Serchitem(name) {

    if (name == null) {
      this.SerchList = this.itemList;
    }
    else {
      this.SerchList = this.itemList.filter(f => f.nameAR.toLowerCase().includes(name.toLowerCase()));
    }
  }

  makeitemCode(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
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


}
