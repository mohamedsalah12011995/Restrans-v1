using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Abstract
{
    /// <summary>
    /// IBillService interface 
    /// Define Methods Signture 
    /// </summary>
    public interface IBoxMoniesService
    {
        List<BoxMoneisModel> GetBoxMonies(DateTime date_from, DateTime date_to);
        List<BoxMoneisModel> GetBoxMoniesByDay(DateTime From, DateTime To);
        BoxMoneisModel GetBoxMoniesByid(int id);
        BoxMoneisModel InsertOrUpdate(BoxMoneisModel boxMonyModel);
        Task<object> BoxMoniesPaginatedAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", DateTime? From = null, DateTime? To = null,int boxMonyTypeId=0, BoxMoneisModel boxMoneis = null);

        bool DeleteBoxMonies(int id);
        bool CheckIsBoxMoniesExist(int id);


    }
}
