import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bill } from '../bill-invoice/Models/Bill';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { BillType } from '../bill-invoice/Models/BillType';
import { boxMony } from '../BoxMony/Models/boxMony';
import { Data } from '@angular/router';
import { BillDetail } from '../bill-invoice/Models/BillDetail';
import { PagedData } from '../../Shared/classes/page-data';


@Injectable()
export class ReportsService {

  private ReportsUrl: string = environment.baseUrl + 'api/Reports/';
  private BaseBoxMonyUrl: string = environment.baseUrl + 'api/BoxMony/';

  constructor(private http: HttpClient) {

  }



  getBoxManies(date_from, date_to): Observable<boxMony[]> {
    let url = this.BaseBoxMonyUrl + "GetBoxMonys";
   
    return this.http.get<boxMony[]>(url, { params: { date_from, date_to } }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  addbox(boxMoneis: boxMony) {
    let url = this.BaseBoxMonyUrl + "InsertOrUpdateBoxMony";
    return this.http.post(url, boxMoneis).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  getBillType(): Observable<BillType[]> {

    let url = this.ReportsUrl + "GetBillType";

    return this.http.get<BillType[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  getBillsByDate(date_from, date_to): Observable<Bill[]> {


    let url = this.ReportsUrl + "GetBillsByDate";
    return this.http.get<Bill[]>(url, { params: { date_from, date_to } }).pipe(
      tap(data => {

      }),
      catchError(this.handleError)
    );
  }


  BillReportApplicationOrTaxesPaginated(pageIndex: number, pageSize: number, sortKey: string, sortOrderBY: string, from: Date, to: Date, billVM: Bill, component: string): Observable<PagedData<Bill>> {
    let url = this.ReportsUrl + "BillReportApplicationOrTaxesPaginated"
    const param = new HttpParams()
      .append('pageIndex', pageIndex.toString())
      .append('pageSize', pageSize.toString())
      .append('sortKey', sortKey)
      .append('sortOrderBY', sortOrderBY)
      .append('From', (from != undefined && from != null) ? from.toJSON() : null)
      .append('To', (to != undefined && to != null) ? to.toJSON() : null)
      .append('component', component);

    if (billVM != null) {
      var _user = null;
      var _user = JSON.parse(localStorage.getItem('User'));
      billVM.userId = _user;
      billVM.userId = _user.userId;
      billVM.user.userTypeId = _user.userTypeId;
      billVM.user.boxMonyTypeId = _user.boxMonyTypeId;
    }


    return this.http.post<PagedData<Bill>>(url, billVM, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  BillReportTotalsApplicationOrTaxesPaginated(from: Date, to: Date, billVM: any, component: string): Observable<any> {
    let url = this.ReportsUrl + "BillReportTotalsApplicationOrTaxesPaginated"

    const param = new HttpParams()
      .append('component', component)
      .append('From', (from != undefined && from != null) ? from.toJSON() : undefined)
      .append('To', (to != undefined && to != null) ? to.toJSON() : undefined);

    return this.http.post<any>(url, billVM, { params: param }).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }




  getReportItems(): Observable<BillDetail[]> {

    let url = this.ReportsUrl + "GetReportItems";

    return this.http.get<BillDetail[]>(url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
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
