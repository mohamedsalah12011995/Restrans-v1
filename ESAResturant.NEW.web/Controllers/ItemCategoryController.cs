using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ESC.Resturant.Domain.Concrete;
using ESC.Resturant.Domain.Models;
using ESC.Resturant.Domain.Abstract;

namespace ESAResturant.NEW.web.Controllers
{
    [Route("api/ItemCategory")]
    public class ItemCategoryController : Controller
    {
        private IItemCategoryService itemCategoryService;
        public ItemCategoryController(IItemCategoryService _itemCategoryService)
        {
            itemCategoryService = _itemCategoryService;
        }

        // GET: api/ItemCategory
        [HttpGet]
        [Route("GetAllItemCategories")]
        public IEnumerable<ItemCategoryModel> GetAllItemCategory()
        {

            return itemCategoryService.GetAllItemCategory();
        }

        // GET: api/ItemCategory/5
        [HttpGet]
        [Route("GetItemCategoryById")]
        public ItemCategoryModel GetItemCategoryById(int id)
        {
            return itemCategoryService.GetItemCategoryBy(id);
        }

        // POST: api/ItemCategory
        [HttpPost]
        [Route("InsertOrUpdateItemCategory")]
        public void InsertOrUpdatePrinter([FromBody] ItemCategoryModel itemCategoryModel)
        {
            itemCategoryService.InsertOrUpdate(itemCategoryModel);
        }




        [HttpDelete]
        [Route("DeleteItemCategory")]
        public void Delete(int id)
        {
            itemCategoryService.DeleteItemCategory(id);
        }
        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //    itemCategoryService.DeleteItemCategory(id);
        //}

        //// PUT: api/ItemCategory/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}
    }
}
