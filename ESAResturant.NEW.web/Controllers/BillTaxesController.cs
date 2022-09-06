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
    [Route("api/BillTaxes")]
    public class BillTaxesController : Controller
    {
        private IBillTaxesService BillTaxesService;

        public BillTaxesController(IBillTaxesService _BillTaxesService)
        {
            BillTaxesService = _BillTaxesService;
        }
        // GET: api/BillTaxes
        [HttpGet]
        [Route("GetBillTaxes")]
        public IEnumerable<BillTaxesModel> GetBillTaxes()
        {
            return BillTaxesService.GetBillTaxes();
        }

        // GET: api/BillTaxes/5
        [HttpGet]
        [Route("GetBillTaxesbyId")]
        public BillTaxesModel GetBillTaxesByid(int id)
        {
            return BillTaxesService.GetBillTaxesByid(id);
        }


        // POST: api/InsertOrUpdateBillTaxes
        [HttpPost]
        [Route("InsertOrUpdateBillTaxes")]
        public void Post([FromBody] BillTaxesModel BillTaxesModel)
        {
            BillTaxesService.InsertOrUpdate(BillTaxesModel);
        }


        [HttpDelete]
        [Route("DeleteBillTaxes")]
        public void Delete(int id)
        {
            BillTaxesService.DeleteBillTaxes(id);
        }

    }
}
