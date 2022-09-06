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
    public class BillDeliveryService : BaseService, IBillDeliveryService
    {
        public BillDeliveryService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public List<BillDeliveriesModel> GetAllBillDelivery()
        {
            try
            {
                ///retrive list of Application (Entities).
                var listBillDelivery = dbcontext.BillDeliveries.ToList();
                ///cast entities to models 
                var BillDeliveryModelList = mapper.Map<List<BillDeliveriesModel>>(listBillDelivery);

                ///return models 
                return BillDeliveryModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public BillDeliveriesModel InsertOrUpdate(BillDeliveriesModel billDeliveryModel)
        {
            if (billDeliveryModel.Id > 0)  ///Update BillTaxes
            {
                ///Get Application entity from database by id 
                var BillDeliveriey = dbcontext.BillDeliveries.Find(billDeliveryModel.Id);
                if (BillDeliveriey != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from Applicationmodel to Application 
                        var mappedBillDeliveriey = mapper.Map<BillDeliveriesModel, BillDeliveries>(billDeliveryModel, BillDeliveriey);
                        dbcontext.BillDeliveries.Update(mappedBillDeliveriey);
                        dbcontext.SaveChanges();

                        //  return true;
                        return billDeliveryModel;
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
                    var mappedBillDelivery = mapper.Map<BillDeliveries>(billDeliveryModel);
                    dbcontext.BillDeliveries.Add(mappedBillDelivery);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return billDeliveryModel;
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