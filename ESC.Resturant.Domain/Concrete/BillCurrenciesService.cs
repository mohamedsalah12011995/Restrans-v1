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
    public class BillCurrenciesService : BaseService, IBillCurrenciesService
    {
        public BillCurrenciesService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsBillCurrenciesExist(int id)
        {
            return dbcontext.BillCurrencies.Any(e => e.Id == id);
        }


        public bool DeleteBillCurrencies(int id)
        {
            try
            {
                ///get obj for delete 
                var BillCurrensies = dbcontext.BillCurrencies.Find(id);

                ///remove obj from db context 
                dbcontext.BillCurrencies.Remove(BillCurrensies);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public List<BillCurrenciesModel> GetBillCurrencies()
        {
            try
            {
                ///retrive list of Application (Entities).
                var listBillCurrensies = dbcontext.BillCurrencies.Include(f=> f.Bill).Include(f=> f.Currencies).Where(b=> b.IsSelected==true).ToList();
                //var listBillCurrensies = dbcontext.BillCurrencies.Include(f=> f.Bill).Include(f=> f.Currencies).Where(b=> b.IsSelected==true).GroupBy(f=> f.CurrencyId).ToList();
                ///cast entities to models 
                var BillCurrensiesModelList = mapper.Map<List<BillCurrenciesModel>>(listBillCurrensies);

                ///return models 
                return BillCurrensiesModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public BillCurrenciesModel GetBillCurrenciesByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var BillCurrensies = dbcontext.BillCurrencies.Find(id);
                ///cast entitiy to model 
                var BillCurrensiesModel = mapper.Map<BillCurrenciesModel>(BillCurrensies);

                ///return model
                return BillCurrensiesModel;
            }
            catch
            {
                return null;
            }
        }

        public BillCurrenciesModel InsertOrUpdate(BillCurrenciesModel BillCurrensiesModel)
        {
            if (BillCurrensiesModel.Id > 0)  ///Update BillCurrensies
            {
                ///Get Application entity from database by id 
                var BillCurrensies = dbcontext.BillCurrencies.Find(BillCurrensiesModel.Id);
                if (BillCurrensies != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from Applicationmodel to Application 
                        var mappedBillCurrensies = mapper.Map<BillCurrenciesModel, BillCurrencies>(BillCurrensiesModel, BillCurrensies);
                        dbcontext.BillCurrencies.Update(mappedBillCurrensies);
                        dbcontext.SaveChanges();

                        //  return true;
                        return BillCurrensiesModel;
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
                    var mappedBillCurrensies = mapper.Map<BillCurrencies>(BillCurrensiesModel);
                    dbcontext.BillCurrencies.Add(mappedBillCurrensies);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return BillCurrensiesModel;
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