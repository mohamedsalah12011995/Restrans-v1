//import { Injectable } from '@angular/core';
//import { Component, Input, Output, EventEmitter } from '@angular/core';
//import { Bill } from '../bill-invoice/Models/Bill';

//declare var Stimulsoft: any;

//@Injectable({
//  providedIn: 'root'
//})
//export class StimulsoftReportingService {

//  report: any = new Stimulsoft.Report.StiReport();

//  constructor( ) {
//  }


//  GetBillA4(bill: Bill) :any {

 
//    ///map dataset 
//    var billdetailsdataset = [];
//    ////map bill to report datasets and parameters 
//    var dataSet = new Stimulsoft.System.Data.DataSet("BillDetails");
//    for (var billdetail of bill.billDetails) {
//      var newdetail = {
//        itemName: billdetail.item.nameAR,
//        quantity: billdetail.qty,
//        buyPrice: billdetail.itemSellPrice,
//        vatTax: billdetail.vatTax,
//        total: billdetail.netTotal,
//        discount: billdetail.discount,
//        discountValue: billdetail.discountValue,
//        vatTaxValue: billdetail.vatTaxValue,

//      }
//      billdetailsdataset.push(newdetail);
//    }

//    console.log(billdetailsdataset);

//    dataSet.readJson(JSON.stringify(billdetailsdataset));


//    this.report.loadFile("reports/BillA4full.mrt");

//    this.report.regData(dataSet.dataSetName, "", dataSet);
//    console.log(this.report);

//    ///map report variables 
//    this.report.setVariable("billnumber", bill.id);
//    this.report.setVariable("vatnumber", "w433443");
//    this.report.setVariable("clientname", bill.pepoleName);
//    this.report.setVariable("clientphone", bill.pepoleName);
//    this.report.setVariable("cashir", "Admin");
//    this.report.setVariable("employee", "Admin");

//    this.report.setVariable("totalVatTax", "");
//    this.report.setVariable("totalDiscount", bill.currentDiscount);
//    this.report.setVariable("paymentType", "sodt");
//    this.report.setVariable("quantity", bill.totalQty);
//    this.report.setVariable("paid", bill.paied);
//    this.report.setVariable("remaining", bill.remaining);

//    this.report.setVariable("netTotal", bill.netTotal);

//    this.report.dictionary.synchronize();
//    this.report.render();
//    return this.report; 

//  }

//  GetBillRoll8cm(bill: Bill):any {


//    ///map dataset 
//    var billdetailsdataset = [];
//    ////map bill to report datasets and parameters 
//    var dataSet = new Stimulsoft.System.Data.DataSet("BillDetails");
//    for (var billdetail of bill.billDetails) {
//      var newdetail = {
//        itemName: billdetail.item.nameAR,
//        quantity: billdetail.qty,
//        buyPrice: billdetail.itemSellPrice,
//        vatTax: billdetail.vatTax,
//        total: billdetail.netTotal,
//        discount: billdetail.discount,
//        discountValue: billdetail.discountValue,
//        vatTaxValue: billdetail.vatTaxValue,

//      }
//      billdetailsdataset.push(newdetail);
//    }

//    dataSet.readJson(JSON.stringify(billdetailsdataset));

//    this.report.loadFile("reports/BillRoll8cmfull.mrt");
//    this.report.regData(dataSet.dataSetName, "", dataSet);
//    console.log(this.report);


//    ///map report variables 
//    this.report.setVariable("billnumber", bill.id);
//    this.report.setVariable("vatnumber", "15554223");
//    this.report.setVariable("clientname", bill.pepoleName);
//    this.report.setVariable("clientphone", bill.pepoleName);
//    this.report.setVariable("cashir", "Admin");


//    this.report.setVariable("totalVatTax", "");
//    this.report.setVariable("totalDiscount", bill.currentDiscount);
//    this.report.setVariable("paymentType", bill.paymentType.nameAR);
//    this.report.setVariable("quantity", bill.totalQty);
//    this.report.setVariable("paid", bill.paied);
//    this.report.setVariable("remaining", bill.remaining);

//    this.report.setVariable("netTotal", bill.netTotal);


    
//    this.report.dictionary.synchronize();
//    this.report.render();
//    return this.report; 

//  }

//  GetBillA5(bill: Bill): any {


//    ///map dataset 
//    var billdetailsdataset = [];
//    ////map bill to report datasets and parameters 
//    var dataSet = new Stimulsoft.System.Data.DataSet("BillDetails");
//    for (var billdetail of bill.billDetails) {
//      var newdetail = {
//        itemName: billdetail.item.nameAR,
//        quantity: billdetail.qty,
//        buyPrice: billdetail.itemSellPrice,
//        vatTax: billdetail.vatTax,
//        total: billdetail.netTotal,
//        discount: billdetail.discount,
//        discountValue: billdetail.discountValue,
//        vatTaxValue: billdetail.vatTaxValue,

//      }
//      billdetailsdataset.push(newdetail);
//    }

//    dataSet.readJson(JSON.stringify(billdetailsdataset));

//    this.report.loadFile("reports/BillA5full.mrt");
//    this.report.regData(dataSet.dataSetName, "", dataSet);
//    console.log(this.report);

//    ///map report variables
//    this.report.setVariable("billnumber", bill.id);
//    this.report.setVariable("vatnumber", "w433443");
//    this.report.setVariable("clientname", bill.pepoleName);
//    this.report.setVariable("clientphone", bill.pepoleName);
//    this.report.setVariable("cashir", "Admin");
//    this.report.setVariable("employee", "Admin");

//    this.report.setVariable("totalVatTax", bill.supTotal);
//    this.report.setVariable("totalDiscount", bill.supTotal);
//    this.report.setVariable("paymentType", "sodt");
//    this.report.setVariable("quantity", bill.totalQty);
//    this.report.setVariable("paid", bill.paied);
//    this.report.setVariable("remaining", bill.remaining);

//    this.report.setVariable("netTotal", bill.netTotal);


//    this.report.dictionary.synchronize();
//    this.report.render();

//    return this.report; 
//  }


//  DirectPrintA4(bill: Bill) {
//    var report =this.GetBillA4(bill);
//    report.print();
//  }


//  DirectPrintA5(bill: Bill) {
//    var report =this.GetBillA5(bill);
//    report.print();
//  }


//  DirectPrintRoll8cm(bill: Bill) {
//    var report = this.GetBillRoll8cm(bill);
//    report.print();
//  }
//}
