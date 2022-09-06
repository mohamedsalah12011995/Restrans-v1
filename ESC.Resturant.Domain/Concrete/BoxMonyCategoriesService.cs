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
    class BoxMonyCategoriesService : BaseService, IBoxMonyCategoryService
    {
        public BoxMonyCategoriesService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }
        public bool CheckIsBoxMonyCategoryExist(int id)
        {
            return dbcontext.BoxMonyCategories.Any(e => e.Id == id);
        }

        public bool DeleteBoxMonyCategory(int id)
        {
            try
            {
                ///get obj for delete 
                var BoxMonyCategory = dbcontext.BoxMonyCategories.Find(id);

                ///remove obj from db context 
                dbcontext.BoxMonyCategories.Remove(BoxMonyCategory);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<BoxMonyCategoriesModel> GetBoxMonyCategories()
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listBoxMonyCategory = dbcontext.BoxMonyCategories.Where(b=> b.IsDelete==false).ToList();
                ///cast entities to models 
                var BoxMonyCategoryModelList = mapper.Map<List<BoxMonyCategoriesModel>>(listBoxMonyCategory);

                ///return models 
                return BoxMonyCategoryModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<BoxMonyTypeModel> GetBoxMonyType()
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listBoxMonyType = dbcontext.BoxMonyTypes.ToList();
                ///cast entities to models 
                var BoxMonyTypeModelList = mapper.Map<List<BoxMonyTypeModel>>(listBoxMonyType);

                ///return models 
                return BoxMonyTypeModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public BoxMonyCategoriesModel GetBoxMonyCategoryByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var BoxMonyCategory = dbcontext.BoxMonyCategories.Find(id);
                ///cast entitiy to model 
                var BoxMonyCategoryModel = mapper.Map<BoxMonyCategoriesModel>(BoxMonyCategory);

                ///return model
                return BoxMonyCategoryModel;
            }
            catch
            {
                return null;
            }
        }

        public BoxMonyCategoriesModel InsertOrUpdate(BoxMonyCategoriesModel boxMonyCategoryModel)
        {
            if (boxMonyCategoryModel.Id > 0)  ///Update BoxMonyCategory 
            {
                ///Get BoxMonyCategory entity from database by id 
                var BoxMonyCategory = dbcontext.BoxMonyCategories.Find(boxMonyCategoryModel.Id);
                if (BoxMonyCategory != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from BoxMonyCategorymodel to BoxMonyCategory 
                        var mappedBoxMonyCategory = mapper.Map<BoxMonyCategoriesModel, BoxMonyCategories>(boxMonyCategoryModel, BoxMonyCategory);
                        dbcontext.BoxMonyCategories.Update(mappedBoxMonyCategory);
                        dbcontext.SaveChanges();

                        //  return true;
                        return boxMonyCategoryModel;
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
                    var mappedBoxMonyCategory = mapper.Map<BoxMonyCategories>(boxMonyCategoryModel);
                    dbcontext.BoxMonyCategories.Add(mappedBoxMonyCategory);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return boxMonyCategoryModel;
                }
                catch (Exception e)
                {
                    return null;
                    //return false; 
                }
            }
        }
    }

}
