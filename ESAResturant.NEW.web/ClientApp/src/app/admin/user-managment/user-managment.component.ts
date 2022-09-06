import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';
import { Title } from '@angular/platform-browser';
import { UsersService } from 'src/app/users/users.service';
import { RoleViewModel } from './Models/RoleViewModel';
import { User } from 'src/app/users/Models/User';
import { UserTypesService } from '../setting/user-types.service';
import { UserType } from '../setting/Models/UserType';
import { PagginatedTableVM } from 'src/app/Shared/classes/pagginated.table.viewmodel';
import { PageEvent, MatOption, MatCheckboxChange } from '@angular/material';
import { ItemCategory } from '../item/Models/ItemCategory';
import { ItemCategoryService } from '../item/item-category/item-category.service';
import { ItemsService } from '../item/items.service';
import { BranchService } from '../setting/Branches/addbranch/BranchService.service';
import { Branch } from '../setting/Models/Branch';
import { PrinterService } from '../item/printer/printer.service';
import { Printer } from '../item/Models/Printer';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { boxMonyType } from '../BoxMony/Models/boxMonyType';
import { boxMonyTypeService } from '../BoxMony/boxMonyType.service';


@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css'],
  providers: [ItemsService, ItemCategoryService, BranchService, PrinterService, boxMonyTypeService]

})

export class UserManagmentComponent implements OnInit {

  errorMessage = '';
  user: User;
  isDisplay: boolean;
  modalRef: BsModalRef;

  public successMessage = 'Data has been successfully saved';
  public isenabledSavebtn: Boolean;
  public rolesLookup: RoleViewModel[] = new Array();

  public Selectedroles: string[] = [];
  public isNew: boolean = true;
  public userTypes: UserType[] = []; 
  itemPagginatedTableVM: PagginatedTableVM;
  filterditemVM: User = new User();

  public users: User[] = []; 
  pageSizeOptions: number[] = [5, 10, 25, 100];

  boxMonyTypeList: boxMonyType[] = [];
  pageEvent: PageEvent;
  isKitchen: boolean = false;
  itemCategoryList: ItemCategory[] = [];
  selecteditemCategoryList: any[] = [];
  selectediRolsList: any[] = [];
  branchList: Branch[] = [];
  printerList: Printer[] = [];

