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
    [Route("api/BillDelivery")]
    public class BillDeliveryController : Controller
    {
        private IBillDeliveryService BillDeliveryService;

        public BillDeliveryController(IBillDeliveryService _BillDeliveryService)
        {
            BillDeliveryService = _BillDeliveryService;
        }

        // GET: api/BillDelivery
        [HttpGet]
        [Route("GetBillDelivery")]
        public IEnumerable<BillDeliveriesModel> GetBillDelivery()
        {
            return BillDeliveryService.GetAllBillDelivery();
        }

        // POST: api/InsertOrUpdateBillDelivery
        [HttpPost]
        [Route("InsertOrUpdateBillDelivery")]
        public void Post([FromBody] BillDeliveriesModel billDeliveryModel)
        {
            BillDeliveryService.InsertOrUpdate(billDeliveryModel);
        }

    }
}
