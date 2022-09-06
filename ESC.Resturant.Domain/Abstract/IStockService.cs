using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Abstract
{
    public interface IStockService
    {
        List<StockModel> GetStocks();
        StockModel GetStock(int Id);
        StockModel InsertOrUpdate(StockModel stock);
        bool DeleteStock(int id);
        bool CheckIsStockExist(int id);
    }
}
