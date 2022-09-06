export class RoleViewModel {

  constructor(rolename: string, roleDisplayNameAR: string = "", roleDisplayNameEN: string = "" ) {
    this.roleName = rolename;
    this.isExist = false;
    if (roleDisplayNameAR == "") {
      this.roleDisplayNameAR = rolename;
    }
    else {
      this.roleDisplayNameAR = roleDisplayNameAR;
      this.roleDisplayNameEN = roleDisplayNameEN;
    }
  }
  roleName: string;
  roleDisplayNameAR: string;
  roleDisplayNameEN: string;

  isExist: boolean; ///is this role exist in current context 

}

