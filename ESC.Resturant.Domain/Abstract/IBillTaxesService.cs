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
    public interface IBillTaxesService
    {
        List<BillTaxesModel> GetBillTaxes();
        BillTaxesModel GetBillTaxesByid(int id);
        BillTaxesModel InsertOrUpdate(BillTaxesModel BillTaxesModel);
        bool DeleteBillTaxes(int id);
        bool CheckIsBillTaxesExist(int id);
    }
}
