import { Branch } from "../../admin/setting/Models/Branch";

export class CompanyInfo {

  constructor() {

    this.id = 0;
    this.nameAR = '';
    this.nameEN = '';
    this.phone = '';
    this.address = '';
    this.note = '';
    this.logo = '';
    this.Branches = [];

  }

  id: number;
  nameAR: string;
  nameEN: string;
  phone: string;
  address: string;
  note: string;
  logo: string;
  Branches: Branch[];
}
