
export class Taxes {

  constructor() {

    this.id = 0;
    this.nameAr = '';
    this.nameEn = '';
    this.percentValue = 0;
    this.isActive = false;
    this.isDelete = false;
    this.discountId = 1;

  }

  id: number;
  nameAr: string;
  nameEn: string;
  percentValue: number;
  isActive: boolean;
  isDelete: boolean;
  discountId: number;

}
