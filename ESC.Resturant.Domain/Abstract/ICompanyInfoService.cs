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
    public interface ICompanyInfoService
    {
        List<CompanyInfoModel> GetCompanyInfo();
        CompanyInfoModel InsertOrUpdate(CompanyInfoModel companyInfoModel);
        bool CheckIsTaxesExist(int id);
    }
}
