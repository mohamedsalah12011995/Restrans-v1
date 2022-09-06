import { boxMony } from '../Models/boxMony';
import { User } from '../../../users/Models/User';


export class boxMonyType {

  constructor() {

    this.id = 0;
    this.nameAR = "";
    this.nameEN = "";
    this.user = [];
  }


  id: number;
  nameAR: string;
  nameEN: string;
  boxMony: boxMony;
  user: User[];
}
