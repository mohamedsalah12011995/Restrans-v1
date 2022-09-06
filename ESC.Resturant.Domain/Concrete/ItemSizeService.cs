using AutoMapper;
using ESC.Resturant.Data.Context;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;


namespace ESC.Resturant.Domain.Concrete
{
    /// <summary>
    /// BaseService All shared proprties for all services here 
    /// </summary>
    public class ItemSizeService : BaseService, IItemSizeService
    {
        public ItemSizeService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsItemSizeExist(int id)
        {
            return dbcontext.ItemSizes.Any(e => e.Id == id);
        }

        public bool DeleteItemSize(int id)
        {
            try
            {
                ///get obj for delete 
                var Item = dbcontext.ItemSizes.Find(id);

                ///remove obj from db context 
                dbcontext.ItemSizes.Remove(Item);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }

        public ItemSizeModel GetItemSizeByid(int id)
        {
            try
            {
                ///retrive  IItemSize  (Entitiy).
                var Item = dbcontext.ItemSizes.Find(id);
                ///cast entitiy to model 
                var ItemModel = mapper.Map<ItemSizeModel>(Item);

                ///return model
                return ItemModel;
            }
            catch
            {
                return null;
            }
        }


        public List<ItemSizeModel> GetItemSizes()
        {
            try
            {
                ///retrive list of IItemSize (Entities).
                //var listItem = dbcontext.ItemSizes.Where(s=> s.IsDelete==false).Include(s=> s.ItemPrices).ToList();
                var listItem = dbcontext.ItemSizes.Where(s=> s.IsDelete==false).ToList();

                foreach (var item in listItem)
                {
                    if (item.SizeNameAr=="لايوجد" || item.SizeNameAr == " ")
                    {
                        item.SizeNameAr = "لا يوجد حجم";
                        item.SizeNameEn = "not found size";
                    }
                }
                ///cast entities to models 
                var ItemModelList = mapper.Map<List<ItemSizeModel>>(listItem);

                ///return models 
                return ItemModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public ItemSizeModel InsertOrUpdate(ItemSizeModel itemModel)
        {
            if (itemModel.Id > 0)  ///Update iItemSize 
            {
                ///Get iItemSize entity from database by id 
                var ItemSize = dbcontext.ItemSizes.Find(itemModel.Id);
                if (ItemSize != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from iItemSizeModel to iItemSize 
                        var mappediItemSize = mapper.Map<ItemSizeModel, ItemSize>(itemModel, ItemSize);
                        dbcontext.ItemSizes.Update(mappediItemSize);
                        dbcontext.SaveChanges();

                        //  return true;
                        return itemModel;
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
                    var mappediItemSize = mapper.Map<ItemSize>(itemModel);
                    dbcontext.ItemSizes.Add(mappediItemSize);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return itemModel;
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

