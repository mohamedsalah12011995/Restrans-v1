using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Abstract
{
    public interface IUserDateService
    {
        UserDateModel GetUserDateModelByUserId(string id);
        UserDateModel InsertOrUpdateUserDate(UserDateModel userDate);
    }
}
