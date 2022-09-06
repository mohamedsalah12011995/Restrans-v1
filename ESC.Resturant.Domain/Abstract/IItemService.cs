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
    public interface IItemService
    {
        List<ItemModel> GetItems();
        object GetItemsByInvoise();
        ItemModel GetItemByid(int id);
        ItemModel InsertOrUpdate(ItemModel itemModel);
        bool DeleteItem(int id);
        bool CheckIsItemExist(int id);
        List<ItemModel> GetItemsForCategory(int categoryid);
        List<ItemModel> GetAllItemIsForSell(string key);
        List<ItemModel> GetPurchacedItembyName(string key);
        List<ItemModel> GetPurchacedItembyCode(string key);

        Task<PagedData<ItemModel>> ItemListPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", ItemModel searchItemVm = null,string type="");
        Task<PagedData<ItemModel>> GetItemByidPaginated(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string type = "");

    }
}
