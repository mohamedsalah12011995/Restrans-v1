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
    public class BillFireController : ApiController
    {

        public HttpResponseMessage Post([FromBody]BillModel value)
        {
            try
            {
                List<BillDetailsModel> NewBillDetails = new List<BillDetailsModel>();
                NewBillDetails = value.BillDetails.Where(f => f.IsDelete == true).ToList();
                LocalReport localReport = new LocalReport();

                var FireGroupList = value.BillDetails.Where(x => x.IsFire == true && x.IsDelete == false && x.IsSeparate == false).GroupBy(x => x.Item.ItemCategory.Printer.PrinterName, (key, group) => new { PrinterName = key, billDetails = group.ToList() }).ToList();
                if (FireGroupList.Count != 0)
                {
                    if (value.CurrentLang == "en")
                    {
                        localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/BillReportFireItemEN.rdlc");
                    }
                    else
                    {
                        localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/BillReportFireItem.rdlc");
                    }

                    List<BillModel> billInfoFire = new List<BillModel>();
                    billInfoFire.Add(value);
                    var billinfosFire = billInfoFire.Select(x => new
                    {
                        Id = x.Id,
                        OrderNo = x.OrderNo,
                        TableNo = x.TableNo,
                        BillPlaceEN = x.BillPlace.NameEN,
                        BillPlaceAR = x.BillPlace.NameAR,
                        Reference = x.Reference,

                    });


                    foreach (var FireGroupGroup in FireGroupList)
                    {
                        localReport.DataSources.Clear();

                        var billdetailsFire = FireGroupGroup.billDetails.Where(f => f.IsDelete == false && f.IsFire == true).Select(x => new
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

                        localReport.DataSources.Add(new ReportDataSource("billdetailsds", billdetailsFire));
                        localReport.DataSources.Add(new ReportDataSource("BillInfo", billinfosFire));
                        Class_ReportPrintDocument printDocumentFire = new Class_ReportPrintDocument(localReport);
                        printDocumentFire.PrinterSettings.PrinterName = FireGroupGroup.PrinterName;
                        printDocumentFire.Print();
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
