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
    [Route("api/BillCurrencise")]
    public class BillCurrenciseController : Controller
    {
        private IBillCurrenciesService BillCurrenciseService;

        public BillCurrenciseController(IBillCurrenciesService _BillCurrenciseService)
        {
            BillCurrenciseService = _BillCurrenciseService;
        }
        // GET: api/BillCurrencise
        [HttpGet]
        [Route("GetBillCurrencise")]
        public IEnumerable<BillCurrenciesModel> GetBillCurrencise()
        {
            return BillCurrenciseService.GetBillCurrencies();
        }

        // GET: api/BillCurrencise/5
        [HttpGet]
        [Route("GetBillCurrencisebyId")]
        public BillCurrenciesModel GetBillCurrenciseByid(int id)
        {
            return BillCurrenciseService.GetBillCurrenciesByid(id);
        }


        // POST: api/InsertOrUpdateBillCurrencise
        [HttpPost]
        [Route("InsertOrUpdateBillCurrencise")]
        public void Post([FromBody] BillCurrenciesModel BillCurrenciesModel)
        {
            BillCurrenciseService.InsertOrUpdate(BillCurrenciesModel);
        }


        [HttpDelete]
        [Route("DeleteBillCurrencise")]
        public void Delete(int id)
        {
            BillCurrenciseService.DeleteBillCurrencies(id);
        }

    }
}
