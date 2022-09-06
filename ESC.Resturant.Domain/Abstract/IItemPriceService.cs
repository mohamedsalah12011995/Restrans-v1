using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Abstract
{
    public interface IItemPricesService
    {
        List<ItemPricesModel> GetItemPrices();
        ItemPricesModel GetItemPriceByid(int id);
        List <ItemPricesModel> GetItemPriceByItemid(int id);
        ItemPricesModel InsertOrUpdate(ItemPricesModel itemModel);
        bool DeleteItemPrice(int id);
        bool CheckIsItemPriceExist(int id);
    }
}
