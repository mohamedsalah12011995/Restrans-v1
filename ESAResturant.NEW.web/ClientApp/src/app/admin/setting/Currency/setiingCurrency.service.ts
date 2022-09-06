import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Currencies } from '../Models/Currencies';

@Injectable()
export class setiingCurrency {

  private BaseCurrencyUrl: string = environment.baseUrl + 'api/Currencise/';

  constructor(private http: HttpClient) {

  }

  getAllCurrency(): Observable<Currencies[]> {

    let url = this.BaseCurrencyUrl + "GetCurrencise";

    return this.http.get<Currencies[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateCurrency(Currency: Currencies): Observable<Currencies> {

    let url = this.BaseCurrencyUrl + "InsertOrUpdateCurrencise"
    //xx= JSON.stringify(custModel);
    return this.http.post<Currencies>(url, Currency).pipe(
      tap(data => {
        //console.log('All: ' + JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }

  getCurrencyByItemId(id: number): Observable<Currencies[]> {
    let url = this.BaseCurrencyUrl + "GetCurrencybyItemId"
    const param = new HttpParams()
      .append('id', id.toString())
    let Currency = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return Currency;
  }


  getCurrencyById(id: number): Observable<Currencies> {
    let url = this.BaseCurrencyUrl + "GetCurrencybyId"
    const param = new HttpParams()
      .append('id', id.toString())
    let Currency = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return Currency;
  }

  deleteCurrency(CurrencyId: number): Observable<Currencies> {
    let url = this.BaseCurrencyUrl + "DeleteCurrencise"
    const param = new HttpParams().append('id', CurrencyId.toString())
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
