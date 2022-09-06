import { Component, OnInit, TemplateRef } from '@angular/core';
import { Application } from '../Models/Application';
import { ApplicationService } from './application.service';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { SettingesService } from '../setting.service';
import { DiscountType } from '../Models/DiscountType';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { AuthService } from '../../../Shared/Services/auth.service';
import { UplodeFileService } from '../../../Shared/uplodeFile.service';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  providers: [ApplicationService, SettingesService]
})
export class ApplicationComponent implements OnInit {
  private BaseItemrUrl: string = environment.baseUrl + 'api/Upload/';

  application: Application;
  listApplication: Application[];
  listDiscountType: DiscountType[];
  serchList: any = [];
  isDisplay: boolean = false
  imageSrc: any;
  formData: FormData = new FormData();
  fileNames: any;
  selectedFiles: FileList;
  selectedputh: any;
  ImageName: string;
  present: string = ''
  changeImg: boolean = false;
  currentLang: string = "";
  pageTitle: string = "";
  modalRef: BsModalRef;

  constructor(public TosterService: ToastWrapperService, private _location: Location, private appServer: ApplicationService, private http: HttpClient,
    private settServe: SettingesService, private uplodeService: UplodeFileService, private titleService: Title,
    public translate: TranslateService, public authService: AuthService, private modalService: BsModalService) {
    this.application = new Application();
    this.imageSrc = "./-available.jpg";

    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);
  }

  ngOnInit() {
    this.getAllApplication();
    this.clearimg();
    this.isDisplay = true;
    this.getAllDiscountType();
  }

  navigateBack() {
    this._location.back();
  }
  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "التطبيقات";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Application";
      this.titleService.setTitle(this.pageTitle);
    }
  }

 

  clear() {
    this.application = new Application();
    this.isDisplay = true;
    this.clearimg();
  }
  getpresent(p) {
    if (p == 'نسبة') {
      this.present = '%';
    }
    else {
      this.present = '';
    }
  }
  //Application//

  //All_Applications
  getAllApplication() {
    this.appServer.GetAllApplication().subscribe(data => this.listApplication = data);
  }
  getAllDiscountType() {
    this.settServe.getAllDiscountType().subscribe(data => {
      this.listDiscountType = data;
    }
    );
  }

  //getValueFromDiscountType() {
  //  var chkDiscount = this.listDiscountType.find(f => f.nameAr == 'نسبة');
  //  if (chkDiscount != null) {
  //    this.application.discountId = chkDiscount.id;
  //  }
  //}
  //Application by id
  GetApplicationByID(p: Application) {
    this.application = new Application();
    this.application = p;
    this.imageSrc = p.image;
    this.isDisplay = false;
  }

  //Add Application And Edit
  InsertOrUpdateApplication() {
    if (this.application.id === 0) {

      for (var i = 0; i < this.listApplication.length; i++) {
        if (this.application.nameAr == this.listApplication[i].nameAr) {
          let msg = this.translate.get("Messages.APPLICATIONEXIST").subscribe(msg => {
            this.TosterService.SucssesToaster.next(msg);
          });
          return;
        }
      }
    }

    if (this.application.nameAr == '' || this.application.nameEn == '') {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      return;
    }

    if (this.changeImg) {
      this.uploadFile(this.fileNames);
      this.uplodeService.uploadFileApplication(this.formData).subscribe(data => {
        this.application.image = './files/Application/' + data.toString();
        this.appServer.InsertOrUpdateApplication(this.application).subscribe(data => {
          this.getAllApplication();
          this.formData = new FormData();
          if (this.application.id === 0) {
            let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => { this.TosterService.SucssesToaster.next(msg); });
            this.clear();
            this.clearimg();
          }
          else {
            let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
              this.TosterService.SucssesToaster.next(msg);
              this.changeImg = false;
            });
          }
        });
      })

      if (!this.changeImg) {
        this.appServer.InsertOrUpdateApplication(this.application).subscribe(data => {
          this.getAllApplication()
        });

        if (this.application.id === 0) {
          let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => { this.TosterService.SucssesToaster.next(msg); });
          this.clear();
          this.clearimg();
        }
        else {
          let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
            this.TosterService.SucssesToaster.next(msg);
            this.changeImg = false;
          });
        }
      }
    }
    else {
      this.appServer.InsertOrUpdateApplication(this.application).subscribe(data => {
        this.getAllApplication();
        this.formData = new FormData();
        let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
          this.changeImg = false;
        });
      })
    }
  }

  //Delete Application
  public DeleteApplication(id: number) {
    if (confirm("هل تريد تأكيد الحذف ؟")) {
      this.appServer.deleteApplication(id).subscribe(data => {
        this.getAllApplication();
        this.clear();
      });
    }
  }

  clearimg() {
    this.imageSrc = "./-available.jpg";
    this.ImageName = null;
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
 
  serchApp(name) {
    //console.log(name);
    if (name == null) {
      this.serchList = this.listApplication;
    }
    else {
      this.serchList = this.listApplication.filter(f => f.nameAr.toLowerCase().includes(name.toLowerCase()));
    }
  }


  deleteApplictionConfirm() {
    this.modalRef.hide();
    this.deleteappliction(this.application.id)
  }


  deleteAppliction(template: TemplateRef<any>, application: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.application = application;
  }

  deleteappliction(id: number) {
    this.appServer.deleteApplication(id).subscribe(data => {
      this.getAllApplication();
      this.clear();
      let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
    });

  }

}
