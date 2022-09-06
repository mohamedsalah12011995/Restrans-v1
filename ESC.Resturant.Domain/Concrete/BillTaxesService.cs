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
    public class BillBillTaxesService : BaseService, IBillTaxesService
    {
        public BillBillTaxesService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsBillTaxesExist(int id)
        {
            return dbcontext.BillTaxes.Any(e => e.Id == id);
        }

        public bool DeleteBillTaxes(int id)
        {
            try
            {
                ///get obj for delete 
                var BillTaxes = dbcontext.BillTaxes.Find(id);

                ///remove obj from db context 
                dbcontext.BillTaxes.Remove(BillTaxes);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public BillTaxesModel GetBillTaxesByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var BillTaxes = dbcontext.BillTaxes.Find(id);
                ///cast entitiy to model 
                var BillTaxesModel = mapper.Map<BillTaxesModel>(BillTaxes);

                ///return model
                return BillTaxesModel;
            }
            catch
            {
                return null;
            }
        }

        public List<BillTaxesModel> GetBillTaxes()
        {
            try
            {
                ///retrive list of Application (Entities).
                var listBillTaxes = dbcontext.BillTaxes.ToList();
                ///cast entities to models 
                var BillTaxesModelList = mapper.Map<List<BillTaxesModel>>(listBillTaxes);

                ///return models 
                return BillTaxesModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public BillTaxesModel InsertOrUpdate(BillTaxesModel BillTaxesModel)
        {
            if (BillTaxesModel.Id > 0)  ///Update BillTaxes
            {
                ///Get Application entity from database by id 
                var BillTaxes = dbcontext.BillTaxes.Find(BillTaxesModel.Id);
                if (BillTaxes != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from Applicationmodel to Application 
                        var mappedBillTaxes = mapper.Map<BillTaxesModel, BillTaxes>(BillTaxesModel, BillTaxes);
                        dbcontext.BillTaxes.Update(mappedBillTaxes);
                        dbcontext.SaveChanges();

                        //  return true;
                        return BillTaxesModel;
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
                    var mappedBillTaxes = mapper.Map<BillTaxes>(BillTaxesModel);
                    dbcontext.BillTaxes.Add(mappedBillTaxes);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return BillTaxesModel;
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