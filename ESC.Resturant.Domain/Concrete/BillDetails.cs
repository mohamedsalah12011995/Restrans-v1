using AutoMapper;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using ESC.Resturant.Data.Context;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ESC.Resturant.Domain.Concrete
{
    public class BillDetailService : BaseService, IBillDetailsService
    {
        public BillDetailService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsBillExist(int id)
        {
            return dbcontext.Bills.Any(e => e.Id == id);
        }

        public bool DeleteBillDetails(int id)
        {
            try
            {
                ///get obj for delete 
                var Bill = dbcontext.Bills.Find(id);

                ///remove obj from db context 
                dbcontext.Bills.Remove(Bill);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public BillModel GetBillByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var Bill = dbcontext.Bills.Find(id);
                ///cast entitiy to model 
                var BillModel = mapper.Map<BillModel>(Bill);

                ///return model
                return BillModel;
            }
            catch
            {
                return null;
            }
        }

        public List<BillModel> GetBills()
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listBill = dbcontext.Bills.ToList();
                ///cast entities to models 
                var BillModelList = mapper.Map<List<BillModel>>(listBill);

                ///return models 
                return BillModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public BillModel InsertOrUpdate(BillModel BillModel)
        {
            if (BillModel.Id > 0)  ///Update BillCategory 
            {
                ///Get BillCategory entity from database by id 
                var Bill = dbcontext.Bills.Find(BillModel.Id);
                if (Bill != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from BillCategoryrmodel to BillCategory 
                        var mappedBill = mapper.Map<BillModel, Bill>(BillModel, Bill);
                        dbcontext.Bills.Update(mappedBill);
                        dbcontext.SaveChanges();

                        //  return true;
                        return BillModel;
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
                    var mappedBill = mapper.Map<Bill>(BillModel);
                    dbcontext.Bills.Add(mappedBill);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return BillModel;
                }
                catch
                {
                    return null;
                    //return false; 
                }
            }
        }


        public bool CheckIsBillCategoryExist(int id)
        {
            //return dbcontext.BillCategories.Any(e => e.Id == id);
            return dbcontext.BillDetails.Any(e => e.Id == id);

        }

        public List<BillDetailsModel> GetBillDetails()
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listBillDetails = dbcontext.BillDetails.ToList();
                ///cast entities to models 
                var BillDetailsModelList = mapper.Map<List<BillDetailsModel>>(listBillDetails);

                ///return models 
                return BillDetailsModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<BillDetailsModel> GetBillDetailsByid(int id)
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listBillDetails = dbcontext.BillDetails.Where(b => b.BillId == id).ToList();
                ///cast entities to models 
                var BillDetailsModelList = mapper.Map<List<BillDetailsModel>>(listBillDetails);

                ///return models 
                return BillDetailsModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public BillDetailsModel InsertOrUpdate(BillDetailsModel BillDetailModel)
        {
            if (BillDetailModel.Id > 0)  ///Update BillCategory 
            {
                ///Get BillCategory entity from database by id 
                var BillDetails = dbcontext.BillDetails.Find(BillDetailModel.Id);
                if (BillDetails != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from BillCategoryrmodel to BillCategory 
                        var mappedBillDetails = mapper.Map<BillDetailsModel, BillDetails>(BillDetailModel, BillDetails);
                        dbcontext.BillDetails.Update(mappedBillDetails);
                        dbcontext.SaveChanges();

                        //  return true;
                        return BillDetailModel;
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
                    var mappedBillDetail = mapper.Map<BillDetails>(BillDetailModel);
                    dbcontext.BillDetails.Add(mappedBillDetail);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return BillDetailModel;
                }
                catch
                {
                    return null;
                    //return false; 
                }
            }
        }

        public bool DeleteBillDetail(int id)
        {
            try
            {
                var BillDetails = dbcontext.BillDetails.Find(id);

                ///remove obj from db context 
                dbcontext.BillDetails.Remove(BillDetails);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public async Task<object> GetItemsGroup(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", DateTime? From = null, DateTime? To = null, BillDetailsModel billDetails = null, string type = null)
        {
            pageIndex = pageIndex != null ? pageIndex : 0;
            //pageSize = pageSize != null ? pageSize : 0;
            pageSize = int.MaxValue;
            SortKey = SortKey != null ? SortKey : "Id";
            sortOrderBY = sortOrderBY != null ? sortOrderBY : "asc";

            IQueryable<BillDetails> liststore;

            liststore = dbcontext.BillDetails.Include(b=> b.Bill).Include(x => x.Item).ThenInclude(c=> c.ItemCategory).
                Where(b => b.CurrentDate.Value.Date >= From.Value.Date&& b.CurrentDate.Value.Date <= To.Value.Date && b.Bill.CheckWiteInvoies==false);


            var Quntity= await liststore.CountAsync();
            var PageNumber = pageIndex * pageSize;

            try
            {

                IEnumerable<BillDetailsModel> DataModel = mapper.Map<IEnumerable<BillDetails>, IEnumerable<BillDetailsModel>>(liststore);
                object _BillDetails = new object();
                if (type == "items")
                {
                    _BillDetails = DataModel.GroupBy(x => x.Item.NameAR, (key, group) => new
                    {
                        ItemName = key,
                        Qty = group.Sum(x => x.Qty),
                        Total = group.Sum(x => x.TotalAfterVatTax),
                        CurrentDate = From,
                        Date = To,
                    }).ToList();

                }
                if (type == "categories")
                {
                    _BillDetails = DataModel.GroupBy(x => x.Item.NameAR, (key, group) => new
                    {
                        ItemName = key,
                        Category = group.Select(x => x.Item.ItemCategory.NameAR).FirstOrDefault(),
                        Qty = group.Sum(x => x.Qty),
                        Total = group.Sum(x => x.TotalAfterVatTax),
                        CurrentDate = From,
                        Date = To,
                    }).ToList();

                }
                return _BillDetails;

            }
            catch (Exception x)
            {
                return null;
            }


        }

        //var g = dbcontext.BillDetails.Where(b => b.CurrentDate.Value.Date >= From.Value.Date && b.CurrentDate.Value.Date <= To.Value.Date)
        //                     .GroupBy(x => x.ItemId,
        //                     (key, group) => new ItemsGroupModel
        //                     {
        //                         ItemName = group.First().Item.NameAR,
        //                         Qty = group.Sum(x => x.Qty).Value,
        //                         Total = group.Sum(x => x.NetTotal).Value
        //                     });

    }
}