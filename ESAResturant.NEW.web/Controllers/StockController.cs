using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ESAResturant.NEW.web.Controllers
{
    [Route("api/Stock")]
    [ApiController]
    public class StockController : Controller
    {

        private IStockService StockService;
        public StockController(IStockService _StockService)
        {
            StockService = _StockService;
        }
        // GET: api/Stock/GetStocks
        [HttpGet]
        [Route("GetStocks")]
        public IEnumerable<StockModel> GetStocks()
        {
            return StockService.GetStocks();
        }

        // GET: api/Stock/GetStock/{id}
        [HttpGet]
        [Route("GetStock")]
        public StockModel GetStock(int id)
        {
            return StockService.GetStock(id);
        }

        // POST: api/Stock/InsertOrUpdateStock
        [HttpPost]
        [Route("InsertOrUpdateStock")]
        public void Post([FromBody] StockModel stockModel)
        {
            StockService.InsertOrUpdate(stockModel);
        }

        // Delete: api/Stock/DeleteStock/{id}
        [HttpDelete]
        [Route("DeleteStock")]
        public void Delete(int id)
        {
            StockService.DeleteStock(id);
        }

    }
}
