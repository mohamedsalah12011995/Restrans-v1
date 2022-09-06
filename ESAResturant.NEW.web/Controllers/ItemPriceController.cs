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
    [Route("api/ItemPrice")]
    public class ItemPriceController : Controller
    {
        private IItemPricesService itemPriceServer;

        public ItemPriceController(IItemPricesService _itemPriceServer)
        {
            itemPriceServer = _itemPriceServer;
        }
        // GET: api/ItemPrice
        [HttpGet]
        [Route("GetItemPrices")]
        public IEnumerable<ItemPricesModel> GetItemPrices()
        {
            return itemPriceServer.GetItemPrices();
        }

        // GET: api/ItemPrice/5
        [HttpGet]
        [Route("GetItemPricebyId")]
        public ItemPricesModel GetItemPriceByid(int id)
        {
            return itemPriceServer.GetItemPriceByid(id);
        }

        // GET: api/ItemPrice/5
        [HttpGet]
        [Route("GetItemPricebyItemId")]
        public List<ItemPricesModel> GetItemPriceByItemid(int id)
        {
            return itemPriceServer.GetItemPriceByItemid(id).ToList();
        }

        // POST: api/Item
        [HttpPost]
        [Route("InsertOrUpdateItemPrice")]
        public void Post([FromBody] ItemPricesModel itemPriceModel)
        {
            itemPriceServer.InsertOrUpdate(itemPriceModel);
        }


        [HttpDelete]
        [Route("DeleteItemPrice")]
        public void Delete(int id)
        {
            itemPriceServer.DeleteItemPrice(id);
        }

    }
}
