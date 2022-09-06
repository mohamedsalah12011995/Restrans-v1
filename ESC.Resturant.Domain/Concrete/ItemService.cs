using AutoMapper;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using ESC.Resturant.Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using ESC.Resturant.Domain.Helpers;
using System.Linq.Dynamic.Core;

namespace ESC.Resturant.Domain.Concrete
{
    public class ItemService : BaseService, IItemService
    {
        public ItemService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsItemExist(int id)
        {
            return dbcontext.Items.Any(e => e.Id == id);
        }

        public bool DeleteItem(int id)
        {
            try
            {
                ///get obj for delete 
                var item = dbcontext.Items.Find(id);

                ///remove obj from db context 
                dbcontext.Items.Remove(item);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                var _item = dbcontext.Items.Find(id);
                _item.IsDelete = true;

                dbcontext.Items.Update(_item);
                dbcontext.SaveChanges();
                return false;
            }
        }

        public ItemModel GetItemByid(int id)
        {
            try
            {
                ///retrive  Item  (Entitiy).
                var Item = dbcontext.Items.Include(i => i.ItemPrices).ThenInclude(i => i.ItemSize)
                    .Include(i => i.Unit).Include(i => i.ItemCategory).ThenInclude(i => i.Printer)
                    .FirstOrDefault(i => i.Id == id && i.IsDelete == false);
                ///cast entitiy to model 
                var ItemModel = mapper.Map<ItemModel>(Item);

                ///return model
                return ItemModel;
            }
            catch (Exception x)
            {
                return null;
            }
        }


        public async Task<PagedData<ItemModel>> ItemListPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", ItemModel searchItemVm = null, string type = "")
        {
            pageIndex = pageIndex != null ? pageIndex : 0;
            //pageSize = pageSize != null ? pageSize : 0;
            pageSize = int.MaxValue;
            SortKey = SortKey != null ? SortKey : "Id";
            sortOrderBY = sortOrderBY != null ? sortOrderBY : "asc";
            //---------------------------------------------------------------
            IQueryable<Item> liststore;

            if (type == "IsForSell")
            {
                liststore = dbcontext.Items.Where(x => x.IsDelete == false && x.IsForSell == true).OrderBy(o=> o.ItemIndex);
            }
            else
            {
                liststore = dbcontext.Items.Where(x => x.IsDelete == false && x.IsForSell == false).OrderBy(SortKey + " " + sortOrderBY);

            }
            var totalcount = await liststore.AsNoTracking().CountAsync();
            var PageNumber = pageIndex * pageSize;
            var newliststore = await liststore.AsNoTracking().Skip(PageNumber.Value).Take(pageSize.Value).ToListAsync();

            IEnumerable<ItemModel> DataModel = mapper.Map<IEnumerable<Item>, IEnumerable<ItemModel>>(newliststore);


            PagedData<ItemModel> resultPagedData = new PagedData<ItemModel>()
            {
                Items = DataModel,
                TotalCount = totalcount,
            };

            return resultPagedData;


        }

