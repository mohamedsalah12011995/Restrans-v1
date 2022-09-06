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
    [Route("api/TotalBill")]

    public class TotalBillController : ApiController
    {
        // POST api/values
        public HttpResponseMessage Post([FromBody]BillReportTotalsModel value)
        {

            try
            {
                LocalReport localReport = new LocalReport();
                if (value.Condetion == "billInvoice")
                {
                    localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/TotalBills.rdlc");
                }
                if (value.Condetion == "reportToday")
                {
                    localReport.ReportPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Reports/RPTToday.rdlc");
                }
                List<BillReportTotalsModel> ResultInfo = new List<BillReportTotalsModel>();

                ResultInfo.Add(value);
                var billinfos = ResultInfo.Select(x => new
                {
                    TotalBillCount = x.TotalBillCount,
                    SumBillCash = x.SumBillCash,
                    SumBillNetTotals = x.SumBillNetTotals,
                    SumBillRemaining = x.SumBillRemaining,
                    SumBillDiscounts = x.SumBillDiscounts,
                    SumBillTotalVatTax = x.SumBillTotalVatTax,
                    SumBillVisa = x.SumBillVisa,
                    DateFrom = x.DateFrom,
                    DateTo = x.DateTo,
                    User = x.User.UserName,
                    Qabd = x.Qabd,
                    Sarf = x.Sarf,
                    Net = x.SumBillCash - x.Sarf,

                });

                localReport.DataSources.Clear();


                localReport.DataSources.Add(new ReportDataSource("DataSetTotalBills", billinfos));
                Class_ReportPrintDocument printDocument = new Class_ReportPrintDocument(localReport);
                printDocument.PrinterSettings.PrinterName = value.User.Printer.PrinterName;
                printDocument.Print();

                return Request.CreateResponse(HttpStatusCode.OK, "Printed sucess");
            }
            catch (Exception E)
            {

                return Request.CreateResponse(HttpStatusCode.BadRequest, E.InnerException.Message);
            }


        }

    }
}
