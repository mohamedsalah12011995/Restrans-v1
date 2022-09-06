using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Drawing.Imaging;
using System.Drawing;
using System.Text;
using System.Globalization;
using ESC.Resturant.Domain.Models;

namespace ESC.Reports.API.Controllers
{
    public class BillInvoiceController : ApiController
    {

        public HttpResponseMessage post([FromBody]BillModel value)
        {
            try
            {

                LocalReport localReport = new LocalReport();
                if (value.CheckWiteInvoies == false)
                {
                    if (value.CurrentLang == "en")
                    {
                        localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/BillReportInvoiceKSA.rdlc");
                    }
                    else
                    {
                        localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/BillReportInvoiceKSA.rdlc");
                    }

                    List<BillModel> billInfo = new List<BillModel>();
                    billInfo.Add(value);
                    var billinfos = billInfo.Select(x => new
                    {
                        Id = x.Id,
                        CompanyNameAR = x.CompanyInfo.NameAR,
                        CompanyNameEN = x.CompanyInfo.NameEN,
                        CompanyLogo = x.CompanyInfo.Logo,
                        CompanyPhone = x.CompanyInfo.Phone,
                        CompanyAddress = x.CompanyInfo.Address,
                        CompanyNote = x.CompanyInfo.Note,
                        UserName = x.User.UserName,
                        OrderNo = x.OrderNo,
                        PeopleName = x.PepoleName,
                        PeoplePhone = x.BillDeliveries.FirstOrDefault()?.DeliveryPhone,
                        PeopleAddress = x.BillDeliveries.FirstOrDefault()?.DeliveryAddress,
                        BillPlaceAR = x.BillPlace.NameAR,
                        BillPlaceEN = x.BillPlace.NameEN,
                        TableNo = x.TableNo,
                        TotalQty = x.TotalQty,
                        Paid = x.Paied,
                        Remaining = x.Remaining,
                        SupTotal = x.SupTotal,
                        NetTotal = x.NetTotal,
                        PaymentTypeAR = x.PaymentType.NameAR,
                        PaymentTypeEN = x.PaymentType.NameEN,
                        TotalVatTax = x.TotalVatTax,
                        ServiceFeesValue = x.ServiceFeesValue,
                        DescountValue = x.DescountValue,
                        TotalAfterVatTax = x.TotalAfterVatTax,
                        CurrentDiscount = x.CurrentDiscount,
                        Reference=x.Reference,
                    });

                    localReport.DataSources.Clear();

                    var billdetails = value.BillDetails.Where(f => f.IsDelete == false).Select(x => new
                    {
                        Id = x.Id,
                        ItemNameAR = x.Item.NameAR,
                        ItemNameEN = x.Item.NameEN,
                        ItemSellPrice = x.ItemSellPrice,
                        VatTax = x.VATTax,
                        TotalAfterVatTax = x.TotalAfterVatTax,
                        Qty = x.Qty,
                        Note = x.Note,
                        SizeNameAr = x.ItemPrice.ItemSize.SizeNameAr,
                        SizeNameEn = x.ItemPrice.ItemSize.SizeNameEn,
                        SupTotal = x.SupTotal,



                    });

                    localReport.DataSources.Add(new ReportDataSource("billdetailsds", billdetails));
                    localReport.DataSources.Add(new ReportDataSource("BillInfo", billinfos));
                    Class_ReportPrintDocument printDocument = new Class_ReportPrintDocument(localReport);
                    printDocument.PrinterSettings.PrinterName = value.User.Printer.PrinterName;
                    if (value.User.Printer.CountCopies > 1)
                    {
                        for (int i = 0; i < value.User.Printer.CountCopies; i++)
                        {
                            printDocument.Print();
                        }
                    }
                    else
                    {
                        printDocument.Print();
                    }


                    var _BillSetailswithGroups = value.BillDetails.Where(x => x.IsPrint == true).GroupBy(x => x.Item.ItemCategory.Printer.PrinterName, (key, group) => new { PrinterName = key, billDetails = group.ToList() }).ToList();
                    if (_BillSetailswithGroups.Count != 0)
                    {

                        // Print Details in kitchen
                        if (value.CurrentLang == "en")
                        {
                            localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/BillReportkitchenEN.rdlc");
                        }
                        else
                        {
                            localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/BillReportkitchen.rdlc");
                            //localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/BillReportkitchen.rdlc");
                        }
                        List<BillModel> billInfo_ = new List<BillModel>();
                        billInfo_.Add(value);

                        var _billinfos = billInfo_.Select(x => new
                        {
                            Id = x.Id,
                            CompanyNameAR = x.CompanyInfo.NameAR,
                            CompanyNameEN = x.CompanyInfo.NameEN,
                            UserName = x.User.UserName,
                            OrderNo = x.OrderNo,
                            BillPlaceEN = x.BillPlace.NameEN,
                            BillPlaceAR = x.BillPlace.NameAR,
                            TableNo = x.TableNo,
                            Reference = x.Reference,



                        });


                        foreach (var billDetailsGroup in _BillSetailswithGroups)
                        {
                            localReport.DataSources.Clear();

                            var _billdetails = billDetailsGroup.billDetails.Where(f => f.IsDelete == false).Select(x => new
                            {
                                Id = x.Id,
                                ItemNameAR = x.Item.NameAR,
                                ItemNameEN = x.Item.NameEN,
                                ItemSellPrice = x.ItemSellPrice,
                                VatTax = x.VATTax,
                                TotalAfterVatTax = x.TotalAfterVatTax,
                                Qty = x.Qty,
                                Note = x.Note,
                                SizeNameAr = x.ItemPrice.ItemSize.SizeNameAr,
                                SizeNameEn = x.ItemPrice.ItemSize.SizeNameEn,
                                SupTotal = x.SupTotal


                            });

                            if (billDetailsGroup.PrinterName == "لاتوجد")
                            {
                                return Request.CreateResponse(HttpStatusCode.OK, "Printed Not Found");
                            }
                            else
                            {
                                localReport.DataSources.Add(new ReportDataSource("billdetailsds", _billdetails));
                                localReport.DataSources.Add(new ReportDataSource("BillInfo", _billinfos));
                                Class_ReportPrintDocument _printDocument = new Class_ReportPrintDocument(localReport);
                                _printDocument.PrinterSettings.PrinterName = billDetailsGroup.PrinterName;
                                _printDocument.Print();
                                

                            }
                        }
                    }
                }


                return Request.CreateResponse(HttpStatusCode.OK, "Printed sucess");
            }
            catch (Exception E)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, E.Message + "Printer Not Found");
            }
        }


    }
}
