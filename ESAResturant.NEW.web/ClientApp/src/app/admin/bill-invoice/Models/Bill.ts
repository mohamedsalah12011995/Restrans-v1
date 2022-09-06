import { BillDetail } from './BillDetail';
import { BillPlace } from './BillPlace';
import { BillType } from './BillType';
import { PaymentType } from './PaymentType ';
import { Application } from '../../setting/Models/Application';
import { BillTaxes } from './BillTaxes';
import { BillCurrencies } from './BillCurrencies';
import { Currencies } from '../../setting/Models/Currencies';
import { DiscountType } from '../../setting/Models/DiscountType';
import { BillDeliveries } from './BillDeliveries';
import { People } from '../../People/Models/people';
import { CompanyInfo } from 'src/app/users/Models/CompanyInfo';
import { Branch } from '../../setting/Models/Branch';
import { User } from '../../../users/Models/User';

export class Bill {

  constructor() {
    this.id = 0;
    this.code = '';
    this.orderNo = 0;
    this.billDetails = [];
    this.billTaxes = [];
    this.billCurrencies = [];
    this.billDeliveries = [];

    this.tableNo = null;

    this.peopleID = 0;
    this.totalQty = 0;
    this.supTotal = 0;
    this.totalVatTax = 0;
    this.totalAfterVatTax = 0;

    this.currentDiscount = 0;
    this.descountValue = 0;
    this.serviceFees = 0;
    this.serviceFeesValue = 0;
    this.totalNotePrice = 0;

    this.netTotal = 0;
    this.paied = 0;
    this.applicationValue = 0;
    this.remaining = 0;
    this.employeeId = 0;
    //this.branchId = 0;
    this.billTypeId = 0;
    this.billPlaceId = 1;
    this.paymentId = 1;
    this.visaID = 0;
    this.userId = '';

    //this.applicationId = null;
    this.discountId = 1;
    this.currencyId = 0;
    this.applicationDiscountid = 0;

    this.checkWiteInvoies = false;
    this.isDelete = false;
    this.isApproverd = 0;
    this.currentLang = '';
    this.reference = '';
    this.notes = '';


    this.billPlace = new BillPlace();
    this.billType = new BillType();
    this.paymentType = new PaymentType();
    this.application = new Application();
    this.currencies = new Currencies();
    this.discountType = new DiscountType();
    this.branch = new Branch();
    this.user = new User();
    this.companyInfo = new CompanyInfo();

  }

  id: number;
  code: string;
  orderNo: number;
  tableNo: string;
  peopleID: number;
  pepoleName: string;
  currentDate: any;
  date: any;
  totalQty: number;
  supTotal: number;
  totalVatTax: number;
  totalAfterVatTax: number;
  totalNotePrice: number;

  currentDiscount: number;
  descountValue: number;
  serviceFees: number;
  serviceFeesValue: number;

  applicationValue: number;

  netTotal: number;
  paied: number;
  remaining: number;
  applicationDiscountid: number;

  notes: string;
  reference: string;
  employeeId: number;
  branchId: number;
  userId: string;
  billTypeId: number;
  billPlaceId: number;
  paymentId: number;
  discountId: number;
  visaID: number;
  applicationId: number;
  currencyId: number;
  checkWiteInvoies: boolean;
  isDelete: boolean;
  isApproverd?: number;
  currentLang: string;
  //optional


  billDetails: BillDetail[];
  billTaxes: BillTaxes[];
  billCurrencies: BillCurrencies[];
  billDeliveries: BillDeliveries[];

  billPlace: BillPlace;
  billType: BillType;
  paymentType: PaymentType;
  application: Application
  currencies: Currencies;
  discountType: DiscountType;
  branch: Branch;
  user: User;
  companyInfo: CompanyInfo;
}

