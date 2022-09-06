import { Branch } from "../../admin/setting/Models/Branch";
import { Printer } from "../../admin/item/Models/Printer";
import { UserDate } from "../../users/Models/UserDate";

export class Token {

  constructor() {
    this.authToken = '';
    this.userName = '';
    this.roles = [];
    this.boxMonyTypeId = 0;
    this.userTypeId = 0;
    this.itemCategories = '';
    this.printer = new Printer();
    this.branch = new Branch();
    
  }

  userName: string;
  userId: string;
  authToken: string;
  expiresInSeconds: number;
  expirationDate: Date;
  userTypeId: number;
  roles: any[];
  itemCategories: string;
  branchId: number;
  printerId: number;
  boxMonyTypeId: number;
  currentDate: Date;
  printer: Printer;
  branch: Branch;
  userDate: UserDate;
}
