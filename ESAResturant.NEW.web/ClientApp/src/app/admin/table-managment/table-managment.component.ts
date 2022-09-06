import { Component, OnInit, TemplateRef } from '@angular/core';
import { TablesPlaces } from '../tables/Models/TablesPlaces';
import { TablesService } from '../tables/tables.service';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { AuthService } from '../../Shared/Services/auth.service';


@Component({
  selector: 'app-table-managment',
  templateUrl: './table-managment.component.html',
  styleUrls: ['./table-managment.component.css'],
  providers: [TablesService]
})
export class TableManagmentComponent implements OnInit {
  tablePlace: TablesPlaces
  tablePlaceList: TablesPlaces[] = [];
  modalRef: BsModalRef;
  currentLang: string = '';
  pageTitle: string = "";

  constructor(private tableService: TablesService, private modalService: BsModalService, public TosterService: ToastWrapperService,
    private titleService: Title, private _location: Location, public authService: AuthService, public translate: TranslateService) {
    this.tablePlace = new TablesPlaces();
    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);

  }

  ngOnInit() {
    this.getTablesPlaces();
  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "ادارة الطولات";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Table Managment";
      this.titleService.setTitle(this.pageTitle);
    }
  }
  navigateBack() {
    this._location.back();
  }

  

  insertOrEditTable(type) {
    for (var i = 0; i < this.tablePlaceList.length; i++) {
      if (type=='add'&& this.tablePlaceList[i].startNum === this.tablePlace.startNum) {
        this.TosterService.ErrorToaster.next('عفوا لايوجد بالفعل طاولات تبدأ من ' + this.tablePlace.startNum);
        return;
      }
    }
    this.tableService.insertOrUpdateTablesPlaces(this.tablePlace, type).subscribe(data => {
      if (type == 'add') {
        this.TosterService.SucssesToaster.next('تم حفظ  بنجاح');
        this.clear();
      }
      else if (type == 'edit') {
        this.TosterService.SucssesToaster.next('تم التعديل  بنجاح');
      }
      this.getTablesPlaces();
    })
  }

  getTablesPlaces() {
    this.tableService.getTablesPlaces().subscribe(data => {

      this.tablePlaceList = data
    })
  }
  deleteTablesPlace(id) {
    this.tableService.deleteTable(id).subscribe(data => { this.getTablesPlaces();this.clear(); });
  }
  selectRow(table) {
    this.tablePlace = new TablesPlaces();
    this.tablePlace = table;
  }

  clear() {
    this.tablePlace = new TablesPlaces();
  }

  deleteTableConfirm() {
    this.modalRef.hide();
    this.deleteTablesPlace(this.tablePlace.id);
  }


  deleteTable(template: TemplateRef<any>, table: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.tablePlace = table;
  }
  sumCountForstartNum() {
    this.tablePlace.endNum = this.tablePlace.count + this.tablePlace.startNum-1;
  }
}

