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
    public class ItemCategoryService : BaseService, IItemCategoryService
    {


        public ItemCategoryService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }



        public bool CheckIsItemCategoryExist(int id)
        {
            try
            {
                return dbcontext.Items.Any(e => e.Id == id);
            }
            catch(Exception e)
            {
                return false;
            }
       
            }

        public bool DeleteItemCategory(int id)
        {
            try
            {
                ///get obj for delete 
                var ItemCategorie = dbcontext.ItemCategories.Find(id);

                ///remove obj from db context 
                dbcontext.ItemCategories.Remove(ItemCategorie);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch(Exception e)
            {
                var ItemCategorie = dbcontext.ItemCategories.Find(id);
                ItemCategorie.IsDelete = true;
                dbcontext.ItemCategories.Update(ItemCategorie);
                return false;
            }
        }

        public List<ItemCategoryModel> GetAllItemCategory()
        {
            try
            {
                ///retrive list of ItemCategory (Entities).
                var listItemCategorie = dbcontext.ItemCategories.Where(c => c.IsDelete == false).ToList();
                ///cast entities to models 
                var ItemCategorieModelList = mapper.Map<List<ItemCategoryModel>>(listItemCategorie);

                ///return models 
                return ItemCategorieModelList;
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public ItemCategoryModel GetItemCategoryBy(int id)
        {
            try
            {
                ///retrive  ItemCategorie  (Entitiy).
                var ItemCategorie = dbcontext.ItemCategories.Find(id);
                ///cast entitiy to model 
                var ItemCategoriesModel = mapper.Map<ItemCategoryModel>(ItemCategorie);

                ///return model
                return ItemCategoriesModel;
            }
            catch
            {
                return null;
            }
        }

        public ItemCategoryModel InsertOrUpdate(ItemCategoryModel itemCategoryModel)
        {
            if (itemCategoryModel.Id > 0)  ///Update ItemCategory 
            {
                ///Get ItemCategory entity from database by id 
                var ItemCategory = dbcontext.ItemCategories.Find(itemCategoryModel.Id);
                if (ItemCategory != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from ItemCategoryrmodel to ItemCategory 

                        var mappedItemCategory = mapper.Map<ItemCategoryModel, ItemCategory>(itemCategoryModel, ItemCategory);
                        //if (mappedItemCategory.ParentId == 0)
                        //{
                        //    mappedItemCategory.ParentId = null;
                        //}


                        dbcontext.ItemCategories.Update(mappedItemCategory);
                        dbcontext.SaveChanges();

                        //  return true;
                        return itemCategoryModel;
                    }
                    catch (Exception e)
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
                    var mappedItemCategory = mapper.Map<ItemCategory>(itemCategoryModel);

                    dbcontext.ItemCategories.Add(mappedItemCategory);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return itemCategoryModel;
                }
                catch(Exception ex)
                {
                    throw;
                    //return null;
                    //return false; 
                }
            }

        }
    }
}



