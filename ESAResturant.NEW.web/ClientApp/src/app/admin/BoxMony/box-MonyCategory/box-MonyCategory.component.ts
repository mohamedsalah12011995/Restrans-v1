import { Component, OnInit } from '@angular/core';
//import { startWith, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BoxMonyCategory } from '../Models/boxMonyCategory';
import { boxMonyCategoryService } from '../boxMonyCategory.service';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';

@Component({
  selector: 'app-box-MonyCategory',
  templateUrl: './box-MonyCategory.component.html',
  styleUrls: ['./box-MonyCategory.component.css'],

})
export class BoxMonyCategoryComponent implements OnInit {

  boxMonyCategory: BoxMonyCategory;
  boxMonyCategoryList: BoxMonyCategory[]
  isShow: boolean;

  constructor(private boxCategoreService: boxMonyCategoryService, public TosterService: ToastWrapperService) {
    this.boxMonyCategory = new BoxMonyCategory();
    this.isShow = true;
  }

  ngOnInit() {
    this.getAllBoxMonyCategory();
  }


  getBoxMonyCategory(category: BoxMonyCategory) {
    this.boxMonyCategory = new BoxMonyCategory();
    this.boxMonyCategory = category;
    this.isShow = false;
  }

  Clear() {
    this.boxMonyCategory = new BoxMonyCategory();
    this.isShow = true;
  }



  getAllBoxMonyCategory() {
    this.boxCategoreService.getBoxMonyCategory().subscribe(data => this.boxMonyCategoryList = data);
  }

  insertOrEditOrDelete(boxMonyCategory: BoxMonyCategory,type) {

    if (type == 'add') {
      this.boxMonyCategory.isDelete = false;
      this.boxCategoreService.insertOrUpdateBoxMonyCategory(boxMonyCategory).subscribe(data => {
        this.getAllBoxMonyCategory();
      });
      this.TosterService.SucssesToaster.next('تم الاضافة بنجاح');
      this.Clear();
      return;
    }

    if (type == 'edit') {
      this.boxMonyCategory.isDelete = false;
      this.boxCategoreService.insertOrUpdateBoxMonyCategory(boxMonyCategory).subscribe(data => {
        this.getAllBoxMonyCategory();
      });
      this.TosterService.SucssesToaster.next('تم التعديل بنجاح');
      return;
    }

    if (type == 'delete') {
      if (confirm("هل تريد تأكيد الحذف ؟")) {

        boxMonyCategory.isDelete = true;
        this.boxCategoreService.insertOrUpdateBoxMonyCategory(boxMonyCategory).subscribe(data => {
          this.getAllBoxMonyCategory();
        });
        this.TosterService.SucssesToaster.next('تم الحذف بنجاح');
        this.Clear();
        return;
      }
    }
  }

}
