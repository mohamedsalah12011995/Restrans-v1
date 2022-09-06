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
    [Route("api/ItemSize")]
    public class ItemSizeController : Controller
    {
        private IItemSizeService ItemSizeServer;

        public ItemSizeController(IItemSizeService _ItemSizeServer)
        {
            ItemSizeServer = _ItemSizeServer;
        }
        // GET: api/ItemSize
        [HttpGet]
        [Route("GetItemSizes")]
        public IEnumerable<ItemSizeModel> GetItemSizes()
        {
            return ItemSizeServer.GetItemSizes();
        }

        // GET: api/ItemSize/5
        [HttpGet]
        [Route("GetItemSizebyId")]
        public ItemSizeModel GetItemSizeByid(int id)
        {
            return ItemSizeServer.GetItemSizeByid(id);
        }


        // POST: api/Item
        [HttpPost]
        [Route("InsertOrUpdateItemSize")]
        public void Post([FromBody] ItemSizeModel ItemSizeModel)
        {
            ItemSizeServer.InsertOrUpdate(ItemSizeModel);
        }


        [HttpDelete]
        [Route("DeleteItemSize")]
        public void Delete(int id)
        {
            ItemSizeServer.DeleteItemSize(id);
        }

    }
}
