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
    [Route("api/CompanyInfo")]
    public class CompanyInfoController : Controller
    {
        private ICompanyInfoService CompanyInfoService;

        public CompanyInfoController(ICompanyInfoService _CompanyInfoService)
        {
            CompanyInfoService = _CompanyInfoService;
        }
        // GET: api/CompanyInfo
        [HttpGet]
        [Route("GetCompanyInfo")]
        public IEnumerable<CompanyInfoModel> GetCompanyInfo()
        {
            return CompanyInfoService.GetCompanyInfo();
        }




        // POST: api/InsertOrUpdateTaxes
        [HttpPost]
        [Route("InsertOrUpdateCompanyInfo")]
        public void Post([FromBody] CompanyInfoModel companyInfo)
        {
            CompanyInfoService.InsertOrUpdate(companyInfo);
        }

    }
}
