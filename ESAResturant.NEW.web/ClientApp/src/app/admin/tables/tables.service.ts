import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, Subject, from } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { TablesPlaces } from './Models/TablesPlaces';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';
//import 'rxjs/add/operator/map';
@Injectable()
export class TablesService {

  private BaseTablesPlacesUrl: string = environment.baseUrl + 'api/TablesPlaces/';

  constructor(private http: HttpClient, public TosterService: ToastWrapperService) {


  }

  getTablesPlaces(): Observable<TablesPlaces[]> {

    let url = this.BaseTablesPlacesUrl + "GetTablesPlaces";

    return this.http.get<TablesPlaces[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }



  insertOrUpdateTablesPlaces(tablesPlaces: TablesPlaces, type: any): Observable<TablesPlaces> {
    let url = this.BaseTablesPlacesUrl + "InsertOrUpdateTablesPlaces";
    return this.http.post<TablesPlaces>(url, tablesPlaces).pipe(
      tap(data => {
        //if (type == 'add') {
        //  this.TosterService.SucssesToaster.next("تم حفظ الطاوله بنجاح ");
        //}
        //if (type == 'edit') {
        //  this.TosterService.SucssesToaster.next("تم تعديل الطاوله بنجاح ");
        //}
      }),
      catchError(this.handleError)
    );
  }

  deleteTable(id: number): Observable<TablesPlaces> {
    let url = this.BaseTablesPlacesUrl + "DeleteTablesPlaces";
    const param = new HttpParams().append('id', id.toString())
    return this.http.delete(url, { params: param }).pipe(
      map((response: Response) => {
        var x: any = response
        //this.TosterService.SucssesToaster.next("تم الحذف بنجاح ");
        return x;
      })
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
