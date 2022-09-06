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
    public interface IBranchesService
    {
        List<BranchModel> GetBranches();
        BranchModel GetBranchByid(int id);
        BranchModel InsertOrUpdate(BranchModel branchModel);
        bool DeleteBranch(int id);
        bool CheckIsBranchExist(int id);
    }
}
