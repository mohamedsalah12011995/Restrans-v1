import { boxMony } from '../Models/boxMony';


export class BoxMonyCategory {

  constructor() {

    this.id = 0;
    this.nameAR = "";
    this.nameEN = "";
    this.isDelete = false;
    this.isCredit = false;
    this.isDebit = false;
    //this.boxMony = new boxMony();
  }


  id: number;
  nameAR: string;
  nameEN: string;
  isDelete: boolean;
  isCredit: boolean;
  isDebit: boolean;
  boxMony: boxMony;
}
