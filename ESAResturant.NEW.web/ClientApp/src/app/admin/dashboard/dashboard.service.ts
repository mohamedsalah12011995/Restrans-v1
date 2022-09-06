import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';



@Injectable()
export class DashboardService {

  private DashboardUrl: string = environment.baseUrl + 'api/Dashboard/';

  


  constructor(private http: HttpClient) {

  }




  GetTodayDashboardTotals(): Observable<any> {
    let url = this.DashboardUrl + "GetTodayDashboardTotals";
   
    return this.http.get(url, {} ).pipe(
      tap(data => {
        //console.log('All: ' + JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }



  GetMonthlyDashboardTotals(): Observable<any> {
    let url = this.DashboardUrl + "GetMonthlyDashboardTotals";

    return this.http.get(url, {}).pipe(
      tap(data => {
        //console.log('All: ' + JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }



  GetMonthlySalesDashboardChart(): Observable<any[]> {
    let url = this.DashboardUrl + "GetMonthlySalesDashboardChart";

    return this.http.get<any[]>(url, {}).pipe(
      tap(data => {
        //console.log('All: ' + JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }


  GetBillsCountToday(): Observable<any[]> {
    let url = this.DashboardUrl + "GetBillsCountToday";

    return this.http.get<any[]>(url, {}).pipe(
      tap(data => {
        //console.log('All: ' + JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }


  GetDeliveryBillsCountToday(): Observable<any> {
    let url = this.DashboardUrl + "GetDeliveryBillsCountToday";

    return this.http.get<any[]>(url, {}).pipe(
      tap(data => {
        //console.log('All: ' + JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }



  GetDeliveryTabelsBillsCountToday(): Observable<any[]> {
    let url = this.DashboardUrl + "GetDeliveryTabelsBillsCountToday";

    return this.http.get<any[]>(url, {}).pipe(
      tap(data => {
        //console.log('All: ' + JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }



  GetBestSalesDashboard(): Observable<any[]> {
    let url = this.DashboardUrl + "GetBestSalesDashboard";

    return this.http.get<any[]>(url, {}).pipe(
      tap(data => {
        //console.log('All: ' + JSON.stringify(data));
      }),
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
