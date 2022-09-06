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
    public class CompanyInfoservice : BaseService, ICompanyInfoService
    {
        public CompanyInfoservice(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsTaxesExist(int id)
        {
            return dbcontext.companyInfos.Any(e => e.Id == id);
        }


        public List<CompanyInfoModel> GetCompanyInfo()
        {
            try
            {
                ///retrive list of Application (Entities).
                var listCompany = dbcontext.companyInfos.Include(b=> b.Branch).ToList();
                ///cast entities to models 
                var CompanyModelList = mapper.Map<List<CompanyInfoModel>>(listCompany);

                ///return models 
                return CompanyModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public CompanyInfoModel InsertOrUpdate(CompanyInfoModel CompanyModel)
        {
            if (CompanyModel.Id > 0)  ///Update Company
            {
                ///Get Application entity from database by id 
                var CompanyInfo = dbcontext.companyInfos.Find(CompanyModel.Id);
                if (CompanyInfo != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from Applicationmodel to Application 
                        var mappedCompanyInfo = mapper.Map<CompanyInfoModel, CompanyInfo>(CompanyModel, CompanyInfo);
                        dbcontext.companyInfos.Update(mappedCompanyInfo);
                        dbcontext.SaveChanges();

                        //  return true;
                        return CompanyModel;
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
                    var mappedCompany = mapper.Map<CompanyInfo>(CompanyModel);
                    dbcontext.companyInfos.Add(mappedCompany);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return CompanyModel;
                }
                catch(Exception e)
                {
                    return null;
                    //return false; 
                }
            }
        }

    }
}