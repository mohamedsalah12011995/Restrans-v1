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
    [Route("api/Branches")]
    public class BranchesController : Controller
    {
        private IBranchesService BranchesService;

        public BranchesController(IBranchesService _BranchesService)
        {
            BranchesService = _BranchesService;
        }
        // GET: api/Branches
        [HttpGet]
        [Route("GetBranches")]
        public IEnumerable<BranchModel> GetBranches()
        {
            return BranchesService.GetBranches();
        }

        // GET: api/branch/5
        [HttpGet]
        [Route("GetBranchById")]
        public BranchModel GetBranchByid(int id)
        {
            return BranchesService.GetBranchByid(id);
        }


        // POST: api/InsertOrUpdatebranch
        [HttpPost]
        [Route("InsertOrUpdateBranch")]
        public void Post([FromBody] BranchModel branchModel)
        {
            BranchesService.InsertOrUpdate(branchModel);
        }


        [HttpDelete]
        [Route("DeleteBranch")]
        public void Delete(int id)
        {
            BranchesService.DeleteBranch(id);
        }

    }
}
