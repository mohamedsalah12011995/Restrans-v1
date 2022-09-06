import {  PeopleType } from "../Models/peopleType";
import {  PeopleCategory } from "../Models/peopleCategory";

export class People {

  constructor() {

    this.id = 0;
    this.peopleCategoryId = 0;
    this.peopleTypeId = 0;
    this.isDelete = false;
    this.isNotActive = false;
    this.isRemember = false;
    this.credit = 0;
    this.debit = 0;
    this.discount = 0;
    this.balance = 0;

    this.name = '';
    this.phone = '';
    this.address = '';
    this.numberCar = '';


  }
  id: number;
  code: string;
  name: string;
  phone: string;
  address: string;
  discount: number;
  debit: number;
  credit: number;
  balance: number;
  point: number;
  notes?: any;
  numberCar: string;

  rememberDate: Date;
  isRemember: boolean;
  isNotActive: boolean;
  isDelete: boolean;
  peopleCategoryId: number;
  peopleTypeId: number;
  peopleAccounts: any[];
  peopleCategory?: PeopleCategory;
  peopleType?: PeopleType;

}
