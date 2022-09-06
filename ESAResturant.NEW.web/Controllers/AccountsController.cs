using AutoMapper;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Helpers;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ESA.Web.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AccountsController : Controller
    {
        private readonly IAccountsService _accountservice;
        private readonly IUserDateService _userDateService;

        public AccountsController(IAccountsService accountservice, IUserDateService userDateService )
        {
            _accountservice = accountservice;
            _userDateService = userDateService;
        }

        /// <summary>
        /// Create  new Staff  User With Roles Array 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        //POST api/accounts
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> CreateUserAsync([FromBody]ApplicationUserModel model)
        {
            if (model.IsNewUser) //if new user create new one 
            {
               var result =    await _accountservice.CreateUserAsync(model);
               return Ok(result);                
            }            
            else   //if not new Update this user 
            {
                if (_accountservice.UpdateUser(model))
                { return Ok(true); }
                else
                { return Ok(false); }

            }
        }










        /// <summary>
        /// All Staff Users 
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="searchString"></param>
        /// <param name="SortKey"></param>
        /// <param name="sortOrderBY"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetAllUersPaginated")]
        public PagedData<ApplicationUserModel> PagginatedUsers(int? pageIndex, int? pageSize, string searchString, string SortKey, string sortOrderBY,string UserName )
        {
            return _accountservice.GetUserListPaginated(pageIndex, pageSize, searchString, SortKey, sortOrderBY, UserName);
        }


        /// <summary>
        /// Login And Get Jwt Token 
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        // POST api/auth/login
        [HttpPost]
        [Route("login")]
        public UserTokenModel Post([FromBody] LoginModel loginModel)
        {
            var UserToken = _accountservice.GetUerToken(loginModel);
            if (UserToken == null)
            {
                return null;
            }
            return UserToken;
        }




        [HttpGet]
        [Route("GetUerProfilebyusername")]
        public async Task<ApplicationUserModel> GetUserProfileAsync(string UserName)
        {
            return await _accountservice.GetUserProfileByUserNameAsync(UserName);
        }




        [HttpGet]
        [Route("GetUerProfilebyemail")]
        public async Task<ApplicationUserModel> GetUserProfilebyemailAsync(string Email)
        {
            return await _accountservice.GetUserProfileByEmailAsync(Email);
        }




        [HttpGet]
        [Route("GetAllUers")]
        public List<ApplicationUserModel> GetUsers( )
        {
            return _accountservice.GetAllUsers();
        }


        //[HttpPost]
        //[Route("CheckResetToken")]
        //public bool CheckResetPasswordToken([FromBody]ResetPasswordModel model)
        //{
        //        if (_accountservice.CheckTokenResetTokenValidity(model.Email ,model.Code))
        //        { return true; }
        //        else
        //        { return false; }
        //}


        [HttpGet]
        [Route("ForgetPassword")]
        public async Task<bool> ForgetPasswordAsync(string email)
        {
            if (await  _accountservice.SendResetPasswordEmailAsync(email))
            { return true; }
            else
            { return false; }
        }


        [HttpPost]
        [Route("ChangePassword")]
        public bool ResetPassword([FromBody]ChangePasswordModel model)
        {
            if (_accountservice.ChangePassword(model))
            { return true; }
            else
            { return false; }
        }


        [HttpGet]
        [Route("DeleteUser")]
        public bool DeleteNote(string userName)
        {
          //  _accountservice.DeleteUser(userModel);

            if ( _accountservice.DeleteUser(userName))
            { return true; }
            else
            { return false; }
        }

    }
}
