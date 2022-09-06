import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Bill } from './Models/Bill';
import { Observable, throwError, Subject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { BillPlace } from './Models/BillPlace';
import { PaymentType } from './Models/PaymentType ';
import { BillDetail } from './Models/BillDetail';
import { BillType } from './Models/BillType';
import { Note } from './Models/note';
import { PagedData } from 'src/app/Shared/classes/page-data';
import { BillDeliveries } from './Models/BillDeliveries';
import { BillCurrencies } from './Models/BillCurrencies';
import { TotalDay } from '../Shared/settings.service';
import { ReportItems } from './Models/ReportItems';

@Injectable()
export class BillInvoiceService   {

  private BillUrl: string = environment.baseUrl  + 'api/Bill/';
  private BillDetalisUrl: string = environment.baseUrl + 'api/BillDetalis/';
  private BillDeliveryUrl: string = environment.baseUrl + 'api/BillDelivery/';
  private BillCurrenciseUrl: string = environment.baseUrl + 'api/BillCurrencise/';

  private BillInvoiceUrl: string = environment.basePrinterServiceUrl + '/BillInvoice/';
  private BillFireUrl: string = environment.basePrinterServiceUrl + '/BillFire/';
  private BillSepareateUrl: string = environment.basePrinterServiceUrl + '/BillSepareate/';
  private BillRemoveDetaileUrl: string = environment.basePrinterServiceUrl + '/BillDetailRemove/';
  private TotalBillUrl: string = environment.basePrinterServiceUrl + '/TotalBill/';
  private ReportItemsUrl: string = environment.basePrinterServiceUrl + '/ReportItems/';
  private ReportsUrl: string = environment.baseUrl + 'api/Reports/';
  public objectBill = new Bill();
  public gettable: string;
  constructor(private http: HttpClient) {
    this.gettable = '';
  }


  GetItemsGroup(pageIndex: number, pageSize: number, sortKey: string, sortOrderBY: string, from: Date, to: Date, billVM: any, type: string): Observable<PagedData<BillDetail>> {

    let url = this.BillDetalisUrl + "GetItemsGroup"
    const param = new HttpParams()
      .append('pageIndex', pageIndex.toString())
      .append('pageSize', pageSize.toString())
      .append('sortKey', sortKey)
      .append('type', type)
      .append('sortOrderBY', sortOrderBY)

      .append('From', (from != undefined && from != null) ? from.toJSON() : null)
      .append('To', (to != undefined && to != null) ? to.toJSON() : null)



    if (from != undefined) {


    }
    return this.http.post<any>(url, billVM, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  BillListPaginated(pageIndex: number, pageSize: number, sortKey: string, sortOrderBY: string, from: Date, to: Date, billVM: any, type: string): Observable<PagedData<Bill>> {

    let url = this.BillUrl + "BillListPaginated"
    const param = new HttpParams()
      .append('pageIndex', pageIndex.toString())
      .append('pageSize', pageSize.toString())
      .append('sortKey', sortKey)
      .append('type', type)
      .append('sortOrderBY', sortOrderBY)

      .append('From', (from != undefined && from != null) ? from.toJSON() : null)
      .append('To', (to != undefined && to != null) ? to.toJSON() : null);

    return this.http.post<PagedData<Bill>>(url, billVM, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );

  }


  BillListFinshedPaginated(pageIndex: number, pageSize: number, sortKey: string, sortOrderBY: string, from: Date, to: Date, billVM: any, type: string): Observable<PagedData<Bill>> {

    let url = this.BillUrl + "BillListFinshedPaginated"
    const param = new HttpParams()
      .append('pageIndex', pageIndex.toString())
      .append('pageSize', pageSize.toString())
      .append('sortKey', sortKey)
      .append('type', type)
      .append('sortOrderBY', sortOrderBY)

      .append('From', (from != undefined && from != null) ? from.toJSON() : null)
      .append('To', (to != undefined && to != null) ? to.toJSON() : null);

    return this.http.post<PagedData<Bill>>(url, billVM, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );

  }

  GetBillById(id: number): Observable<PagedData<Bill>> {

    let url = this.BillUrl + "GetBillByidPaginated"
    const param = new HttpParams().append('Id', id.toString())

    return this.http.post<PagedData<Bill>>(url, id, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );

  }

  BillWaitPaginated(pageIndex: number, pageSize: number, sortKey: string, sortOrderBY: string, from: string, to: string, billVM: any, type: string): Observable<PagedData<Bill>> {

    let url = this.BillUrl + "BillWaitPaginated"
    const param = new HttpParams()
      .append('pageIndex', pageIndex.toString())
      .append('pageSize', pageSize.toString())
      .append('sortKey', sortKey)
      .append('sortOrderBY', sortOrderBY)
      .append('From', from)
      .append('To', to)
      .append('type', type)

    return this.http.post<PagedData<Bill>>(url, billVM, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );

  }


  getBillReportPaginated(pageIndex: number, pageSize: number, sortKey: string, sortOrderBY: string, from: string, to: string, billVM: Bill, component: string, typeDate, all?: string): Observable<PagedData<Bill>> {

    var url = "";
    const param = new HttpParams()
      .append('pageIndex', pageIndex.toString())
      .append('pageSize', pageSize.toString())
      .append('sortKey', sortKey)
      .append('sortOrderBY', sortOrderBY)
      .append('From', from)
      .append('To', to)
      //.append('From', (from != undefined && from != null) ? from.toJSON() : null)
      //.append('To', (to != undefined && to != null) ? to.toJSON() : null)z
      .append('component', component)
      .append('TypeDate', typeDate)
      .append('All', all);


    if (typeDate == 'date') {
       url = this.BillUrl + "BillReportPaginated"
    }
    if (typeDate == 'time') {
      url = this.BillUrl + "BillReportPaginated";
    }

    if (billVM != null) {
      var _user = null;
      var _user = JSON.parse(localStorage.getItem('User'));
      //billVM.user = _user;
      billVM.userId = _user.userId;
      billVM.user.userTypeId = _user.userTypeId;
      billVM.user.branchId = _user.branchId;

      if (billVM.user.userTypeId == 0 || billVM.user.boxMonyTypeId == 0) {
        billVM.user.userTypeId = _user.userTypeId;
        billVM.user.boxMonyTypeId = _user.boxMonyTypeId;
      }

    }


    return this.http.post<PagedData<Bill>>(url, billVM, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }



  getBillReportTotalsTodayPaginated(from: string, to: string, billVM: any, component: string, type: string, all?: string): Observable<any> {

   let url = this.BillUrl + "BillReportTotalsTodayPaginated"
    

    const param = new HttpParams()
      .append('component', component)
      .append('From', from)
      .append('To', to)
      .append('All', all)
    //.append('From', (from != undefined && from != null) ? from.toJSON() : undefined)
    //.append('To', (to != undefined && to != null) ? to.toJSON() : undefined);


    if (from != undefined) {


    }
    if (to) {
    }

    return this.http.post<any>(url, billVM, { params: param }).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  getBillReportTotalsPaginated(from: string, to: string, billVM: any, component: string, type: string, all?: string): Observable<any> {
    if (type == 'date') {
      var url = "";
       url = this.BillUrl + "BillReportTotalsPaginated"
    }
    if (type == 'time') {
       url = this.BillUrl + "BillReportTotalsPaginationTimeAsync"
    }

    const param = new HttpParams()
      .append('component', component)
      .append('From', from)
      .append('To', to)
      .append('All', all)
      //.append('From', (from != undefined && from != null) ? from.toJSON() : undefined)
      //.append('To', (to != undefined && to != null) ? to.toJSON() : undefined);


    if (from != undefined) {


    }
    if (to) {
    }

    return this.http.post<any>(url, billVM, { params: param }).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  getBillsByDate(date): Observable<Bill[]> {
    const param = new HttpParams().append('date', date.toLocaleDateString())

    let url = this.ReportsUrl + "GetBillsByDate";
    return this.http.get<Bill[]>(url, { params: param }).pipe(
      tap(data => {  }),
      catchError(this.handleError)
    );
  }

  GetAllBillsByCheckWiteInvoies(): Observable<Bill[]> {

    let url = this.BillUrl + "GetAllBillsByCheckWiteInvoies";

    return this.http.get<Bill[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  GetLastBill(_date): Observable<any> {
    const param = new HttpParams()
      .append('_Date', (_date != undefined && _date != null) ? _date.toJSON() : undefined)

    let url = this.BillUrl + "GetLastBill";
    return this.http.get<any>(url, { params: param }).pipe(
      tap(data => {  }),
      catchError(this.handleError)
    );
  }

  GetBillsByCheckWiteInvoiesTable(fromDate): Observable<any> {
    const param = new HttpParams().append('fromDate', fromDate)

    let url = this.BillUrl + "GetBillsByCheckWiteInvoiesTable";
    return this.http.get<any>(url, { params: param }).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  GetBillLastid(): Observable<Bill> {

    let url = this.BillUrl + "GetBillLastid";

    return this.http.get<Bill>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }


  GetBillsCheckWiteInvoiesNotTable(): Observable<Bill[]> {

    let url = this.BillUrl + "GetBillsCheckWiteInvoiesNotTable";

    return this.http.get<Bill[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
    
  }

  GetBillsCheckWiteInvoiesDelivery(): Observable<Bill[]> {

    let url = this.BillUrl + "GetBillsCheckWiteInvoiesDelivery";

    return this.http.get<Bill[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateBill(bill: Bill): Observable<Bill> {

    let url = this.BillUrl + "InsertOrUpdateBill"
    //xx= JSON.stringify(custModel);
    return this.http.post<Bill>(url,  bill).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  PrintTotalDay(data: TotalDay): Observable<TotalDay> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let url = this.TotalBillUrl;
    return this.http.post<TotalDay>(url, data, httpOptions).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  PrintReportItems(data: ReportItems): Observable<ReportItems> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let url = this.ReportItemsUrl;
    return this.http.post<ReportItems>(url, data, httpOptions).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  PrintBillFire(bill: Bill): Observable<Bill> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    let url = this.BillFireUrl;
    //xx= JSON.stringify(custModel);
    return this.http.post<Bill>(url, bill,httpOptions).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  PrintBillSepareate(bill: Bill): Observable<Bill> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    let url = this.BillSepareateUrl;
    //xx= JSON.stringify(custModel);
    return this.http.post<Bill>(url, bill, httpOptions).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  PrintBillRemoveDetail(bill: Bill): Observable<Bill> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    let url = this.BillRemoveDetaileUrl;
    //xx= JSON.stringify(custModel);
    return this.http.post<Bill>(url, bill, httpOptions).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  PrintBill(bill: Bill): Observable<Bill> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    let url = this.BillInvoiceUrl;
    //xx= JSON.stringify(custModel);
    return this.http.post<Bill>(url, bill, httpOptions).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  updateBill(bill: Bill): Observable<Bill> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    let url = this.BillUrl + "UpdateBill";
    //xx= JSON.stringify(custModel);
    return this.http.post<Bill>(url, bill, httpOptions).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }




  InsertOrUpdateNote(Note: Note): Observable<Note> {

    let url = this.BillUrl + "InsertOrUpdateNote"
    //xx= JSON.stringify(custModel);
    return this.http.post<Note>(url, Note).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateBillDelivery(billDelivery: BillDeliveries): Observable<BillDeliveries> {

    let url = this.BillDeliveryUrl + "InsertOrUpdateBillDelivery"
    //xx= JSON.stringify(custModel);
    return this.http.post<BillDeliveries>(url, BillDeliveries).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  getAllNote(): Observable<Note[]> {

    let url = this.BillUrl + "GetNotes";

    return this.http.get<Note[]>(url).pipe(
      tap(data => { } ),
      catchError(this.handleError)
    );
  }

  deleteNote(noteId: number): Observable<Note> {
    let url = this.BillUrl + "DeleteNote";
    const param = new HttpParams().append('id', noteId.toString())
    return this.http.delete(url, { params: param }).pipe(
      map((response: Response) => {
        var x: any = response
        return x;
      }));
  }

  getBillById(id: number): Observable<Bill> {
    let url = this.BillUrl + "GetBillbyId";
    const param = new HttpParams()
      .append('id', id.toString())
    let Bill = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return Bill;
  }

  getBillDetailById(id: number): Observable<BillDetail[]> {
    let url = this.BillDetalisUrl + "GetBillDetailsByid";
    const param = new HttpParams()
      .append('id', id.toString())
    let BillDetail = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return BillDetail;
  }

  deleteBill(billId): Observable<Bill> {
    let url = this.BillUrl + "DeleteBill";
    const param = new HttpParams().append('id', billId.toString())
    return this.http.delete(url, { params: param }).pipe(
      map((response: Response) => {
        var x: any = response
        return x;
      }));
  }

  getAllBillCurrencies(): Observable<BillCurrencies[]> {

    let url = this.BillCurrenciseUrl + "GetBillCurrencise";

    return this.http.get<BillCurrencies[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  getAllBillPlaces(): Observable<BillPlace[]> {
    let url = this.BillUrl + "GetBillPlaces";

    return this.http.get<BillPlace[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }
  getAllBillPaymentType(): Observable<PaymentType[]> {

    let url = this.BillUrl + "GetBillPaymentType";
    return this.http.get<PaymentType[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  getAllBillTypes(): Observable<BillType[]> {
    let url = this.BillUrl + "GetBillTypes";
    return this.http.get<BillType[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