        public List<ItemModel> GetItems()
        {
            try
            {
                ///retrive list of Item (Entities).
                //var listItem = dbcontext.Items.Join(dbcontext.ItemPrices,item=>item.Id , itemPrice=>itemPrice.ItemId , (item, itemprice)=> new { Item = item, ItemPrice = itemprice } ).ToList();
                /////cast entities to models .
                ///
                var listItem = dbcontext.Items.Where(x => x.IsDelete == false).Include(o => o.Unit).Include(o => o.ItemPrices)
                             .Include(o => o.ItemPrices).ThenInclude(f => f.ItemSize)
                             .Include(o => o.ItemPrices).ThenInclude(f => f.ItemComponents).ThenInclude(x => x.Item).ThenInclude(x => x.Unit)

                 .AsNoTracking().ToList();
                var ItemModelList = mapper.Map<List<ItemModel>>(listItem);

                ///return models 
                return ItemModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }



        public ItemModel InsertOrUpdate(ItemModel itemModel)
        {
            if (itemModel.Id > 0)  ///Update ItemCategory 
            {
                ///Get ItemCategory entity from database by id 
                var Item = dbcontext.Items.Where(x => x.Id == itemModel.Id).AsNoTracking().FirstOrDefault();
                if (Item != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from ItemCategoryrmodel to ItemCategory 
                        var mappedItem = mapper.Map<ItemModel, Item>(itemModel, Item);
                        dbcontext.UpdateRange(mappedItem.ItemPrices);
                        dbcontext.Items.Update(mappedItem);
                        dbcontext.SaveChanges();

                        //  return true;
                        return itemModel;
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

                    //if ((bool)itemModel.IsForSell)
                    //{
                    //    //var branch = dbcontext.b
                    //    var branch = dbcontext.Branches.FirstOrDefault();
                    //    var branch
                    //}

                    var mappedItem = mapper.Map<Item>(itemModel);
                    dbcontext.Items.Add(mappedItem);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    itemModel.Id = mappedItem.Id;

                    //foreach (var item in mappedItem.ItemPrices)
                    //{
                    //    foreach (var _item in itemModel.ItemPrices)
                    //    {
                    //        _item.Id = item.Id;
                    //    } 
                    //}
                    return itemModel;
                }
                catch (Exception e)
                {
                    return null;
                    //return false; 
                }
            }
        }


        public bool CheckIsItemCategoryExist(int id)
        {
            return dbcontext.ItemCategories.Any(e => e.Id == id);
        }

        public List<ItemModel> GetItemsForCategory(int categoryid)
        {
            try
            {
                ///retrive list of Item (Entities).
                //var listItem = dbcontext.Items.Join(dbcontext.ItemPrices,item=>item.Id , itemPrice=>itemPrice.ItemId , (item, itemprice)=> new { Item = item, ItemPrice = itemprice } ).ToList();
                /////cast entities to models .
                ///
                var listItem = dbcontext.Items.Where(x => x.ItemCategoryId == categoryid && x.IsDelete == false && x.IsForSell == true).Include(o => o.Unit).Include(o => o.ItemPrices)
                    .Include(o => o.ItemPrices)
                        .ThenInclude(f => f.ItemSize).Include(o => o.ItemPrices).ThenInclude(x => x.ItemComponents)
                        .Include(x => x.ItemCategory).ThenInclude(c => c.Printer)
                   .ToList();
                var ItemModelList = mapper.Map<List<ItemModel>>(listItem);

                ///return models 
                return ItemModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public object GetItemsByInvoise()
        {
            try
            {
                //var ListItems = (from item in dbcontext.Items
                //                 join price in dbcontext.ItemPrices on item.Id equals price.ItemId
                //                 join size in dbcontext.ItemSizes on price.SizeId equals size.Id
                //                 where item.IsDelete == false
                //                 select new
                //                 {
                //                     item,
                //                     price,
                //                     size
                //                 }).ToList();
                //return ListItems;


                var listItem = dbcontext.Items.Where(x => x.IsDelete == false).Include(o => o.ItemPrices).ThenInclude(f => f.ItemSize).ToList();
                var ItemModelList = mapper.Map<List<ItemModel>>(listItem);

                ///return models 
                return ItemModelList;


                // return null;
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public List<ItemModel> GetAllItemIsForSell(string key)
        {
            var listItem = dbcontext.Items.Where(x => x.IsDelete == false && x.IsForSell == false && x.NameAR.Contains(key) || x.NameEN.Contains(key))
                           .Include(o => o.Unit).Include(o => o.ItemPrices)
                           .Include(o => o.ItemPrices).ThenInclude(f => f.ItemSize)
                           .Include(o => o.ItemPrices).ThenInclude(f => f.ItemComponents).ThenInclude(x => x.Item).ThenInclude(x => x.Unit)
                           .AsNoTracking().ToList();
            var ItemModelList = mapper.Map<List<ItemModel>>(listItem);

            ///return models 
            return ItemModelList;
        }

        public List<ItemModel> GetPurchacedItembyName(string key)
        {
            var listItem = dbcontext.Items.Where(x => x.IsDelete == false && x.IsForSell == false && x.NameAR.Contains(key) || x.NameEN.Contains(key))
                           .Include(o => o.Unit)
                           .AsNoTracking().ToList();
            var ItemModelList = mapper.Map<List<ItemModel>>(listItem);

            ///return models 
            return ItemModelList;
        }

        public List<ItemModel> GetPurchacedItembyCode(string key)
        {
            var listItem = dbcontext.Items.Where(x => x.IsDelete == false && x.IsForSell == false && (x.Code.Contains(key) || x.BarCode1.Contains(key) || x.BarCode2.Contains(key) || x.BarCode3.Contains(key)))
                           .Include(o => o.Unit)
                           .AsNoTracking().ToList();
            var ItemModelList = mapper.Map<List<ItemModel>>(listItem);

            ///return models 
            return ItemModelList;
        }


        public async Task<PagedData<ItemModel>> GetItemByidPaginated(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "",  string type = "")
        {
            try
            {
            pageIndex = pageIndex != null ? pageIndex : 0;
            //pageSize = pageSize != null ? pageSize : 0;
            pageSize = int.MaxValue;
            SortKey = SortKey != null ? SortKey : "Id";
            sortOrderBY = sortOrderBY != null ? sortOrderBY : "asc";
            //---------------------------------------------------------------
            IQueryable<Item> liststore;

                liststore = dbcontext.Items.Include(o => o.Unit).Include(o => o.ItemPrices)
                        .Include(o => o.ItemPrices)
                            .ThenInclude(f => f.ItemSize).Include(o => o.ItemPrices).ThenInclude(x => x.ItemComponents)
                            .Include(x => x.ItemCategory).ThenInclude(c => c.Printer)
                    .Where(x => x.IsDelete == false && x.IsForSell == true).OrderBy(o => o.ItemIndex);

            var totalcount = await liststore.AsNoTracking().CountAsync();
            var PageNumber = pageIndex * pageSize;
            var newliststore = await liststore.AsNoTracking().Skip(PageNumber.Value).Take(pageSize.Value).ToListAsync();

            IEnumerable<ItemModel> DataModel = mapper.Map<IEnumerable<Item>, IEnumerable<ItemModel>>(newliststore);


            PagedData<ItemModel> resultPagedData = new PagedData<ItemModel>()
            {
                Items = DataModel,
                TotalCount = totalcount,
            };

            return resultPagedData;
            }
            catch (Exception e)
            {
                return null;
            }

        }

    }
}



