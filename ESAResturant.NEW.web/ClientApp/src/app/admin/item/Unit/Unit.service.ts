import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Unit } from '../Models/Unit';

@Injectable()
export class UnitService {

  private BaseUnitUrl: string = environment.baseUrl + 'api/Unit/';

  constructor(private http: HttpClient) {

  }

  getAllUnit(): Observable<Unit[]> {

    let url = this.BaseUnitUrl + "GetUnits";

    return this.http.get<Unit[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateUnit(Unit: Unit): Observable<Unit> {

    let url = this.BaseUnitUrl + "InsertOrUpdateUnit"
    //xx= JSON.stringify(custModel);
    return this.http.post<Unit>(url, Unit).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  getUnitById(id: number): Observable<Unit> {
    let url = this.BaseUnitUrl + "GetUnitbyId"
    const param = new HttpParams()
      .append('id', id.toString())
    let Unit = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return Unit;
  }

  deleteUnit(UnitId: number): Observable<Unit> {
    let url = this.BaseUnitUrl + "DeleteUnit"
    console.log(UnitId);
    const param = new HttpParams().append('id', UnitId.toString())
    return this.http.delete(url, { params: param }).pipe(
      map((response: Response) => {
        var x: any = response
        return x;
      }));
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
