export class ItemCategory {

  constructor() {
    this.id = 0;
    this.nameAR = '';
    this.nameEN = '';
    this.sellCategory = false;
    this.buyCategory = false;
    this.printerId = 1;
    this.image = '';
    this.isDelete = false;
  }


  id: number;
  nameAR: string;
  nameEN: string;
  sellCategory: boolean;
  buyCategory: boolean;
  printerId?: number;
  parentId?: number;
  image: string;
  isDelete: boolean
}
