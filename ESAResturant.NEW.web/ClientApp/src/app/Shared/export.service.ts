import { Injectable, ElementRef, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';

declare var $: any;

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const PDF_EXTENSION = '.pdf';

@Injectable({
  providedIn: 'root'

})
export class ExportService {
  @ViewChild('reportContent') reportContent: ElementRef;

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }


  @ViewChild('reportContent') myDiv: ElementRef;

  ngAfterViewInit() {

  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  downloadPdf(id) {
    const doc = new jspdf();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };


    setTimeout(() => {    //<<<---    using ()=> syntax

      doc.fromHTML(id.innerHTML, 15, 15, {
        'width': 190,
        'elementHandlers': specialElementHandlers
      });
      doc.save('_export_' + new Date().getTime() + PDF_EXTENSION);

    }, 500);
  }

}
