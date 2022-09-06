
export class PagginatedTableVM  {

  currentPage = 1;
  page: number;
  totalCount = 0;
  fromShowingNo: number;
  toShowingNo: number;
  itemsPerPage = 10;
  //sorting
  sortKey: string = 'Id'; //set default
  sortOrderBY: string = 'asc'; //set default
  reverse: boolean = false;
  //search
  searchname: string;

  constructor() {
   this.currentPage = 0;
    this.page=0;
    this.totalCount = 0;
    this.fromShowingNo=0;
    this.toShowingNo =1;
    this.itemsPerPage = 10;
    //sorting
    this.sortKey = 'Id'; //set default
    this.sortOrderBY = 'asc'; //set default
    this.reverse = false;
    //search
    this.searchname;


  }

  GridDefaultValue(): void {
    this.currentPage = 0;
  }

  onGridPageChanged(event: any): void {
    this.currentPage = event.page; 
  }


  sort(key) {

    this.sortKey = key;
    this.reverse = !this.reverse;
    this.sortOrderBY = this.reverse ? 'desc' : 'asc';
    this.GridDefaultValue();
  }

  onChangePageSize(Value): void {
    this.itemsPerPage = Value;
  }



  public calculateShowingNo() {
    let ItemSHows = this.currentPage;
    if (ItemSHows == 0) { ItemSHows = 1 }
    this.toShowingNo = ItemSHows * this.itemsPerPage
    this.fromShowingNo = (this.toShowingNo - this.itemsPerPage) + 1

  }


}
