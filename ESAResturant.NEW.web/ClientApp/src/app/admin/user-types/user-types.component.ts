import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserType } from '../setting/Models/UserType';
import { UserTypesService } from '../setting/user-types.service';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';
import { RoleViewModel } from '../user-managment/Models/RoleViewModel';
import { UsersService } from 'src/app/users/users.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap';


@Component({
  selector: 'app-user-types',
  templateUrl: './user-types.component.html',
  styleUrls: ['./user-types.component.css']
})
export class UserTypesComponent implements OnInit {

  
  userType: UserType;
  isDisplay: boolean;
  currentLang: string = "";
  pageTitle: string = "";

  public rolesLookup: RoleViewModel[] = new Array();

  UserTypesList: UserType[] = [];
  dafaultSelectedRoles: string[] = [];
  modalRef: BsModalRef;

  


  constructor(private userTypeservice: UserTypesService, public TosterService: ToastWrapperService, private userservice: UsersService
    , private titleService: Title, private _location: Location, public translate: TranslateService, private modalService: BsModalService) {
    this.userType = new UserType();
    this.currentLang = translate.currentLang;

  }

  ngOnInit() {
    this.getAllUserTypes();
    this.rolesLookup = this.userservice.rolesLookup;

  }

  navigateBack() {
    this._location.back();
  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "انواع المستخدمين";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "User Type";
      this.titleService.setTitle(this.pageTitle);
    }
  }

  



  getAllUserTypes() {
    this.userTypeservice.getAllUserTypes().subscribe(data => {
      this.UserTypesList = data;
    });
  }


  save(type) {



    if (this.userType.nameAR === '' || this.userType.nameEN === '') {
      this.TosterService.ErrorToaster.next(" من فضلك اكمل البيانات ");
      return;
    }

    else {

      this.userType.defaultRoles = this.dafaultSelectedRoles.join(','); 

      this.userTypeservice.InsertOrUpdateUserTypes(this.userType).subscribe(data => { this.getAllUserTypes(); })
      if (type == 'add') {
        this.TosterService.SucssesToaster.next("تم الاضافة بنجاح");
        this.clear();
      }

      if (type == 'edit') {
        this.TosterService.SucssesToaster.next("تم التعديل بنجاح");
      }
    }

  }




  deleteUserTypes(UserTypes: UserType) {
    if (confirm("هل تريد تأكيد الحذف ؟")) {
      this.userTypeservice.deleteUserTypes(UserTypes.id).subscribe(data => {
        this.getAllUserTypes();
        this.clear();
        this.TosterService.SucssesToaster.next("تم الحذف بنجاح");
      });
    }
  }

  getById(UserTypes: UserType) {
    this.userType = UserTypes;
    this.isDisplay = false;
    this.dafaultSelectedRoles = [];
    this.dafaultSelectedRoles = this.userType.defaultRoles.split(',');
  }

  clear() {
    this.userType = new UserType();
    this.isDisplay = true;
    this.dafaultSelectedRoles = [];
  }

  deleteUserTypeConfirm() {
    this.modalRef.hide();
    this.deleteUserType(this.userType)
  }


  deleteUserAsk(template: TemplateRef<any>, userType: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.userType = userType;
  }

  deleteUserType(userType: UserType) {
    this.userTypeservice.deleteUserTypes(userType.id).subscribe(data => {
      this.getAllUserTypes();
      this.clear();
      let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
    });

  }



}
