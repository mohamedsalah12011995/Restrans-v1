import { Component, TemplateRef } from '@angular/core';
import { CompanyInfoService } from './CompanyInfo.service';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingesService } from '../setting.service';
import { HeaderComponent } from '../../Shared/Components/header/header.component';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { CompanyInfo } from 'src/app/users/Models/CompanyInfo';
//import { BranchService } from '../Branches/addbranch/BranchService.service';
import { Branch } from '../Models/Branch';
import { AuthService } from '../../../Shared/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { UplodeFileService } from '../../../Shared/uplodeFile.service';

@Component({
  selector: 'app-CompanyInfo',
  templateUrl: './CompanyInfo.component.html',
  styleUrls: ['./CompanyInfo.component.css'],
  providers: [CompanyInfoService, SettingesService]
})
/** Taxes component*/
export class CompanyInfoComponent {
  /** Taxes ctor */
  CompanyInfoList: CompanyInfo[];
  companyInfo: CompanyInfo;
  isDisplay: boolean;
  modalRef: BsModalRef;
  private BaseItemrUrl: string = environment.baseUrl + 'api/Upload/';
  selectedFiles: FileList;
  ImageName: string;
  imageSrc: any;
  formData: FormData = new FormData();
  fileNames: any;
  isnew: boolean;
  changeImg: boolean = false;
  
  BranchList: Branch[] = [];
 

  currentLang: string = "";
  pageTitle: string = "";


  constructor(public TosterService: ToastWrapperService, private uplodeService: UplodeFileService, private companyService: CompanyInfoService, private http: HttpClient,
    public authService: AuthService, private _location: Location, private titleService: Title, public translate: TranslateService) {
    this.companyInfo = new CompanyInfo();
    this.isDisplay = true;

    this.clearimg();
    this.isnew = true;
    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);

  }

  ngOnInit() {
    this.getAllCompanyInfo();
    //this.getBranches();
    this.currentLang = this.authService.CurrentLang;

  }
  navigateBack() {
    this._location.back();
  }
  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "معلومات الشركة";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Company Info";
      this.titleService.setTitle(this.pageTitle);
    }
  }

  

  getAllCompanyInfo() {
    this.companyService.getAllCompanyInfo().subscribe(data => {
      this.CompanyInfoList = data;
      if (data.length > 0) {
        this.companyInfo.id = data[0].id;
        this.companyInfo.nameAR = data[0].nameAR;
        this.companyInfo.nameEN = data[0].nameEN;
        this.companyInfo.phone = data[0].phone;
        this.companyInfo.address = data[0].address;
        this.companyInfo.note = data[0].note;
        this.companyInfo.logo = data[0].logo;
        this.imageSrc ='./'+ this.companyInfo.logo;
        this.isnew = false;

      }

    });
  }


  save(type) {
    this.companyInfo.logo = this.imageSrc;

    //if (this.companyInfo.branchId == 0 || this.companyInfo.branchId == undefined) {
    //  this.companyInfo.branchId = 1;
    //}
    //if (this.companyInfo.nameAR === '' || this.companyInfo.nameEN === '') {
    //  this.TosterService.ErrorToaster.next(" من فضلك اكمل البيانات ");
    //  return;
    //}
    //if (this.companyInfo.phone === '') {

    //  this.TosterService.ErrorToaster.next(" من فضلك  ادخل الهاتف ");
    //  return;
    //}
    //if (this.companyInfo.address === '') {
    //  this.TosterService.ErrorToaster.next(" من فضلك  ادخل العنوان ");
    //  return;
    //}
    //if (this.companyInfo.logo === '') {
    //  this.TosterService.ErrorToaster.next(" من فضلك  ادخل اللوجو ");
    //  return;
    //}
    if (this.companyInfo.nameAR == '' && this.companyInfo.nameEN == '' && this.companyInfo.address === '' && this.companyInfo.phone === '') {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }
    else {

      if (this.changeImg) {
        this.uploadFile(this.fileNames);
        this.uplodeService.uploadFileApplication(this.formData).subscribe(data => {
          //this.companyInfo.logo = './files/Application/' + data.toString();
          this.companyInfo.logo = data.toString();
          this.companyService.InsertOrUpdateCompanyInfo(this.companyInfo).subscribe(data => {
            this.getAllCompanyInfo();
            this.formData = new FormData();

            if (type == 'add') {
              let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => { this.TosterService.SucssesToaster.next(msg); });
            }

            if (type == 'edit') {
              let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {this.TosterService.SucssesToaster.next(msg);
                this.changeImg = false;
              });
            }

          });
        })
      }

      if (!this.changeImg) {
        this.companyService.InsertOrUpdateCompanyInfo(this.companyInfo).subscribe(data => { this.getAllCompanyInfo(); })

        if (type == 'add') {
          let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => { this.TosterService.SucssesToaster.next(msg); });
        }

        if (type == 'edit') {
          let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
            this.TosterService.SucssesToaster.next(msg);
            this.changeImg = false;
          });
        }
      }


    }

  }



  clear() {
    this.imageSrc = "./files/img/-available.jpg";
    this.ImageName = null;
    this.companyInfo = new CompanyInfo();
  }

  clearimg() {
    this.imageSrc = "./-available.jpg";
    this.ImageName = null;
  }

  ////uplode Photo 
  uploadFile(files) {
    //for (let file of files) {
    //  this.formData.append('file', file);
    //  this.ImageName = file.name;
    //}
    this.formData.append('file', files[0]);

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

}
