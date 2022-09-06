import { Component, TemplateRef } from '@angular/core';
import { PrinterService } from './printer.service';
import { Printer } from '../Models/Printer';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
    selector: 'app-printer',
    templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.css'],
  providers: [PrinterService]
})
/** printer component*/
export class PrinterComponent {
  /** printer ctor */
  printer: Printer;
  listPrinter: Printer[];
  printer_Device: any;

  modalRef: BsModalRef;

  currentLang: string = "";
  pageTitle: string = "";
  constructor(private serv: PrinterService, public TosterService: ToastWrapperService, private titleService: Title,
    public translate: TranslateService, private modalService: BsModalService) {

    this.currentLang = translate.currentLang;
    this.changeTitle(this.currentLang);

    this.printer = new Printer();
    this.getAllPrinter();
    this.getAllPrintersDevice();
  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "أدارة الطابعات";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Printers Management";
      this.titleService.setTitle(this.pageTitle);
    }
  }

  clear() {
    this.printer = new Printer();
  }
  //Printer//

  //All_Printers
   getAllPrinter() {
    this.serv.All_Print().subscribe(data => this.listPrinter = data);
  }
  //All_Printers from Device
  getAllPrintersDevice() {
    this.serv.All_PrinterDevice().subscribe(data => {
      this.printer_Device = data
      console.log(data);
    }
    );
  }
  //Printer by id
  GetPrinterByID(p: Printer) {
    this.printer = new Printer();
    this.printer = p;
  }

  //Add Printer And Edit
  InsertOrUpdatePrinter(p: Printer, type) {
    if (p.displayNameAR == null || p.displayNameAR == "") {
      let msg = this.translate.get("Messages.COMPLETEDATA").subscribe(msg => {
        this.TosterService.ErrorToaster.next(msg);
      });
      return;
    }
    if (type === 'add') {
      for (var i = 0; i < this.listPrinter.length; i++) {
        if (p.displayNameAR == this.listPrinter[i].displayNameAR) {
          let msg = this.translate.get("Messages.PRINTEXIST").subscribe(msg => {
            this.TosterService.ErrorToaster.next(msg);
          });
          return;
        }
      }
      p.printerName = this.printer.printerName;
      this.serv.InsertOrUpdatePrinter(p).subscribe(data => { this.getAllPrinter() });
      this.printer = new Printer();
      let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      return;
    }

    if (type === 'edit') {
      p.printerName = this.printer.printerName;
      this.serv.InsertOrUpdatePrinter(p).subscribe(data => { this.getAllPrinter() });
      let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      return;
    }
  }

  //Delete Printer
  public DeletePrinter(id: number) {
    if (confirm("هل تريد تأكيد الحذف ؟")) {
      this.serv.deletePrinter(id).subscribe(data => {
        this.getAllPrinter();
      });
    }
  }


  deletePrintConfirm() {
    this.modalRef.hide();
    this.deleteprint(this.printer.id)
  }


  deletePrint(template: TemplateRef<any>, print: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.printer = print;
  }

  deleteprint(id: number) {
    this.serv.deletePrinter(id).subscribe(data => {
      this.getAllPrinter();
      let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
    });

  }


  // Select Name Printer 
  getSelectedOptionText(event) {
    //.target['options'][event.target['options'].selectedIndex].text;
    this.printer.printerName = event.target.value;
  }
}
