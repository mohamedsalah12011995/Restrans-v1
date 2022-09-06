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
    [Route("api/Currencise")]
    public class CurrenciseController : Controller
    {
        private ICurrenciseService CurrenciseService;

        public CurrenciseController(ICurrenciseService _CurrenciseService)
        {
            CurrenciseService = _CurrenciseService;
        }
        // GET: api/Currencise
        [HttpGet]
        [Route("GetCurrencise")]
        public IEnumerable<CurrenciesModel> GetCurrencises()
        {
            return CurrenciseService.GetCurrencise();
        }

        // GET: api/Currencise/5
        [HttpGet]
        [Route("GetCurrencisebyId")]
        public CurrenciesModel GetCurrenciseByid(int id)
        {
            return CurrenciseService.GetCurrencyByid(id);
        }


        // POST: api/InsertOrUpdateCurrencise
        [HttpPost]
        [Route("InsertOrUpdateCurrencise")]
        public void Post([FromBody] CurrenciesModel CurrenciseModel)
        {
            CurrenciseService.InsertOrUpdate(CurrenciseModel);
        }


        [HttpDelete]
        [Route("DeleteCurrencise")]
        public void Delete(int id)
        {
            CurrenciseService.DeleteCurrency(id);
        }

    }
}
