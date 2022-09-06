import { Component, Input, TemplateRef } from '@angular/core';
import { TaxesService } from './Taxes.service';
import { Taxes } from '../Models/Taxes';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DiscountType } from '../Models/DiscountType';
import { SettingesService } from '../setting.service';
import { HeaderComponent } from '../../Shared/Components/header/header.component';
import { HomeService } from '../../home.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { AuthService } from '../../../Shared/Services/auth.service';

@Component({
  selector: 'app-Taxes',
  templateUrl: './Taxes.component.html',
  styleUrls: ['./Taxes.component.css'],
  providers: [TaxesService, SettingesService, HomeService]
})
/** Taxes component*/
export class TaxesComponent
{
  /** Taxes ctor */
  TaxesList: Taxes[];
  listDiscountType: DiscountType[];
  taxes: Taxes;
  isDisplay: boolean;
  modalRef: BsModalRef;
  displayedColumns = ['position', 'nameAr', 'nameEn', 'PercentValue', 'edit', 'delete'];
  currentLang: string = "";
  pageTitle: string = "";

  constructor(public TosterService: ToastWrapperService, private serTaxes: TaxesService, private modalService: BsModalService,
    private settServe: SettingesService, private _location: Location, public authService: AuthService, private titleService: Title, public translate: TranslateService) {
    this.taxes = new Taxes();
    this.isDisplay = true;
    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);
  }

  ngOnInit() {
    this.getAllTaxes();
    this.getAllDiscountType();
  }

  navigateBack() {
    this._location.back();
  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "الضرائب";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Taxes";
      this.titleService.setTitle(this.pageTitle);
    }
  }

 

  getAllDiscountType() {
    this.settServe.getAllDiscountType().subscribe(data => {
      this.listDiscountType = data;
    }
    );
  }

  getAllTaxes() {
    this.serTaxes.getAllTaxes().subscribe(data => {
      this.TaxesList = data;
      //this.taxes.discountId = data[0].id;
    });
  }


  save(type) {
    if (this.taxes.nameAr === '' || this.taxes.nameEn === '') {
      this.TosterService.ErrorToaster.next(" من فضلك اكمل البيانات ");
      return;
    }

    else {

      this.serTaxes.InsertOrUpdateTaxes(this.taxes).subscribe(data => { this.getAllTaxes(); })
      if (type == 'add') {
        let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
        });
        this.clear();
      }

      if (type == 'edit') {
        let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
        });
      }
    }

  }






  getById(Taxes: Taxes) {
    this.taxes = Taxes;
    this.isDisplay = false;
  }

  clear() {
    this.taxes = new Taxes();
    this.isDisplay = true;
  }

  openSizeModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-dialog modal-dialog-centered modal-lg' })
    );

    this.modalService.onHide.subscribe(e => {
      //this.getItemSize();

    });
  }

  closeItemSizemodal() {
    this.getAllTaxes();

    //refresh ItemSize list on close modal
    this.modalRef.hide();
  }
  openComponentItemModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-dialog modal-dialog-centered modal-lg' })
    );

    this.modalService.onHide.subscribe(e => { });
  }

  deleteTaxConfirm() {
    this.modalRef.hide();
    this.deleteTaxes(this.taxes)
  }


  deleteTax(template: TemplateRef<any>, itemTax: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.taxes = itemTax;
  }

  deleteTaxes(Taxes: Taxes) {
    this.serTaxes.deleteTaxes(Taxes.id).subscribe(data => {
      this.getAllTaxes();
      this.clear();
      let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
    });
  }
}
