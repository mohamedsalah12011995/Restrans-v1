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
    [Route("api/DiscountType")]
    public class DiscountTypeController : Controller
    {
        private IDiscountTypeService DiscountTypeService;

        public DiscountTypeController(IDiscountTypeService _DiscountTypeService)
        {
            DiscountTypeService = _DiscountTypeService;
        }
        // GET: api/DiscountType
        [HttpGet]
        [Route("GetDiscountTypes")]
        public IEnumerable<DiscountTypeModel> GetDiscountType()
        {
            return DiscountTypeService.GetDiscountTypes();
        }

        // GET: api/DiscountType/5
        [HttpGet]
        [Route("GetDiscountTypebyId")]
        public DiscountTypeModel GetDiscountTypeByid(int id)
        {
            return DiscountTypeService.GetDiscountTypeByid(id);
        }


        // POST: api/InsertOrUpdateDiscountType
        [HttpPost]
        [Route("InsertOrUpdateDiscountType")]
        public void Post([FromBody] DiscountTypeModel DiscountTypeModel)
        {
            DiscountTypeService.InsertOrUpdate(DiscountTypeModel);
        }


        [HttpDelete]
        [Route("DeleteDiscountType")]
        public void Delete(int id)
        {
            DiscountTypeService.DeleteDiscountType(id);
        }

    }
}
