using ESC.Resturant.Data.Entities;
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
    public interface IBillDetailsService
    {
        List<BillDetailsModel> GetBillDetails();
        List<BillDetailsModel> GetBillDetailsByid(int id);
        BillDetailsModel InsertOrUpdate(BillDetailsModel BillDetailModel);
        bool DeleteBillDetails(int id);
        bool CheckIsBillExist(int id);
        Task<object> GetItemsGroup(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", DateTime? From = null, DateTime? To = null, BillDetailsModel billDetails = null, string type = null);


    }
}
