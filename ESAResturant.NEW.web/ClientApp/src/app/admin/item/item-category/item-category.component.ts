import { Component, TemplateRef } from '@angular/core';
import { ItemCategoryService } from './item-category.service';
import { ItemCategory } from '../Models/ItemCategory';
import { PrinterService } from '../printer/printer.service';
import { Printer } from '../Models/Printer';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { ItemsService } from '../items.service';
import { UplodeFileService } from '../../../Shared/uplodeFile.service';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css'],
  providers: [ItemCategoryService, PrinterService, ItemsService]
})
/** ItemCategory component*/
export class ItemCategoryComponent {
  /** ItemCategory ctor */
  listItemCategory: ItemCategory[];
  itemCategory: ItemCategory;
  listPrinter: Printer[];
  modalRef: BsModalRef;

  // Data Table
  displayedColumns = ['position', 'name', 'print', 'edit', 'delete'];
  dataSource = this.listItemCategory;
  isShow: boolean = false;
  selectedFiles: FileList;
  ImageName: string;
  imageSrc: any;
  formData: FormData = new FormData();
  fileNames: any;
  private BaseItemrUrl: string = environment.baseUrl + 'api/Upload/';

  currentLang: string = "";
  changeImg: boolean = false;

  constructor(private Serv_category: ItemCategoryService, private serv_printer: PrinterService, private modalService: BsModalService, private itemService: ItemsService
    , public TosterService: ToastWrapperService, private uplodeService: UplodeFileService, private titleService: Title, public translate: TranslateService) {


    this.currentLang = translate.currentLang;
    // this.changeTitle(this.currentLang);

    this.itemCategory = new ItemCategory();
    this.listPrinter = [];
    this.isShow = true;


  }
  ngOnInit() {
    this.getAll_Categories();
    this.getAllPrinter();
    this.clearimg();

  }


  getValuePrinter(id: number) {
    this.itemCategory.printerId = id;
  }

  getAllPrinter() {
    this.serv_printer.All_Print().subscribe(data => this.listPrinter = data);
  }
  getAll_Categories() {
    this.Serv_category.getAllItemCategories().subscribe(data => {
      this.listItemCategory = data
      this.dataSource = this.listItemCategory;
    });
  }
  clear() {
    this.isShow = true;
    this.itemCategory = new ItemCategory();
    this.clearimg();
    this.changeImg = false;
  }

  InsertOrUpdateItem(itemCategory: ItemCategory) {
    itemCategory.isDelete = false;
    if (itemCategory.nameAR == '') {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }
    if (this.imageSrc == "./-available.jpg") { itemCategory.image = "./-available.jpg"; }
    if (this.changeImg) {
      this.uploadFile(this.fileNames);
      this.uplodeService.uploadFileCategory(this.formData).subscribe(data => {
        itemCategory.image = './files/Category/' + data.toString();
        this.Serv_category.InsertOrUpdateItemCategory(itemCategory).subscribe(data => {
          this.getAll_Categories();
          this.formData = new FormData();

          if (itemCategory.id === 0) {
            let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => { this.TosterService.SucssesToaster.next(msg); });
            this.clear();
          }
          else {
            let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
              this.TosterService.SucssesToaster.next(msg);
              this.changeImg = false;
            });
          }

        });
      })
    }

    else if (!this.changeImg) {
      this.Serv_category.InsertOrUpdateItemCategory(itemCategory).subscribe(data => {
        this.getAll_Categories();
        this.formData = new FormData();
      });

      if (itemCategory.id === 0) {
        let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => { this.TosterService.SucssesToaster.next(msg); });
        this.clear();
      }
      else {
        let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
          this.changeImg = false;
        });
      }
    }
  }



  getItemCategoryById(itemCategory: ItemCategory) {
    this.itemCategory = new ItemCategory();
    this.itemCategory = itemCategory;
    this.isShow = false;
    this.imageSrc = itemCategory.image;
    if (itemCategory.nameEN == '' || null) {
      itemCategory.nameEN = itemCategory.nameAR;
    }
  }

  closePrintermodal() {
    this.getAllPrinter(); //refresh printer list on close modal 
    this.modalRef.hide();
  }



  openPricesModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, {
        class: 'modal-dialog modal-dialog-centered modal-lg', keyboard: true
      }));

    this.modalService.onHide.subscribe(e => {
      this.getAllPrinter(); //refresh printer list on close modal 
      this.getAll_Categories()

    });
  }

  //Clear
  clearimg() {
    this.imageSrc = "./-available.jpg";
    this.ImageName = null;
    this.changeImg = false;
  }

  ////uplode Photo 
  uploadFile(files) {
    for (let file of files) {
      this.formData.append('file', file);
      this.ImageName = file.name;
    }
    return this.formData;
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


  deleteItemCategoryConfirm() {
    this.modalRef.hide();
    this.delete_Category(this.itemCategory);
  }


  deleteItemCategory(template: TemplateRef<any>, itemCategory: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.itemCategory = itemCategory;
  }

  delete_Category(itemCategory: ItemCategory) {
    this.itemCategory = itemCategory;
    this.Serv_category.deleteItemCategory(itemCategory.id).subscribe(data => {
      this.getAll_Categories();
      this.clear();
      let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
    })
  }

}
