

export class User {

  constructor() {
    this.userId = 0;
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.isActive = true;
    this.email = '';
    this.password = '';
    this.userTypeId = 0;
    this.boxMonyTypeId = 0;
    this.roles = [];
    this.isNewUser = true;
    this.isDelete = false;
    this.itemCategories = '';
  }



  userName: string;
  email: string;
  password?: any;
  firstName?: any;
  lastName?: any;
  isActive: boolean;
  isNewUser: boolean;
  branchId: number;
  printerId: number;
  boxMonyTypeId: number;

  userId: number;
  userTypeId: number;
  isDelete: boolean;
  roles: string[];
  itemCategories: string;

 
}
