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
    public class Taxeservice : BaseService, ITaxesService
    {
        public Taxeservice(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsTaxesExist(int id)
        {
            return dbcontext.Taxes.Any(e => e.Id == id);
        }

        public bool DeleteTaxes(int id)
        {
            try
            {
                ///get obj for delete 
               // var Taxes = dbcontext.Taxes.Find(id);

                ///remove obj from db context 
                //dbcontext.Taxes.Remove(Taxes);

                ///save changes on database 
                //dbcontext.SaveChanges();
                //return true;

                var _Taxes = dbcontext.Taxes.Find(id);
                _Taxes.IsDelete = true;

                dbcontext.Taxes.Update(_Taxes);
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public TaxesModel GetTaxesByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var Taxes = dbcontext.Taxes.Find(id);
                ///cast entitiy to model 
                var TaxesModel = mapper.Map<TaxesModel>(Taxes);

                ///return model
                return TaxesModel;
            }
            catch
            {
                return null;
            }
        }

        public List<TaxesModel> GetTaxes()
        {
            try
            {
                ///retrive list of Application (Entities).
                var listTaxes = dbcontext.Taxes.Where(t=> t.IsDelete==false).ToList();
                ///cast entities to models 
                var TaxesModelList = mapper.Map<List<TaxesModel>>(listTaxes);

                ///return models 
                return TaxesModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public TaxesModel InsertOrUpdate(TaxesModel TaxesModel)
        {
            if (TaxesModel.Id > 0)  ///Update Taxes
            {
                ///Get Application entity from database by id 
                var Taxes = dbcontext.Taxes.Find(TaxesModel.Id);
                if (Taxes != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from Applicationmodel to Application 
                        var mappedTaxes = mapper.Map<TaxesModel, Taxes>(TaxesModel, Taxes);
                        dbcontext.Taxes.Update(mappedTaxes);
                        dbcontext.SaveChanges();

                        //  return true;
                        return TaxesModel;
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
                    var mappedTaxes = mapper.Map<Taxes>(TaxesModel);
                    dbcontext.Taxes.Add(mappedTaxes);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return TaxesModel;
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