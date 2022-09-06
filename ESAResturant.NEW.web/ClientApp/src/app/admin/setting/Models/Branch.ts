import { Bill } from "../../bill-invoice/Models/Bill";
import { CompanyInfo } from "../../../users/Models/CompanyInfo";

export class Branch {

  constructor() {

    this.id = 0;
    this.nameAr = '';
    this.nameEn = '';
    this.isDelete = false;
    this.companyInfoId = 0;

    this.companyInfo = new CompanyInfo();
  }

  id: number;
  nameAr: string;
  nameEn: string;
  isDelete: boolean;
  companyInfoId: number;
  companyInfo: CompanyInfo;
}
