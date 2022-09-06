using AutoMapper;
using ESC.Resturant.Data.Context;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ESC.Resturant.Domain.Concrete
{
    /// <summary>
    /// BaseService All shared proprties for all services here 
    /// </summary>
    public class ItemPriceService : BaseService, IItemPricesService
    {
        public ItemPriceService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsItemPriceExist(int id)
        {
            return dbcontext.ItemPrices.Any(e => e.Id == id);
        }

        public bool DeleteItemPrice(int id)
        {
            try
            {
                ///get obj for delete 
                var Item = dbcontext.ItemPrices.Find(id);

                ///remove obj from db context 
                dbcontext.ItemPrices.Remove(Item);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }

        public ItemPricesModel GetItemPriceByid(int id)
        {
            try
            {
                ///retrive  ItemPrice  (Entitiy).
                var Item = dbcontext.ItemPrices.Find(id);
                ///cast entitiy to model 
                var ItemModel = mapper.Map<ItemPricesModel>(Item);

                ///return model
                return ItemModel;
            }
            catch
            {
                return null;
            }
        }

        public List<ItemPricesModel> GetItemPriceByItemid(int id)
        {
            try
            {
                ///retrive  ItemPrice  (Entitiy).
                var Item = dbcontext.ItemPrices.Where(f => f.ItemId == id).ToList();
                ///cast entitiy to model 
                var ItemModel = mapper.Map<List<ItemPricesModel>>(Item);

                ///return model
                return ItemModel;
            }
            catch
            {
                return null;
            }
        }

        public List<ItemPricesModel> GetItemPrices()
        {
            try
            {
                ///retrive list of ItemPrice (Entities).
                var listItem = dbcontext.ItemPrices.ToList();
                ///cast entities to models 
                var ItemModelList = mapper.Map<List<ItemPricesModel>>(listItem);

                ///return models 
                return ItemModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public ItemPricesModel InsertOrUpdate(ItemPricesModel itemPriceModel)
        {
            if (itemPriceModel.Id > 0)  ///Update itemPrice 
            {
                ///Get itemPrice entity from database by id 
                var ItemPrice = dbcontext.ItemPrices.Find(itemPriceModel.Id);
                if (ItemPrice != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from itemPriceModel to itemPrice 
                        var mappeditemPrice = mapper.Map<ItemPricesModel, ItemPrices>(itemPriceModel, ItemPrice);
                        dbcontext.ItemPrices.Update(mappeditemPrice);
                        dbcontext.SaveChanges();

                        //  return true;
                        return itemPriceModel;
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
                    var mappeditemPrice = mapper.Map<ItemPrices>(itemPriceModel);
                    dbcontext.ItemPrices.Add(mappeditemPrice);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return itemPriceModel;
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
