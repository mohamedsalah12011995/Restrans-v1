import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ItemPrice } from '../Models/itemPrice';

@Injectable()
export class ItemPriceService {

  private BaseItemPriceUrl: string = environment.baseUrl + 'api/ItemPrice/';

  constructor(private http: HttpClient) {

  }

  getAllItemPrice(): Observable<ItemPrice[]> {

    let url = this.BaseItemPriceUrl + "GetItemPrices";

    return this.http.get<ItemPrice[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateItemPrice(itemPrice: ItemPrice): Observable<ItemPrice> {

    let url = this.BaseItemPriceUrl + "InsertOrUpdateItemPrice"
    //xx= JSON.stringify(custModel);
    return this.http.post<ItemPrice>(url, itemPrice).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  getItemPriceByItemId(id: number): Observable<ItemPrice[]> {
    let url = this.BaseItemPriceUrl + "GetItemPricebyItemId"
    const param = new HttpParams()
      .append('id', id.toString())
    let ItemPrice = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return ItemPrice;
  }


  getItemPriceById(id: number): Observable<ItemPrice> {
    let url = this.BaseItemPriceUrl + "GetItemPricebyId"
    const param = new HttpParams()
      .append('id', id.toString())
    let ItemPrice = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return ItemPrice;
  }

  deleteItemPrice(itemPriceId: number): Observable<ItemPrice> {
    let url = this.BaseItemPriceUrl + "DeleteItemPrice"
    const param = new HttpParams().append('id', itemPriceId.toString())
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
