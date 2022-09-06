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
    [Route("api/Application")]
    public class ApplicationController : Controller
    {
        private IApplicationService ApplicationService;

        public ApplicationController(IApplicationService _ApplicationService)
        {
            ApplicationService = _ApplicationService;
        }
        // GET: api/Application
        [HttpGet]
        [Route("GetApplications")]
        public IEnumerable<ApplicationModel> GetApplication()
        {
            return ApplicationService.GetApplications();
        }

        // GET: api/Application/5
        [HttpGet]
        [Route("GetApplicationbyId")]
        public ApplicationModel GetApplicationByid(int id)
        {
            return ApplicationService.GetApplicationByid(id);
        }


        // POST: api/InsertOrUpdateApplication
        [HttpPost]
        [Route("InsertOrUpdateApplication")]
        public void Post([FromBody] ApplicationModel ApplicationModel)
        {
            ApplicationService.InsertOrUpdate(ApplicationModel);
        }


        [HttpDelete]
        [Route("DeleteApplication")]
        public void Delete(int id)
        {
            ApplicationService.DeleteApplication(id);
        }

    }
}
