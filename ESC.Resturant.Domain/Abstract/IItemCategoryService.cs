using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Abstract
{
    /// <summary>
    /// IPrinterService interface 
    /// Define Methods Signture 
    /// </summary>
    public interface IItemCategoryService
    {

        List<ItemCategoryModel> GetAllItemCategory( );

        ItemCategoryModel GetItemCategoryBy(int id);

        /// <summary>
        /// Insert or update ItemCategory depend on printer id if =0 
        /// </summary>
        /// <param name="ItemCategory"></param>
        /// <returns></returns>
        ItemCategoryModel InsertOrUpdate(ItemCategoryModel ItemCategoryModel);

        bool DeleteItemCategory(int id);
        bool CheckIsItemCategoryExist(int id);

    }
}
