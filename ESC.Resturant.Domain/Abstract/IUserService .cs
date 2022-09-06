using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Abstract
{
    /// <summary>
    /// IBillService interface 
    /// Define Methods Signture 
    /// </summary>
    public interface IUserService
    {
        List<UserModel> GetUser();
        UserModel GetUserByid(int id);
        UserModel InsertOrUpdate(UserModel boxMonyModel);
        bool DeleteUser(int id);
        bool CheckIsUserExist(int id);
        UserModel CheckUerLogin(string username ,string pass );

    }
}
