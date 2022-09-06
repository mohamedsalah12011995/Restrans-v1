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
    public class DiscountTypeService : BaseService, IDiscountTypeService
    {
        public DiscountTypeService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsDiscountTypeExist(int id)
        {
            return dbcontext.DiscountTypes.Any(e => e.Id == id);
        }

        public bool DeleteDiscountType(int id)
        {
            try
            {
                ///get obj for delete 
                //var DiscountType = dbcontext.DiscountTypes.Find(id);

                ///remove obj from db context 
                //dbcontext.DiscountTypes.Remove(DiscountType);

                ///save changes on database 
                //dbcontext.SaveChanges();
                //return true;

                //var _app = dbcontext.DiscountTypes.Find(id);
                //_app.IsDelete = true;

                //dbcontext.DiscountTypes.Update(_app);
                //dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public DiscountTypeModel GetDiscountTypeByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var DiscountType = dbcontext.DiscountTypes.Find(id);
                ///cast entitiy to model 
                var DiscountTypeModel = mapper.Map<DiscountTypeModel>(DiscountType);

                ///return model
                return DiscountTypeModel;
            }
            catch
            {
                return null;
            }
        }

        public List<DiscountTypeModel> GetDiscountTypes()
        {
            try
            {
                ///retrive list of DiscountType (Entities).
                var listDiscountType = dbcontext.DiscountTypes.ToList();
                ///cast entities to models 
                var DiscountTypeModelList = mapper.Map<List<DiscountTypeModel>>(listDiscountType);

                ///return models 
                return DiscountTypeModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public DiscountTypeModel InsertOrUpdate(DiscountTypeModel DiscountTypeModel)
        {
            if (DiscountTypeModel.Id > 0)  ///Update DiscountType
            {
                ///Get DiscountType entity from database by id 
                var DiscountType = dbcontext.DiscountTypes.Find(DiscountTypeModel.Id);
                if (DiscountType != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from DiscountTypemodel to DiscountType 
                        var mappedDiscountType = mapper.Map<DiscountTypeModel, DiscountType>(DiscountTypeModel, DiscountType);
                        dbcontext.DiscountTypes.Update(mappedDiscountType);
                        dbcontext.SaveChanges();

                        //  return true;
                        return DiscountTypeModel;
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
                    var mappedDiscountType = mapper.Map<DiscountType>(DiscountTypeModel);
                    dbcontext.DiscountTypes.Add(mappedDiscountType);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return DiscountTypeModel;
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