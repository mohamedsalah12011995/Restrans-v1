import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError, Subject, from } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { boxMony } from '../BoxMony/Models/boxMony';
//import { BillType } from '../bill-invoice/Models/BillType';
import { BoxMonyCategory } from './Models/boxMonyCategory';
//import 'rxjs/add/operator/map';
@Injectable()
export class BoxMoniesService {

  private BaseBoxMonyUrl: string = environment.baseUrl + 'api/BoxMonies/';
  private BaseBoxMonyCategoryUrl: string = environment.baseUrl + 'api/BoxMonyCategory/';

  constructor(private http: HttpClient) {


  }

  BoxMoniesPaginated(pageIndex: number, pageSize: number, sortKey: string, sortOrderBY: string, from: Date, to: Date, _boxMonyTypeId, boxMonyVM: any): Observable<boxMony[]> {

    let url = this.BaseBoxMonyUrl + "BoxMoniesPaginated"
    const param = new HttpParams()
      .append('pageIndex', pageIndex.toString())
      .append('pageSize', pageSize.toString())
      .append('boxMonyTypeId', _boxMonyTypeId.toString())
      .append('sortKey', sortKey)
      .append('sortOrderBY', sortOrderBY)

      .append('From', (from != undefined && from != null) ? from.toJSON() : null)
      .append('To', (to != undefined && to != null) ? to.toJSON() : null);

    return this.http.post<boxMony[]>(url, boxMonyVM, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );

  }


  getBoxMoniesByDay(date,to): Observable<boxMony[]> {
    const param = new HttpParams().append('From', (date != undefined && date != null) ? date.toJSON() : null)
                                  .append('To', (to != undefined && to != null) ? to.toJSON() : null);
    let url = this.BaseBoxMonyUrl + "GetBoxMoniesByDay";
    return this.http.get<boxMony[]>(url, { params: param }).pipe(
      tap(data => {
        //console.log('All: ' + JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }

  

  insertOrUpdateBoxMony(boxMoneis: boxMony): Observable<boxMony> {
    console.log(boxMoneis);
    let url = this.BaseBoxMonyUrl + "InsertOrUpdateBoxMonies";
    //xx= JSON.stringify(custModel);
    return this.http.post<boxMony>(url, boxMoneis).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  getBoxMonyById(id: number): Observable<boxMony> {
    let url = this.BaseBoxMonyUrl + "GetBoxMonybyId";
    const param = new HttpParams()
      .append('id', id.toString())
    let boxMony = this.http.get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return boxMony;
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
