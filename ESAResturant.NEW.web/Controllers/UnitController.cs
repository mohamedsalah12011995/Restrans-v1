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
    [Route("api/Unit")]
    public class UnitController : Controller
    {
        private IUnitService UnitService;

        public UnitController(IUnitService _UnitService)
        {
            UnitService = _UnitService;
        }
        // GET: api/Unit
        [HttpGet]
        [Route("GetUnits")]
        public IEnumerable<UnitModel> GetUnit()
        {
            return UnitService.GetUnits();
        }

        // GET: api/Unit/5
        [HttpGet]
        [Route("GetUnitbyId")]
        public UnitModel GetUnitByid(int id)
        {
            return UnitService.GetUnitByid(id);
        }


        // POST: api/InsertOrUpdateUnit
        [HttpPost]
        [Route("InsertOrUpdateUnit")]
        public void Post([FromBody] UnitModel UnitModel)
        {
            UnitService.InsertOrUpdate(UnitModel);
        }


        [HttpDelete]
        [Route("DeleteUnit")]
        public void Delete(int id)
        {
            UnitService.DeleteUnit(id);
        }

    }
}
