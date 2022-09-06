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
    public interface ICurrenciseService
    {
        List<CurrenciesModel> GetCurrencise();
        CurrenciesModel GetCurrencyByid(int id);
        CurrenciesModel InsertOrUpdate(CurrenciesModel CurrensiesModel);
        bool DeleteCurrency(int id);
        bool CheckIsCurrencyExist(int id);
    }
}
