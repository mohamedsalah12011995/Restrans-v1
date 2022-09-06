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
    public interface IDiscountTypeService
    {
        List<DiscountTypeModel> GetDiscountTypes();
        DiscountTypeModel GetDiscountTypeByid(int id);
        DiscountTypeModel InsertOrUpdate(DiscountTypeModel DiscountTypeModel);
        bool DeleteDiscountType(int id);
        bool CheckIsDiscountTypeExist(int id);
    }
}
