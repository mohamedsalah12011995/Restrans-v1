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
    public interface IApplicationService
    {
        List<ApplicationModel> GetApplications();
        ApplicationModel GetApplicationByid(int id);
        ApplicationModel InsertOrUpdate(ApplicationModel ApplicationModel);
        bool DeleteApplication(int id);
        bool CheckIsApplicationExist(int id);
    }
}
