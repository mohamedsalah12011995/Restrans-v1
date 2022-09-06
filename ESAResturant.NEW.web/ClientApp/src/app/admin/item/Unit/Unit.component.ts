import { Component, Input } from '@angular/core';
import { Unit } from '../Models/Unit';
import { Item } from '../Models/item';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { UnitService } from './Unit.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-Unit',
    templateUrl: './Unit.component.html',
  styleUrls: ['./Unit.component.css'],
  providers: [UnitService]
})
/** Unit component*/
export class UnitComponent
{
  /** Unit ctor */
  item: Item
  @Input()
  UnitList: Unit[];
  Unit: Unit
  isShow: boolean;
  hh: any;

  currentLang: string = "";

  constructor(public TosterService: ToastWrapperService, private serUnit: UnitService, private titleService: Title, public translate: TranslateService) {


    this.currentLang = translate.currentLang;
    this.Unit = new Unit();
    this.isShow = true;
  }

  ngOnInit() {
    this.getUnit();
  }



  getUnit() {
    this.serUnit.getAllUnit().subscribe(data => {
      this.UnitList = data
      console.log(data);
    });
  }

  InsertOrUpdateUnit(type) {
    if (this.Unit.nameAr === '') {
      this.TosterService.ErrorToaster.next("من فضلك ادخل الحجم ");
      return;
    }
    if (type === 'add') {
      for (var i = 0; i < this.UnitList.length; i++) {
        if (this.Unit.nameAr == this.UnitList[i].nameAr) {
          this.TosterService.ErrorToaster.next("الحجم موجود بالفعل !");
          return;
        }
      }
    }

    this.serUnit.InsertOrUpdateUnit(this.Unit).subscribe(data => { this.getUnit() });

    if (type === 'add') {
      this.TosterService.SucssesToaster.next("تم الاضافة");
      this.clear();
      return;
    }
    if (type === 'edit') {
      this.TosterService.SucssesToaster.next("تم التعديل");
      return;
    }
  }


  deleteUnit(Unit: Unit) {
    if (confirm("هل تريد تأكيد الحذف ؟")) {
      this.serUnit.deleteUnit(Unit.id).subscribe(data => {
        this.getUnit();
        this.TosterService.SucssesToaster.next("تم الحذف");
        this.clear();
        return;
      })
    }
  }

  getById(unit: Unit) {
    this.Unit = new Unit();
    this.Unit = unit;
    console.log(unit);
    this.isShow = false;

    if (unit.nameEn == '' || null) {
      unit.nameEn = unit.nameAr;
    }
  }

  clear() {
    this.Unit = new Unit();
    this.isShow = true;
  }
}
