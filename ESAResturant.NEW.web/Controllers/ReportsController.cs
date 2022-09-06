using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Threading.Tasks;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Concrete;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AspNetCore.Report;
using AspNetCore.Report;

namespace ESAResturant.NEW.web.Controllers
{
    [Route("api/Reports")]
    public class ReportsController : Controller
    {
        private IReportsService ReportsService;

        public ReportsController(IReportsService _ReportsService)
        {
            ReportsService = _ReportsService;
        }


        // GET: api/Bill/Date

        [HttpGet]
        [Route("GetBillsByDate")]
        public IEnumerable<BillModel> GetBillsByDate(DateTime date_from,DateTime date_to)
        {
            return ReportsService.GetBillsByDate(date_from, date_to);
        }

        [HttpGet]
        [Route("GetBillType")]
        public IEnumerable<BillTypeModel> GetBillType()
        {
            return ReportsService.GetBillType();
        }

        [HttpGet]
        [Route("GetReportItems")]
        public IEnumerable<BillDetailsModel> GetReportItems()
        {
            return ReportsService.GetReportItems();
        }

        [HttpPost]
        [Route("BillReportApplicationOrTaxesPaginated")]
        public async Task<object> BillReportPaginatedAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", DateTime? From = null, DateTime? To = null, [FromBody] BillModel searchBillVm = null, string component = null)
        {
            return await ReportsService.BillReportApplicationOrTaxesPaginatedAsync(pageIndex, pageSize, searchString, SortKey, sortOrderBY, From, To, searchBillVm, component);
        }

        [HttpPost]
        [Route("BillReportTotalsApplicationOrTaxesPaginated")]
        public async Task<BillReportTotalsModel> BillReportPaginatedAsync(DateTime? From = null, DateTime? To = null, [FromBody] BillModel searchBillVm = null, string component = null)
        {
            return await ReportsService.BillReportTotalsApplicationOrTaxesPaginatedAsync(From, To, searchBillVm, component);
        }

    }
}
