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
    [Route("api/UserType")]
    public class UserTypeController : Controller
    {
        private IUserTypeService UserTypeService;

        public UserTypeController(IUserTypeService _UserTypeService)
        {
            UserTypeService = _UserTypeService;
        }
        // GET: api/UserType
        [HttpGet]
        [Route("GetUserTypes")]
        public IEnumerable<UserTypeModel> GetUserType()
        {
            return UserTypeService.GetUserTypes();
        }

        // GET: api/UserType/5
        [HttpGet]
        [Route("GetUserTypebyId")]
        public UserTypeModel GetUserTypeByid(int id)
        {
            return UserTypeService.GetUserTypeByid(id);
        }


        // POST: api/InsertOrUpdateUserType
        [HttpPost]
        [Route("InsertOrUpdateUserType")]
        public void Post([FromBody] UserTypeModel UserTypeModel)
        {
            UserTypeService.InsertOrUpdate(UserTypeModel);
        }


        [HttpDelete]
        [Route("DeleteUserType")]
        public void Delete(int id)
        {
            UserTypeService.DeleteUserType(id);
        }

    }
}
