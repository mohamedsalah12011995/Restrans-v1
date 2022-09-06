import { BoxMonyCategory } from './boxMonyCategory';
import { boxMonyType } from './boxMonyType';
import { People } from '../../People/Models/people';
import { User } from '../../../users/Models/User';
import { Currencies } from '../../setting/Models/Currencies';


export class boxMony {

  constructor() {

    this.id = 0;
    this.debit = 0;
    this.credit = 0;
    this.currentBalance = 0;
    this.peopleId = 0;
    this.currencyId = 0;
    this.note = '';
    this.userId = '';
    this.boxMonyCategories = new BoxMonyCategory();
    this.boxMonyTypes = new boxMonyType();
    this.people = new People();
    this.currencies = new Currencies();
    this.user = new User();
  }


  id: number;
  debit: number;
  credit: number;
  currentBalance: number;
  note: string;
  currentDate?: any;
  date?: any;
  boxMonyCategoryId?: number;
  boxMonyTypeId?: number;
  peopleId?: number;
  userId: string;
  currencyId?: number;
  boxMonyCategories: BoxMonyCategory;
  boxMonyTypes: boxMonyType;
  people: People;
  currencies: Currencies
  user: User;
}
