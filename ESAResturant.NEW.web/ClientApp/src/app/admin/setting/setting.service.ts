import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { DiscountType } from "./Models/DiscountType";
import { catchError, tap } from "rxjs/operators";
import { Setting } from "./Models/Setting";
import { UserDate } from "../../users/Models/UserDate";

@Injectable()
export class SettingesService {

  private ReportsUrl: string = environment.baseUrl + 'api/Reports/';
  private BaseDiscountTypeUrl: string = environment.baseUrl + 'api/DiscountType/';
  private BaseSettingUrl: string = environment.baseUrl + 'api/Setting/';

  constructor(private http: HttpClient) {

  }

  getAllSetting(): Observable<Setting[]> {
    let url = this.BaseSettingUrl + "GetSettings";
    return this.http.get<Setting[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateSetting(Setting: Setting): Observable<Setting> {
    let url = this.BaseSettingUrl + "InsertOrUpdateSetting"
    return this.http.post<Setting>(url, Setting).pipe(
    catchError(this.handleError));
  }

  getAllDiscountType(): Observable<DiscountType[]> {
    let url = this.BaseDiscountTypeUrl + "GetDiscountTypes";
    return this.http.get<DiscountType[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  //InsertOrUpdateUserDate(userDate: UserDate): Observable<UserDate> {
  //  let url = this.UserDateUrl + "InsertOrUpdateUserDate"

  //  return this.http.post<UserDate>(url, userDate).pipe(
  //    tap(data => {
  //      console.log(data);
  //    }),
  //    catchError(this.handleError)
  //  );
  //}


  //getUserDate(user: string): Observable<any> {
  //  let url = this.UserDateUrl + "GetUserDateModelByUserId"
  //  const param = new HttpParams().append('User', user)

  //  return this.http.get<any>(url, { params: param }).pipe(
  //    tap(data => { }),
  //    catchError(this.handleError)
  //  );
  //}

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
