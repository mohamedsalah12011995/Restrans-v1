using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Concrete;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ESAResturant.NEW.web.Controllers
{
    [Route("api/TablesPlaces")]
    public class TablesPlacesController : Controller
    {
        private ITablesPlacesService TablesPlacesService;

        public TablesPlacesController(ITablesPlacesService _TablesPlacesService)
        {
            TablesPlacesService = _TablesPlacesService;
        }
        // GET: api/TablesPlaces
        [HttpGet]
        [Route("GetTablesPlaces")]
        public List<TablesPlacesModel> BillReportPaginatedAsync()
        {
            return TablesPlacesService.GetTablesPlaces();
        }

        // GET: api/TablesPlaces/5
        [HttpGet]
        [Route("GetTablesPlacesbyId")]
        public TablesPlacesModel GetTablesPlacesByid(int id)
        {
            return TablesPlacesService.GetTablesPlacesByid(id);
        }


        // POST: api/InsertOrUpdateTablesPlaces
        [HttpPost]
        [Route("InsertOrUpdateTablesPlaces")]
        public void Post([FromBody] TablesPlacesModel TablesPlacesModel)
        {
            TablesPlacesService.InsertOrUpdate(TablesPlacesModel);
        }


        [HttpDelete]
        [Route("DeleteTablesPlaces")]
        public void Delete(int id)
        {
            TablesPlacesService.DeleteTablesPlaces(id);
        }

    }
}
