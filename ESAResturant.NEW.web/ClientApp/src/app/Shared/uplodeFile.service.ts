import { Injectable, ElementRef, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

declare var $: any;


@Injectable({
  providedIn: 'root'

})
export class UplodeFileService {
  private BaseUplodeUrl: string = environment.baseUrl + 'api/Upload/';

  constructor(private http: HttpClient) { }

  uploadFileItem(file) {
    let baseUrl = this.BaseUplodeUrl + "UploadFileItem";
    return this.http.post(baseUrl, file);
  }
  uploadFileCategory(file) {
    let baseUrl = this.BaseUplodeUrl + "UploadFileCategory";
    return this.http.post(baseUrl, file);
  }

  uploadFileApplication(file) {
    let baseUrl = this.BaseUplodeUrl + "UploadFileApplication";
    return this.http.post(baseUrl, file);
  }
}