  currentLang: string = '';
  pageTitle: string = "";
  checkSave: number = 0;

  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute, public TosterService: ToastWrapperService,
     private userservice: UsersService, private userTypeservice: UserTypesService, private modalService: BsModalService,
    private serItemCategory: ItemCategoryService, private branchService: BranchService, private printerService: PrinterService,
    private titleService: Title, private _location: Location, public translate: TranslateService, private boxMonyTypeServe: boxMonyTypeService) {

    this.isenabledSavebtn = true;
    //this.rolesLookup = new RoleViewModel[]();
    this.user = new User();
    this.isDisplay = true;
    this.rolesLookup = this.userservice.rolesLookup;
    this.itemPagginatedTableVM = new PagginatedTableVM();

    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);

 }

  ngOnInit() {

    this.getAllUserTypes();
    this.getUserstList();
    this.getBranches();
    this.getPrinters();
    this.getBoxMonyType();


    this.Selectedroles = this.userservice.rolesLookup.map(v => {

      return v.roleName;
    });

    this.getAllItemCategory();
  }


  navigateBack() {
    this._location.back();
  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "ادارة المستخدمين";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "User Managment";
      this.titleService.setTitle(this.pageTitle);
    }
  }



 
  Pagginatedchanged(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.itemPagginatedTableVM.currentPage = pageEvent.pageIndex;
    this.itemPagginatedTableVM.itemsPerPage = pageEvent.pageSize;
    this.itemPagginatedTableVM.totalCount = pageEvent.length;
    this.getUserstList();
  }

  getBoxMonyType() {
    this.boxMonyTypeServe.getBoxMonyType().subscribe(data => {
      this.boxMonyTypeList = data;
      console.log(this.boxMonyTypeList);
    })
  }

  getBranches() {
    this.branchService.getAllBranches().subscribe(data => {
      this.branchList = data;
    })
  }
  getPrinters() {
    this.printerService.All_Print().subscribe(data => {
      this.printerList = data;
    })
  }


  getAllUserTypes() {
    this.userTypeservice.getAllUserTypes().subscribe(data => {
      this.userTypes = data;
     
      this.UserTypeChanged();

    });
  }

  getById(user: User) {
    this.isDisplay = false;
    this.user = new User();
    this.user = user;
    if (this.user.itemCategories == null || this.user.itemCategories == '') {
      
      this.selecteditemCategoryList = [];

    } else {
      this.selecteditemCategoryList = this.user.itemCategories.split(',').map(Number);;

    }
    
  }




  roleChecked(value: any, rolename: string) {

    //if (value.source.value == 'KitchenScreen') {

    //  if (value.source.selected == true) {
    //    this.isKitchen = true;
    //  }
    //  else { this.isKitchen = false;      }
    //}

 }

  clear() {
    this.isDisplay = true;

    this.user = new User();
    this.checkSave = 0;
    this.UserTypeChanged();
  }



  getAllItemCategory() {
    this.serItemCategory.getAllItemCategories().subscribe(data => this.itemCategoryList = data);
  }


  //checkedAllRolls(event) {
  //  const checked = event;
  //  this.rolesLookup.forEach(val => { val.isExist = checked });
  //}




  UserTypeChanged(_userTypeId?) {
    this.authService.getUserType();
    if (_userTypeId != undefined) {
      var chk = this.userTypes.find(x => x.id == _userTypeId);
      this.user.roles = chk.defaultRoles.split(',');
      this.selectediRolsList = [];

      this.selectediRolsList = this.user.roles.map(v => {
        return v;
      });
    }



    //if (chk) {
    //  if (this.isDisplay && chk.nameAR == 'مدير' || chk.nameAR == 'admin') {

    //    this.user.roles = chk.defaultRoles.split(',');
    //  }
    //}

    //else {

     // this.Selectedroles = this.userservice.rolesLookup.map(v => {
     //   if (chk.defaultRoles.split(',')) {
     //     return v.roleName;
     //   }
     // });

     //this.rolesLookup.forEach(role => {

     //  var result = chk.defaultRoles.split(',').filter(f => f == role.roleName)
     //  console.log(result)
     // })
      
    //}


  }




  ////Saving Staff Users
  saveUser(type): void {

    if (this.user.password == null) {
      let msg = this.translate.get("Messages.PASSWORDINVALID").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }

    if (type == 'edit') {
      this.user.isNewUser = false;
    }

    this.user.itemCategories = this.selecteditemCategoryList.join(',');
    this.checkSave = 1;

    this.userservice.AddUser(this.user).subscribe(
      result => {

        if (result == null) {
          this.TosterService.ErrorToaster.next("خطاء فى الحفظ ...");
          this.checkSave = 0;

          return;
        }
        else if (result == 1) {
          this.isenabledSavebtn = true;
          if (type == 'add') {
            let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => {
              this.TosterService.SucssesToaster.next(msg);
            });
          }
          else if (type == 'edit') {
            let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
              this.TosterService.SucssesToaster.next(msg);
            });
          }
          this.getUserstList();
          this.checkSave = 0;

          return;
        }
        else if (result == 2) {
          let msg = this.translate.get("Messages.USEREXIST").subscribe(msg => {
            this.TosterService.ErrorToaster.next(msg);
          });
          this.isenabledSavebtn = true;
          this.checkSave = 0;

          return;
        }

        else if (result == 3) {
          let msg = this.translate.get("Messages.ERRORPASSWORD").subscribe(msg => {
            this.TosterService.ErrorToaster.next(msg);
          });
          this.isenabledSavebtn = true;
          this.checkSave = 0;

          return;
        }

        else if (result == false) {
          let msg = this.translate.get("Messages.ERRORPASSWORD").subscribe(msg => {
            this.TosterService.ErrorToaster.next(msg);
          });
          this.isenabledSavebtn = true;
          this.checkSave = 0;

          return;
        }

      },
      error => {
        this.isenabledSavebtn = true;
        this.errorMessage = <any>error;
        this.checkSave = 0;

      }
    );
  }

  deleteUserConfirm() {
    this.modalRef.hide();
    this.deleteUser(this.user.userName);
  }

  deleteBill(template: TemplateRef<any>, user: User) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.user = user;
  }


  deleteUser(userName: string) {

    this.userservice.deleteUser(userName).subscribe(
      result => {
        if (result == null) {
          this.TosterService.ErrorToaster.next("خطاء فى حذف ...");
          this.isenabledSavebtn = true;

          return;
        }

        else if (result) {

          this.TosterService.SucssesToaster.next('تم حذف المستخدم بنجاح');
          this.clear();
          this.getUserstList();

          return;
        }

      });

    
  }

  onBack(): void {
    //this.router.navigate(['/staff/users']);
  }



  getUserstList() {
    this.itemPagginatedTableVM.itemsPerPage = 10000;
    var userName = this.authService.getCurrentUserName();

    this.userservice.getusersPaginated(this.itemPagginatedTableVM.currentPage, this.itemPagginatedTableVM.itemsPerPage, this.itemPagginatedTableVM.sortKey, this.itemPagginatedTableVM.sortOrderBY,userName).subscribe(
      users => {


        this.users = users.items;
        this.itemPagginatedTableVM.totalCount = users.totalCount;
        this.itemPagginatedTableVM.calculateShowingNo();
      },
      error => this.errorMessage = <any>error
    );

    this.titleService.setTitle(this.pageTitle);

  }




  getUsebyUserName(username: string) {

    this.userservice.getUsertByUserName(username).subscribe(
      user => {
        if (user == null) {
          this.user = new User();
          return;
        }
        this.user = user;


        this.user.isNewUser = false;

        for (let rolevm of this.rolesLookup) {


          const index = this.user.roles.indexOf(rolevm.roleName, 0);
          if (index > -1) {
            rolevm.isExist = true;
          }
        }

        this.pageTitle = "Edit User  " + this.user.firstName

        this.titleService.setTitle(this.pageTitle);

      },
      error => this.errorMessage = <any>error
    );

  }

  ResetPassword() {

    if (this.user.email == undefined || this.user.email == "") {
      this.TosterService.ErrorToaster.next("Enter Your Email Please  ");

      return;
    }

    this.authService.ForgetPassword(this.user.email).subscribe(
      result => {
        if (result == true) {
          this.TosterService.SucssesToaster.next("Reset Email Sent Sucsessfully please check your inbox ");
        }
        else {
          this.TosterService.ErrorToaster.next("Faild to  Sent Reset Email .. Please Try again ");

        }
      },
      error => {
        this.TosterService.ErrorToaster.next("Faild to  Sent Reset Email .. Please Try again ");

      }

    );


  }

  closeUserTypeModal() {
    //this.getAllItemCategory();
    this.getAllUserTypes();
    //refresh printer list on close modal
    this.modalRef.hide();
  }


  openUserTypeModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-dialog modal-dialog-centered modal-lg' })
    );

    this.modalService.onHide.subscribe(e => {
      //this.getAllItemCategory();
      this.getAllUserTypes();

    });
  }





}
