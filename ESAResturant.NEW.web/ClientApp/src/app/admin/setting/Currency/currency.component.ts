import { Component, Input, TemplateRef, NgModule } from '@angular/core';
import { setiingCurrency } from './setiingCurrency.service';
import { Currencies } from '../Models/Currencies';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { HomeService } from '../../home.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { AuthService } from '../../../Shared/Services/auth.service';

@Component({
  selector: 'app-Currency',
  templateUrl: './Currency.component.html',
  styleUrls: ['./Currency.component.css'],
  providers: [setiingCurrency, HomeService]
})
export class CurrencyComponent
{
  /** currency ctor */
  currencyList: Currencies[];
  currency: Currencies;
  isDisplay: boolean;
  modalRef: BsModalRef;
  present: string = '';
  displayedColumns = ['position', 'nameAr', 'nameEn', 'PercentValue', 'edit', 'delete'];
  currentLang: string = "";
  pageTitle: string = "";

  constructor(public TosterService: ToastWrapperService, private _location: Location, private sercurrency: setiingCurrency, private modalService: BsModalService,
    public authService: AuthService,private homeServe: HomeService, private titleService: Title, public translate: TranslateService) {
    this.currency = new Currencies();
    this.isDisplay = true;
    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);
  }

  ngOnInit() {
    this.getAllcurrency();
    this.homeServe.displayNamePages();
  }

  navigateBack() {
    this._location.back();
  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "العملات";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "currency";
      this.titleService.setTitle(this.pageTitle);
    }
  }

 
  getpresent(p) {
    if (p == 'نسبة') {
      this.present = '%';
    }
    else {
      this.present = '';
    }
  }

  getAllcurrency() {
    this.sercurrency.getAllCurrency().subscribe(data => {
      this.currencyList = data;
    });
  }


  save() {
    var chk = this.currencyList.filter(f => f.isDefault == true)
    if (chk.length == 1 && this.currency.isDefault == true) {
      this.TosterService.ErrorToaster.next(" عفوا لايمكن الاضافة يوجد بالفعل عملة افتراضى ");
      this.currency.isDefault = false;
      return;
    }

    if (this.currency.nameAr === '' || this.currency.nameEn === '') {
      this.TosterService.ErrorToaster.next(" من فضلك اكمل البيانات ");
      return;
    }

    else {
      this.sercurrency.InsertOrUpdateCurrency(this.currency).subscribe(data => { this.getAllcurrency(); })
      this.TosterService.SucssesToaster.next("تم الاضافة بنجاح");
      this.clear();
    }

  }



  edit(currency: Currencies) {
    var chk = this.currencyList.filter(f => f.isDefault == true)
    if (chk.length > 1) {
      this.TosterService.ErrorToaster.next(" عفوا لايمكن التعديل يوجد بالفعل عملة افتراضى ");
      this.currency.isDefault = false;
      return;
    }

    if (currency.nameAr == '' || currency.nameEn == '') {
      this.TosterService.ErrorToaster.next(" من فضلك اكمل البيانات ");
      return;
    }
    else {
      this.sercurrency.InsertOrUpdateCurrency(this.currency).subscribe(data => { this.getAllcurrency(); })
      this.TosterService.SucssesToaster.next("تم التعديل بنجاح !");
    }

  }

  deletecurrency(currency: Currencies) {
    if (confirm("هل تريد تأكيد الحذف ؟")) {
      this.sercurrency.deleteCurrency(currency.id).subscribe(data => {
        this.getAllcurrency();
        this.clear();
        this.TosterService.SucssesToaster.next("تم الحذف بنجاح");
      });
    }
  }

  getById(currency: Currencies) {
    this.currency = new Currencies;
    this.currency = currency;
    this.isDisplay = false;
  }

  clear() {
    this.currency = new Currencies();
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
    this.getAllcurrency();

    //refresh ItemSize list on close modal
    this.modalRef.hide();
  }
  openComponentItemModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-dialog modal-dialog-centered modal-lg' })
    );

    this.modalService.onHide.subscribe(e => { });
  }


  deleteCurrenyConfirm() {
    this.modalRef.hide();
    this.deletecurreny(this.currency)
  }


  deleteCurreny(template: TemplateRef<any>, curreny: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.currency = curreny;
  }

  deletecurreny(curreny: Currencies) {
    this.sercurrency.deleteCurrency(curreny.id).subscribe(data => {
      this.getAllcurrency();
      this.clear();
      let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
    });
  }

}
