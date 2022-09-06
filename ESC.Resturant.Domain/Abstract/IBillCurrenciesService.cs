using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Abstract
{
    /// <summary>
    /// IBillService interface 
    /// Define Methods Signture 
    /// </summary>
    public interface IBillCurrenciesService
    {
        List<BillCurrenciesModel> GetBillCurrencies();
        BillCurrenciesModel GetBillCurrenciesByid(int id);
        BillCurrenciesModel InsertOrUpdate(BillCurrenciesModel BillCurrensiesModel);
        bool DeleteBillCurrencies(int id);
        bool CheckIsBillCurrenciesExist(int id);
    }
}
