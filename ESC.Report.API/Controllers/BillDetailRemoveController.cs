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
    public class BillDetailRemoveController : ApiController
    {


        // POST api/values
        public HttpResponseMessage post([FromBody]BillModel value)
        {
            try
            {
                LocalReport localReport = new LocalReport();
                if (value.CheckWiteInvoies == true)
                {

                    var chkRemoveItemGroups = value.BillDetails.Where(x => x.IsDelete == true).GroupBy(x => x.Item.ItemCategory.Printer.PrinterName, (key, group) => new { PrinterName = key, billDetails = group.ToList() }).ToList();
                    if (chkRemoveItemGroups.Count != 0)
                    {
                        if (value.CurrentLang=="en")
                        {
                            localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/ReportRemoveBillDetailsEN.rdlc");
                        }
                        else
                        {
                            localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/ReportRemoveDetailsAR.rdlc");
                        }
                        List<BillModel> billInfo = new List<BillModel>();
                        billInfo.Add(value);
                        var billinfos = billInfo.Select(x => new
                        {
                            Id = x.Id,
                            OrderNo = x.OrderNo,
                            TableNo = x.TableNo,
                            BillPlaceEN = x.BillPlace.NameEN,
                            BillPlaceAR = x.BillPlace.NameAR,
                            Reference = x.Reference,
                        });

                        foreach (var chkRemoveItem in chkRemoveItemGroups)
                        {
                            localReport.DataSources.Clear();

                            var NewBilldetails = chkRemoveItem.billDetails.Where(f => f.IsDelete == true).Select(x => new
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

                            if (chkRemoveItem.PrinterName == "لاتوجد")
                            {
                                return Request.CreateResponse(HttpStatusCode.OK, "Printed Not Found");
                            }
                            else
                            {
                                localReport.DataSources.Add(new ReportDataSource("billdetailsds", NewBilldetails));
                                localReport.DataSources.Add(new ReportDataSource("BillInfo", billinfos));
                                Class_ReportPrintDocument printDocument1 = new Class_ReportPrintDocument(localReport);
                                printDocument1.PrinterSettings.PrinterName = chkRemoveItem.PrinterName;
                                printDocument1.Print();
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
