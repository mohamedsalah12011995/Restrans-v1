export class TableBill  {

  constructor() {

    this.id = 0;
    this.tableNo = '';
    this.pepoleName = '';
    this.checkWiteInvoies = false;
    this.isDelete = false;
  }
  
  id: number;
  tableNo: string;
  pepoleName: string;
  currentDate: Date;
  date: Date;
  netTotal: number;
  checkWiteInvoies: boolean;
  isDelete: boolean;
}
