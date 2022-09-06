using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Helpers;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Abstract
{
    /// <summary>
    /// IBillService interface 
    /// Define Methods Signture 
    /// </summary>
    public interface IReportsService
    {
        List<BillTypeModel> GetBillType();
        List<BillDetailsModel> GetReportItems();
        List<BillModel> GetBillsByDate(DateTime date_from,DateTime date_to);
        Task<PagedData<BillModel>> BillReportApplicationOrTaxesPaginatedAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", DateTime? From = null, DateTime? To = null, BillModel searchBillVm = null, string component = null);
        //Task<PagedData<BillModel>> BillReportTaxesPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", DateTime? From = null, DateTime? To = null, BillModel searchBillVm = null, string component = null);

       // Task<BillReportTotalsModel> BillReportTotalsApplicationPaginationAsync(DateTime? From = null, DateTime? To = null, BillModel searchBillVm = null, string component = null);
        Task<BillReportTotalsModel> BillReportTotalsApplicationOrTaxesPaginatedAsync(DateTime? From = null, DateTime? To = null, BillModel searchBillVm = null, string component = null);

    }
}
