import { Component, OnInit, TemplateRef } from '@angular/core';
import { BranchService } from './BranchService.service';
import { Branch } from '../../Models/Branch';
import { CompanyInfoService } from '../../CompanyInfo/CompanyInfo.service';
import { CompanyInfo } from '../../../../users/Models/CompanyInfo';
import { AuthService } from '../../../../Shared/Services/auth.service';
import { ToastWrapperService } from '../../../Shared/toast-wrapper.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-addbranch',
  templateUrl: './addbranch.component.html',
  styleUrls: ['./addbranch.component.css'],
  providers: [BranchService, CompanyInfoService]
})
export class AddbranchComponent implements OnInit {
  branchList: Branch[] = [];
  companyInfoList: CompanyInfo[] = [];
  branch: Branch;

  isDisplay: boolean = false;
  modalRef: BsModalRef;

  currentLang: string = "";
  pageTitle: string = "";

  constructor(private branchService: BranchService, private companyService: CompanyInfoService, public authService: AuthService,
    public TosterService: ToastWrapperService, private titleService: Title, public translate: TranslateService, private modalService: BsModalService) {
    this.branch = new Branch();

    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);
  }

  ngOnInit() {
    this.getAllCompanyInfo();
    this.getBranches();

  }




  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "اضافة فرع";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Add Branch";
      this.titleService.setTitle(this.pageTitle);
    }
  }






  getBranch(branch) {
    this.isDisplay = true
    this.branch = new Branch();
    this.branch = branch;

  }

  getBranches() {
    this.branchService.getAllBranches().subscribe(data => {
      this.branchList = data;
    })
  }

  getAllCompanyInfo() {
    this.companyService.getAllCompanyInfo().subscribe(data => {
      this.companyInfoList = data;
    });
  }

  addCompanyInfo(type) {

    if (this.branch.nameAr == '' || this.branch.nameEn == '' || this.branch.companyInfoId == 0) {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }



    this.branchService.InsertOrUpdateBranch(this.branch).subscribe(data => {
      this.getBranches();

      if (type == 'add') {
        let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
        });
      }
      if (type == 'edit') {
        let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
        });

      }

    });
  }
  deleteRow(branch: Branch) {
    branch.isDelete = true;
    this.branchService.InsertOrUpdateBranch(branch).subscribe(data => {
      this.getBranches();
      let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
    })
  }


  deleteConfirm() {
    this.modalRef.hide();
    this.deleteRow(this.branch)
  }


  deleteCheck(template: TemplateRef<any>, branch: Branch) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.branch = branch;
  }

  clear() {
    this.branch = new Branch();
    this.isDisplay = false;
  }

}
