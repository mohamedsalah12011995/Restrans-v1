using AutoMapper;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using ESC.Resturant.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace ESC.Resturant.Domain.Concrete
{
    public class BranchesService : BaseService, IBranchesService
    {
        public BranchesService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsBranchExist(int id)
        {
            return dbcontext.Branches.Any(e => e.Id == id);
        }

        public bool DeleteBranch(int id)
        {
            try
            {
                ///get obj for delete 
                var Branch = dbcontext.Branches.Find(id);

                ///remove obj from db context 
                dbcontext.Branches.Remove(Branch);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public BranchModel GetBranchByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var Branch = dbcontext.Branches.Find(id);
                ///cast entitiy to model 
                var BranchModel = mapper.Map<BranchModel>(Branch);

                ///return model
                return BranchModel;
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public List<BranchModel> GetBranches()
        {
            try
            {
                ///retrive list of Application (Entities).
                var listBranch = dbcontext.Branches.Include(c=> c.CompanyInfo).Where(b=> b.IsDelete==false).ToList();
                ///cast entities to models 
                var BranchModelList = mapper.Map<List<BranchModel>>(listBranch);

                ///return models 
                return BranchModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public BranchModel InsertOrUpdate(BranchModel BranchModel)
        {
            if (BranchModel.Id > 0)  ///Update Branch
            {
                ///Get Application entity from database by id 
                var Branch = dbcontext.Branches.Find(BranchModel.Id);
                if (Branch != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from Applicationmodel to Application 
                        var mappedBranch = mapper.Map<BranchModel, Branch>(BranchModel, Branch);
                        dbcontext.Branches.Update(mappedBranch);
                        dbcontext.SaveChanges();

                        //  return true;
                        return BranchModel;
                    }
                    catch (Exception)
                    {
                        return null;
                    }


                }
                else { return null; }
            }
            else
            {
                try
                {
                    var mappedBranch = mapper.Map<Branch>(BranchModel);
                    dbcontext.Branches.Add(mappedBranch);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return BranchModel;
                }
                catch
                {
                    return null;
                    //return false; 
                }
            }
        }

    }
}