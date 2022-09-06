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
    [Route("api/BoxMonies")]
    public class BoxMoniesController : ControllerBase
    {
        private readonly IBoxMoniesService boxMoniesService;

        public BoxMoniesController(IBoxMoniesService _boxMoniesServer)
        {
            boxMoniesService = _boxMoniesServer;
        }

        // GET: api/BoxMonies
        [HttpGet]
        [Route("GetBoxMonies")]
        public IEnumerable<BoxMoneisModel> GetBoxMoniess(DateTime date_from, DateTime date_to)
        {
            return boxMoniesService.GetBoxMonies(date_from, date_to);
        }

        // GET: api/BoxMonies
        [HttpGet]
        [Route("GetBoxMoniesByDay")]
        public List<BoxMoneisModel> GetBoxMoniesByDay(DateTime From, DateTime To)
        {
            return boxMoniesService.GetBoxMoniesByDay(From,To);
        }

        // POST: api/BoxMonies
        [HttpPost]
        [Route("InsertOrUpdateBoxMonies")]
        public void Post([FromBody] BoxMoneisModel boxMoneis)
        {
            boxMoniesService.InsertOrUpdate(boxMoneis);
        }

        [HttpGet]
        [Route("GetBoxMonybyId")]
        public BoxMoneisModel GetBoxMonybyId(int id)
        {
            return boxMoniesService.GetBoxMoniesByid(id);
        }

        [HttpPost]
        [Route("BoxMoniesPaginated")]
        public async Task<object> BillReportPaginatedAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", DateTime? From = null, DateTime? To = null,int boxMonyTypeId=0,  BoxMoneisModel boxMonyVM = null)
        {
            return await boxMoniesService.BoxMoniesPaginatedAsync(pageIndex, pageSize, searchString, SortKey, sortOrderBY, From, To, boxMonyTypeId, boxMonyVM);
        }
    }
}