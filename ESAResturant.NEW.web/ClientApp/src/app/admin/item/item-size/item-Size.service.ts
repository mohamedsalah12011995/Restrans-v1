import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ItemSize } from '../Models/ItemSize';

@Injectable()
export class ItemSizeService {

  private BaseItemSizeUrl: string = environment.baseUrl + 'api/ItemSize/';

  constructor(private http: HttpClient) {

  }

  getAllItemSize(): Observable<ItemSize[]> {

    let url = this.BaseItemSizeUrl + "GetItemSizes";

    return this.http.get<ItemSize[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateItemSize(ItemSize: ItemSize): Observable<ItemSize> {

    let url = this.BaseItemSizeUrl + "InsertOrUpdateItemSize"
    //xx= JSON.stringify(custModel);
    return this.http.post<ItemSize>(url, ItemSize).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  getItemSizeById(id: number): Observable<ItemSize> {
    let url = this.BaseItemSizeUrl + "GetItemSizebyId"
    const param = new HttpParams()
      .append('id', id.toString())
    let ItemSize = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return ItemSize;
  }

  deleteItemSize(ItemSizeId: number): Observable<ItemSize> {
    let url = this.BaseItemSizeUrl + "DeleteItemSize"
    const param = new HttpParams().append('id', ItemSizeId.toString())
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
