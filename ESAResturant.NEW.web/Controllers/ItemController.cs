using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Helpers;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ESAResturant.NEW.web.Controllers
{
    [Route("api/Item")]
    public class ItemController : Controller
    {
        private IItemService itemServer;




        public ItemController(IItemService _itemServer)
        {
            itemServer = _itemServer;
        }
        // GET: api/Item



        [HttpGet]
        [Route("GetItems")]
        public List<ItemModel> GetItems()
        {
            var item= itemServer.GetItems();
            return item;
        }


        [HttpPost]
        [Route("GetItemsPaginated")]
        public async Task<PagedData<ItemModel>> ItemListPaginatedAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", [FromBody] ItemModel searchBillVm = null,string type="")
        {
            return await itemServer.ItemListPaginationAsync(pageIndex, pageSize, searchString, SortKey, sortOrderBY, searchBillVm, type);
        }


        [HttpPost]
        [Route("GetItemByidPaginated")]
        public async Task<PagedData<ItemModel>> GetItemByidAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string type = "")
        {
            return await itemServer.GetItemByidPaginated(pageIndex, pageSize, searchString, SortKey, sortOrderBY, type);
        }

        // GET: api/Item
        [HttpGet]
        [Route("GetItemsByInvoise")]
        public object GetItemsByInvoise()
        {
            var item = itemServer.GetItemsByInvoise();
            return item;
        }

        // GET: api/GetAllItemIsForSell
        [HttpGet]
        [Route("GetAllItemIsForSell")]
        public object GetAllItemIsForSell(string key)
        {
            var item = itemServer.GetAllItemIsForSell(key);
            return item;
        }



        [HttpGet]
        [Route("GetItemsforcategory")]
        public IEnumerable<ItemModel> GetItemsforcategory(int categoryid)
        {
            return itemServer.GetItemsForCategory(categoryid);
        }

        [HttpGet]
        [Route("GetItembyId")]
        public ItemModel GetItemByid(int id)
        {
            return itemServer.GetItemByid(id);
        }



        // POST: api/Item
        [HttpPost]
        [Route("InsertOrUpdateItem")]
        public async Task<ItemModel> InsertOrUpdate([FromBody] ItemModel itemModel)
        {
            var _item = itemServer.InsertOrUpdate(itemModel);
            return _item;
        }


        [Route("DeleteItem")]
        public bool DeleteItem(int id)
        {
            itemServer.DeleteItem(id);
            return true;
        }

        [HttpGet]
        [Route("GetPurchasedItemsByName")]
        public object GetPurchasedItemsByName(string key)
        {
            var item = itemServer.GetPurchacedItembyName(key);
            return item;
        }





        [HttpGet]
        [Route("GetPurchasedItemsByCode")]
        public object GetPurchasedItemsByCode(string key)
        {
            var item = itemServer.GetPurchacedItembyCode(key);
            return item;
        }

    }
}
