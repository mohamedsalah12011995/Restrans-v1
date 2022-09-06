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
    public class BillSepareateController : ApiController
    {
        // POST api/values

        public HttpResponseMessage post([FromBody]BillModel value)
        {
            try
            {
                List<BillDetailsModel> NewBillDetails = new List<BillDetailsModel>();
                NewBillDetails = value.BillDetails.Where(f => f.IsDelete == true).ToList();
                LocalReport localReport = new LocalReport();
                var SepareateGroupList = value.BillDetails.Where(x => x.IsDelete == false && x.IsSeparate == true && x.IsFire == false).GroupBy(x => x.Item.ItemCategory.Printer.PrinterName, (key, group) => new { PrinterName = key, billDetails = group.ToList() }).ToList();
                if (SepareateGroupList.Count != 0)
                {
                    if (value.CurrentLang == "en")
                    {
                        localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/BillReportInvoiceKSA.rdlc");
                    }
                    else
                    {
                        localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/BillReportInvoiceKSA.rdlc");
                    }
                    List<BillModel> Separeate = new List<BillModel>();
                    Separeate.Add(value);
                    var billinfosSepareate = Separeate.Select(x => new
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
                        PlaceName = x.BillPlace.NameEN,
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
                    });

                    foreach (var SepareateGroup in SepareateGroupList)
                    {
                        localReport.DataSources.Clear();

                        var billdetailsSepareate = value.BillDetails.Where(f => f.IsDelete == false).Select(x => new
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

                        localReport.DataSources.Add(new ReportDataSource("billdetailsds", billdetailsSepareate));
                        localReport.DataSources.Add(new ReportDataSource("BillInfo", billinfosSepareate));
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
