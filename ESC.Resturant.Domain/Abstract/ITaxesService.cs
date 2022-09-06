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
    public interface ITaxesService
    {
        List<TaxesModel> GetTaxes();
        TaxesModel GetTaxesByid(int id);
        TaxesModel InsertOrUpdate(TaxesModel TaxesModel);
        bool DeleteTaxes(int id);
        bool CheckIsTaxesExist(int id);
    }
}
