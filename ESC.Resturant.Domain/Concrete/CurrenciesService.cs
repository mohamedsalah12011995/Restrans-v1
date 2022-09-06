using AutoMapper;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using ESC.Resturant.Data.Context;


namespace ESC.Resturant.Domain.Concrete
{
    public class CurrenciesService : BaseService, ICurrenciseService
    {
        public CurrenciesService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsCurrencyExist(int id)
        {
            return dbcontext.Currencies.Any(e => e.Id == id);
        }


        public bool DeleteCurrency(int id)
        {
            try
            {
                ///get obj for delete 
                var Currensies = dbcontext.Currencies.Find(id);

                ///remove obj from db context 
                dbcontext.Currencies.Remove(Currensies);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public List<CurrenciesModel> GetCurrencise()
        {
            try
            {
                ///retrive list of Application (Entities).
                var listCurrensies = dbcontext.Currencies.ToList();
                ///cast entities to models 
                var CurrensiesModelList = mapper.Map<List<CurrenciesModel>>(listCurrensies);

                ///return models 
                return CurrensiesModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public CurrenciesModel GetCurrencyByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var Currensies = dbcontext.Currencies.Find(id);
                ///cast entitiy to model 
                var CurrensiesModel = mapper.Map<CurrenciesModel>(Currensies);

                ///return model
                return CurrensiesModel;
            }
            catch
            {
                return null;
            }
        }

        public CurrenciesModel InsertOrUpdate(CurrenciesModel CurrensiesModel)
        {
            if (CurrensiesModel.Id > 0)  ///Update Currensies
            {
                ///Get Application entity from database by id 
                var Currensies = dbcontext.Currencies.Find(CurrensiesModel.Id);
                if (Currensies != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from Applicationmodel to Application 
                        var mappedCurrensies = mapper.Map<CurrenciesModel, Currencies>(CurrensiesModel, Currensies);
                        dbcontext.Currencies.Update(mappedCurrensies);
                        dbcontext.SaveChanges();

                        //  return true;
                        return CurrensiesModel;
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
                    var mappedCurrensies = mapper.Map<Currencies>(CurrensiesModel);
                    dbcontext.Currencies.Add(mappedCurrensies);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return CurrensiesModel;
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