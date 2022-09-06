using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Abstract
{
    public interface IItemSizeService
    {
        List<ItemSizeModel> GetItemSizes();
        ItemSizeModel GetItemSizeByid(int id);
        ItemSizeModel InsertOrUpdate(ItemSizeModel itemModel);
        bool DeleteItemSize(int id);
        bool CheckIsItemSizeExist(int id);
    }
}
