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
    public interface IBoxMonyTypeService
    {
        List<BoxMonyTypeModel> GetBoxMonyType();
        BoxMonyTypeModel GetBoxMonyTypeByid(int id);
        BoxMonyTypeModel InsertOrUpdate(BoxMonyTypeModel boxMonyType);
        bool DeleteBoxMonyType(int id);
        bool CheckIsBoxMonyTypeExist(int id);
    }
}
