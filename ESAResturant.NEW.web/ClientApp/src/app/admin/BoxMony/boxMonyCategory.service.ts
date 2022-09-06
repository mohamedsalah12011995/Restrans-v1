import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError, Subject, from } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { BoxMonyCategory } from '../BoxMony/Models/boxMonyCategory';
import { boxMonyType } from './Models/boxMonyType';
//import 'rxjs/add/operator/map';
@Injectable()
export class boxMonyCategoryService {

  private BaseBoxMonyCategoryUrl: string = environment.baseUrl + 'api/BoxMonyCategory/';

  constructor(private http: HttpClient) {


  }

  getBoxMonyType(): Observable<boxMonyType[]> {

    let url = this.BaseBoxMonyCategoryUrl + "GetBoxMonyTypes";

    return this.http.get<boxMonyType[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  getBoxMonyCategory(): Observable<BoxMonyCategory[]> {

    let url = this.BaseBoxMonyCategoryUrl + "GetBoxMonyCategories";

    return this.http.get<BoxMonyCategory[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }


  insertOrUpdateBoxMonyCategory(boxMonyCategory: BoxMonyCategory): Observable<BoxMonyCategory> {
    console.log(boxMonyCategory);
    let url = this.BaseBoxMonyCategoryUrl + "InsertOrUpdateBoxMonyCategory";
    return this.http.post<BoxMonyCategory>(url, boxMonyCategory).pipe(
      tap(data => {
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
