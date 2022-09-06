using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Concrete;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ESAResturant.NEW.web.Controllers
{
    [Route("api/User")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService _UserServer)
        {
            userService = _UserServer;
        }

        // GET: api/User
        [HttpGet]
        [Route("GetUsers")]
        public IEnumerable<UserModel> GetUsers()
        {
            return userService.GetUser();
        }

        // POST: api/User
        [HttpPost]
        [Route("InsertOrUpdateUser")]
        public void Post([FromBody] UserModel Users)
        {
            userService.InsertOrUpdate(Users);
        }

        [HttpGet]
        [Route("Check_Login")]
        public ActionResult Check_Login(string name, string pass)
       {
            var user = userService.CheckUerLogin(name, pass);
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return Ok(false);
            }

        }
    }
}