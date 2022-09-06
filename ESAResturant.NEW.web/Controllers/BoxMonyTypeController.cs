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
    [Route("api/BoxMonyType")]
    [ApiController]
    public class BoxMonyTypeController : ControllerBase
    {

        private IBoxMonyTypeService BoxMonyTypeServer;

        public BoxMonyTypeController(IBoxMonyTypeService _BoxMonyTypeServer)
        {
            BoxMonyTypeServer = _BoxMonyTypeServer;
        }

        // GET: api/GetBoxMonyType
        [HttpGet]
        [Route("GetBoxMonyTypes")]
        public IEnumerable<BoxMonyTypeModel> GetBoxMonyType()
        {
            return BoxMonyTypeServer.GetBoxMonyType();
        }


        // GET: api/BoxMonyType/5
        [HttpGet("{id}")]
        [Route("GetBoxMonyTypeByid")]
        public BoxMonyTypeModel GetBoxMonyTypeByid(int id)
        {
            return BoxMonyTypeServer.GetBoxMonyTypeByid(id);
        }

        // POST: api/BoxMonyType
        [HttpPost]
        [Route("InsertOrUpdateBoxMonyType")]

        public void Post([FromBody] BoxMonyTypeModel boxMonyTypeModel)
        {
            BoxMonyTypeServer.InsertOrUpdate(boxMonyTypeModel);
        }


    }
}
