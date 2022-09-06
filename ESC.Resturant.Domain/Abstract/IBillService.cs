using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Helpers;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Abstract
{
    /// <summary>
    /// IBillService interface 
    /// Define Methods Signture 
    /// </summary>
    public interface IBillService
    {
        object ReternObjectBill(int id);
        List<NoteModel> GetNotes();
        BillModel GetBillLastid();
        bool DeleteNote(int id);


        BillModel GetBillByid(int id);
        BillModel InsertOrUpdate(BillModel BillModel);

        Task<BillModel> InsertOrUpdate2(BillModel BillModel);
        BillModel UpdateBill(BillModel BillModel);

        NoteModel InsertOrUpdateNote(NoteModel NoteModel);
        bool DeleteBill(int id);
        bool CheckIsBillExist(int id);
        List<BillPlaceModel> GetBillPlaces();
        List<PaymentTypeModel> GetBillPaymentType();
        List<BillTypeModel> GetBillTypes();
        Task<PagedData<BillModel>> BillListPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", BillModel searchBillVm = null, string type = null);
        Task<PagedData<BillModel>> BillListFinshedPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", BillModel searchBillVm = null, string type = null);

        Task<PagedData<BillModel>> BillWaitPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", BillModel searchBillVm = null, string type = null);

        Task<PagedData<BillModel>> BillReportPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", BillModel searchBillVm = null, string component = null, string All = "");


        Task<BillReportTotalsModel> BillReportTotalsTodayPaginationAsync(string From = "", string To = "", BillModel searchBillVm = null, string component = null, string All = "");

        Task<BillReportTotalsModel> BillReportTotalsPaginationAsync(string From = "", string To = "", BillModel searchBillVm = null, string component = null, string All = "");
        Task<PagedData<BillModel>> BillReportPaginationByTimeAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", BillModel searchBillVm = null, string component = null,string TypeDate="", string All = "");
        Task<BillReportTotalsModel> BillReportTotalsPaginationTimeAsync(string From = "", string To = "", BillModel searchBillVm = null, string component = null, string All = "");

        Task<PagedData<BillModel>> GetBillByidPaginated(int? Id = 0);

        void PrintBill(BillModel BillModel);
        int LastBill(DateTime date);
    }
}
