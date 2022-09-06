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
    [Route("api/Taxes")]
    public class TaxesController : Controller
    {
        private ITaxesService TaxesService;

        public TaxesController(ITaxesService _TaxesService)
        {
            TaxesService = _TaxesService;
        }
        // GET: api/Taxes
        [HttpGet]
        [Route("GetTaxes")]
        public IEnumerable<TaxesModel> GetTaxes()
        {
            return TaxesService.GetTaxes();
        }

        // GET: api/Taxes/5
        [HttpGet]
        [Route("GetTaxesbyId")]
        public TaxesModel GetTaxesByid(int id)
        {
            return TaxesService.GetTaxesByid(id);
        }


        // POST: api/InsertOrUpdateTaxes
        [HttpPost]
        [Route("InsertOrUpdateTaxes")]
        public void Post([FromBody] TaxesModel TaxesModel)
        {
            TaxesService.InsertOrUpdate(TaxesModel);
        }


        [HttpDelete]
        [Route("DeleteTaxes")]
        public void Delete(int id)
        {
            TaxesService.DeleteTaxes(id);
        }

    }
}
