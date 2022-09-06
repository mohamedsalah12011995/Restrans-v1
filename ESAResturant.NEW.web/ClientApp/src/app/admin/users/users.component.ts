import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';
import { HomeService } from '../home.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  private BaseItemrUrl: string = environment.baseUrl + 'api/Upload/';
  selectedFiles: FileList;
  ImageName: string;
  imageSrc: any;
  formData: any;
  fileNames: any;
  isnew: boolean;
  pageTitle: string = "ادارة اصناف البيع";

  constructor(public TosterService: ToastWrapperService, private http: HttpClient, private homeServe: HomeService,
    private titleService: Title) {
    this.clearimg();
    this.isnew = true;
    this.titleService.setTitle(this.pageTitle);
  }
  ngOnInit() {
    this.homeServe.displayNamePages();
  }

 

  clear() {
    this.imageSrc = "./files/img/-available.jpg";
    this.ImageName = null;
  }

  //Clear
  clearimg() {
    this.imageSrc = "./files/img/-available.jpg";
    this.ImageName = null;
  }

  ////uplode Photo 
  uploadFile(files) {
    const formData = new FormData();
    for (let file of files) {
      formData.append(file.name, file);
      this.ImageName = file.name;
    }
    let url = this.BaseItemrUrl + "UploadFile_Item";

    const uploadReq = new HttpRequest('POST', url, formData, {
      reportProgress: true,
    });
    this.http.request(uploadReq).subscribe(event => { });
    return './files/img/' + this.ImageName;
  }
  //Read url Img
  detectFiles(Files) {
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
