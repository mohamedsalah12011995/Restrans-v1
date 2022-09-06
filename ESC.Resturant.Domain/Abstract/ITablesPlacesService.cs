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
    public interface ITablesPlacesService
    {
        List<TablesPlacesModel> GetTablesPlaces();
        TablesPlacesModel GetTablesPlacesByid(int id);
        TablesPlacesModel InsertOrUpdate(TablesPlacesModel tablesPlacesModel);
        bool DeleteTablesPlaces(int id);
        bool CheckIsTablesPlacesExist(int id);
    }
}
