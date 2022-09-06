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
    [Route("api/BoxMonyCategory")]
    [ApiController]
    public class BoxMonyCategoryController : ControllerBase
    {

        private IBoxMonyCategoryService BoxMonyCategoryServer;

        public BoxMonyCategoryController(IBoxMonyCategoryService _BoxMonyCategoryServer)
        {
            BoxMonyCategoryServer = _BoxMonyCategoryServer;
        }

        // GET: api/BoxMonyCategory
        [HttpGet]
        [Route("GetBoxMonyCategories")]
        public IEnumerable<BoxMonyCategoriesModel> GetBoxMonyCategories()
        {
          return  BoxMonyCategoryServer.GetBoxMonyCategories();
        }
        // GET: api/GetBoxMonyTypes
        [HttpGet]
        [Route("GetBoxMonyTypes")]
        public IEnumerable<BoxMonyTypeModel> GetBoxMonyType()
        {
            return BoxMonyCategoryServer.GetBoxMonyType();
        }

        // GET: api/BoxMonyCategory/5
        [HttpGet("{id}")]
        [Route("GetBoxMonyCategoryByid")]
        public BoxMonyCategoriesModel GetBoxMonyCategoryByid(int id)
        {
          return  BoxMonyCategoryServer.GetBoxMonyCategoryByid(id);
        }

        // POST: api/BoxMonyCategory
        [HttpPost]
        [Route("InsertOrUpdateBoxMonyCategory")]

        public void Post([FromBody] BoxMonyCategoriesModel boxMonyCategoryModel)
        {
            BoxMonyCategoryServer.InsertOrUpdate(boxMonyCategoryModel);
        }



        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [Route("InsertOrUpdateBoxMonyCategory")]

        public void Delete(int id)
        {
            BoxMonyCategoryServer.DeleteBoxMonyCategory(id);
        }
    }
}
