import { Injectable, Inject } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Printer } from './Models/Printer';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Item } from './Models/Item';
import { Console } from '@angular/core/src/console';
import { Response } from 'selenium-webdriver/http';
import { ItemPrice } from './Models/itemPrice';
import { PagedData } from 'src/app/Shared/classes/page-data';
import { ItemComponent } from './Models/ItemComponent';

//import 'rxjs/add/operator/map';
@Injectable()
export class ItemsService {


  private BasePrinterUrl: string = environment.baseUrl + 'api/Printer/';
  private BaseItemCategoryUrl: string = environment.baseUrl + 'api/ItemCategory/';
  private BaseItemrUrl: string = environment.baseUrl + 'api/Item/';
  private BaseUplodeUrl: string = environment.baseUrl + 'api/Upload/';


  public PriceListUpdated = new Subject();
  public sizeListUpdated = new Subject();
  public pushItemPrice = new Subject();
  public ItemObject = new Item();
  public ListItemPrice = new Array();



  constructor(private http: HttpClient) {
    // this.Url_base = baseurl;
    //this.GetItems_ByIncloud();


  }

  getAllItemsByName(key: string): Observable<Item[]> {

    let url = this.BaseItemrUrl + "GetAllItemIsForSell";
    const param = new HttpParams()
      .append('key', key.toString());


    return this.http.get<Item[]>(url, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }



  getPurchacedItemsByName(key: string): Observable<Item[]> {

    let url = this.BaseItemrUrl + "GetPurchasedItemsByName";
    const param = new HttpParams()
      .append('key', key.toString());


    return this.http.get<Item[]>(url, { params: param }).pipe(
      tap(data => {
        console.log("returned Item ", data);
      }),
      catchError(this.handleError)
    );
  }

  getPurchacedItemsBycode(key: string): Observable<Item[]> {

    let url = this.BaseItemrUrl + "GetPurchasedItemsByCode";
    const param = new HttpParams()
      .append('key', key.toString());


    return this.http.get<Item[]>(url, { params: param }).pipe(
      tap(data => {
        console.log("returned Item ", data);
      }),
      catchError(this.handleError)
    );
  }



  getItemsPaginated(pageIndex: number, pageSize: number, sortKey: string, sortOrderBY: string, itemVM: any, type: string): Observable<PagedData<Item>> {
    let url = this.BaseItemrUrl + "GetItemsPaginated"

    const param = new HttpParams()
      .append('pageIndex', pageIndex.toString())
      .append('pageSize', pageSize.toString())
      .append('sortKey', sortKey)
      .append('sortOrderBY', sortOrderBY)
      .append('type', type)


    return this.http.post<PagedData<Item>>(url, itemVM, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  GetItemByidPaginated(pageIndex: number, pageSize: number, sortKey: string, sortOrderBY: string, type: string): Observable<PagedData<Item>> {
    let url = this.BaseItemrUrl + "GetItemByidPaginated"

    const param = new HttpParams()
      .append('pageIndex', pageIndex.toString())
      .append('pageSize', pageSize.toString())
      .append('sortKey', sortKey)
      .append('sortOrderBY', sortOrderBY)
      .append('type', type)


    return this.http.post<PagedData<Item>>(url, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  getAllItemIsForSell(key: string): Observable<Item[]> {

    let url = this.BaseItemrUrl + "GetAllItemIsForSell";
    const param = new HttpParams()
      .append('key', key.toString());


    return this.http.get<Item[]>(url, { params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  ///Get All Printers 
  All_Print(): Observable<Printer[]> {

    let url = this.BasePrinterUrl + "GetPrinters";

    return this.http.get<Printer[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  All_Item(): Observable<Item[]> {
    let url = this.BaseItemrUrl + "GetItems";

    return this.http.get<Item[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  GetItemsByInvoise(): Observable<Item[]> {
    let url = this.BaseItemrUrl + "GetItemsByInvoise";

    return this.http.get<Item[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  All_ItemForCategory(categoryid: number): Observable<Item[]> {
    let url = this.BaseItemrUrl + "GetItemsforcategory";
    const param = new HttpParams().append('categoryid', categoryid.toString())

    return this.http.get<Item[]>(url, { params: param }).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  getItemById(id: number): Observable<Item> {
    let url = this.BaseItemrUrl + "GetItemByid";
    const param = new HttpParams().append('id', id.toString())

    return this.http.get<Item>(url, { params: param }).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

 
  InsertOrUpdateItem(itemModel: Item): Observable<Item> {
    let url = this.BaseItemrUrl + "InsertOrUpdateItem"
    //xx= JSON.stringify(custModel);
    return this.http.post<Item>(url, itemModel).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  Delete_Item(id: number): Observable<Item> {
    let url = this.BaseItemrUrl + "DeleteItem";

    const param = new HttpParams().append('id', id.toString())

    return this.http.delete(url, { params: param }).pipe(
      map((response: Response) => {

        var x: any = response
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
