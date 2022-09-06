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
    public interface IUnitService
    {
        List<UnitModel> GetUnits();
        UnitModel GetUnitByid(int id);
        UnitModel InsertOrUpdate(UnitModel UnitModel);
        bool DeleteUnit(int id);
        bool CheckIsUnitExist(int id);
    }
}
