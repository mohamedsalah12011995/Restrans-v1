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
    [Route("api/[controller]")]
    [ApiController]
    public class UserDateController : ControllerBase
    {

        private IUserDateService UserDateServer;

        public UserDateController(IUserDateService _UserDateServer)
        {
            UserDateServer = _UserDateServer;
        }


        //[HttpPost]
        //[Route("InsertOrUpdateUserDate")]
        //public UserDateModel GetUserDateAsync(UserDateModel userDate)
        //{
        //    return UserDateServer.InsertOrUpdateUserDate(userDate);
        //}

        [HttpPost("InsertOrUpdateUserDate")]
        public UserDateModel InsertOrUpdateUserDate(UserDateModel userDate)
        {
            
            return UserDateServer.InsertOrUpdateUserDate(userDate);
        }

        [HttpGet]
        [Route("GetUserDateModelByUserId")]
        public UserDateModel GetUserDateAsync(string User)
        {
            return UserDateServer.GetUserDateModelByUserId(User);
        }

    }
}
