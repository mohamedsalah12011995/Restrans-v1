import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Taxes } from '../Models/Taxes';

@Injectable()
export class TaxesService {

  private BaseTaxesUrl: string = environment.baseUrl + 'api/Taxes/';

  constructor(private http: HttpClient) {

  }

  getAllTaxes(): Observable<Taxes[]> {

    let url = this.BaseTaxesUrl + "GetTaxes";

    return this.http.get<Taxes[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateTaxes(Taxes: Taxes): Observable<Taxes> {

    let url = this.BaseTaxesUrl + "InsertOrUpdateTaxes"
    //xx= JSON.stringify(custModel);
    return this.http.post<Taxes>(url, Taxes).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  getTaxesByItemId(id: number): Observable<Taxes[]> {
    let url = this.BaseTaxesUrl + "GetTaxesbyItemId"
    const param = new HttpParams()
      .append('id', id.toString())
    let Taxes = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return Taxes;
  }


  getTaxesById(id: number): Observable<Taxes> {
    let url = this.BaseTaxesUrl + "GetTaxesbyId"
    const param = new HttpParams()
      .append('id', id.toString())
    let Taxes = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return Taxes;
  }

  deleteTaxes(TaxesId: number): Observable<Taxes> {
    let url = this.BaseTaxesUrl + "DeleteTaxes"
    const param = new HttpParams().append('id', TaxesId.toString())
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
