﻿using ESC.Resturant.Data.Entities;
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
    public interface IUserTypeService
    {
        List<UserTypeModel> GetUserTypes();
        UserTypeModel GetUserTypeByid(int id);
        UserTypeModel InsertOrUpdate(UserTypeModel UserTypeModel);
        bool DeleteUserType(int id);
        bool CheckIsUserTypeExist(int id);
    }
}
