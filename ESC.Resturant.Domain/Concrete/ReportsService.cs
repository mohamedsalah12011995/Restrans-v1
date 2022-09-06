using AutoMapper;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using ESC.Resturant.Data.Context;
using Microsoft.EntityFrameworkCore;
using ESC.Resturant.Domain.Helpers;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;

namespace ESC.Resturant.Domain.Concrete
{
    public class ReportsService : BaseService, IReportsService
    {
        public ReportsService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public List<BillModel> GetBillsByDate(DateTime date_from, DateTime date_to)
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listBill = dbcontext.Bills.Include(x => x.BillDetails)
                                                          .ThenInclude(x => x.Item).ThenInclude(x => x.ItemPrices).ThenInclude(x => x.ItemSize)
                                              .Include(x => x.BillCurrencies)
                                              .Include(x => x.BillTaxes)
                                              .Include(x => x.BillDeliveries)
                                              .Include(x => x.PaymentType)
                                              .Include(x => x.BillPlace)
                                              .Include(x => x.Application)
                                              .Include(x => x.Currencies)
                                              .Include(x => x.DiscountType)
                                              .Include(x => x.BillType)
                                               .Where(b => b.CurrentDate.Value.Date >= date_from.Date && b.CurrentDate.Value.Date <= date_to.Date
                                                           && b.CheckWiteInvoies == false && b.IsDelete == false).ToList();
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

        public List<BillDetailsModel> GetReportItems()
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listBill = dbcontext.BillDetails
                    .Include(i => i.Item).ThenInclude(t => t.ItemCategory)
                    .Include(i => i.Item).ThenInclude(t => t.ItemPrices).ThenInclude(t => t.ItemComponents).ThenInclude(t => t.Item).ThenInclude(x => x.Unit);
                //.GroupBy(f=> f.Item.NameAR).ToList();
                ///cast entities to models 
                var BillModelList = mapper.Map<List<BillDetailsModel>>(listBill).ToList();

                ///return models 
                return BillModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<BillTypeModel> GetBillType()
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listBillType = dbcontext.BillTypes.ToList();
                ///cast entities to models 
                var BillTypeModelList = mapper.Map<List<BillTypeModel>>(listBillType);

                ///return models 
                return BillTypeModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<PagedData<BillModel>> BillReportApplicationOrTaxesPaginatedAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", DateTime? From = null, DateTime? To = null, BillModel searchBillVm = null, string component = null)
        {
            pageIndex = pageIndex != null ? pageIndex : 0;
            pageSize = pageSize != null ? pageSize : 0;
            SortKey = SortKey != null ? SortKey : "Id";
            sortOrderBY = sortOrderBY != null ? sortOrderBY : "asc";

            //---------------------------------------------------------------
            IQueryable<Bill> liststore;
            if (component == "reportApplication")
            {
                if (searchBillVm.User.UserTypeId==1)
                {
                    liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.Application).Include(x => x.User)
                    .Where(b => b.CurrentDate.Value.Date >= From.Value.Date && b.CurrentDate.Value.Date <= To.Value.Date && b.IsDelete == false &&
                                b.ApplicationId != null  && b.CheckWiteInvoies == false);

                }
                else
                {
                    liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.Application).Include(x => x.User)
                    .Where(b => b.CurrentDate.Value.Date >= From.Value.Date && b.CurrentDate.Value.Date <= To.Value.Date && b.IsDelete == false
                     && b.User.BoxMonyTypeId == searchBillVm.User.BoxMonyTypeId && b.ApplicationId != null && b.CheckWiteInvoies == false);

                }

            }

            else
            {
                liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.Application).Include(x => x.User)
                                   .Where(b => b.CurrentDate.Value.Date >= From.Value.Date && b.CurrentDate.Value.Date <= To.Value.Date &&
                                               b.User.BoxMonyTypeId == searchBillVm.User.BoxMonyTypeId && b.CheckWiteInvoies == false);

                //liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.Application).Include(x => x.User)
                //   .Where(b => b.CurrentDate.Value.Date >= From.Value.Date && b.CurrentDate.Value.Date <= To.Value.Date && b.IsDelete == false);

            }

            var totalcount = await liststore.CountAsync();
            var PageNumber = pageIndex * pageSize;
            try
            {

                //var newliststore = liststore.Skip(PageNumber.Value).Take(pageSize.Value).AsNoTracking().ProjectTo<BillModel>(mapper.ConfigurationProvider).ToList();
                //var newliststore = liststore.Skip(PageNumber.Value).Take(pageSize.Value).AsNoTracking().ProjectTo<BillModel>(mapper.ConfigurationProvider).ToList();
                var newBill = await liststore.ToListAsync();



                IEnumerable<BillModel> DataModel = mapper.Map<IEnumerable<Bill>, IEnumerable<BillModel>>(newBill);


                PagedData<BillModel> resultPagedData = new PagedData<BillModel>()
                {
                    Items = DataModel,
                    TotalCount = totalcount,
                };

                return resultPagedData;
            }
            catch (Exception x)
            {
                return null;
            }
        }


        public async Task<BillReportTotalsModel> BillReportTotalsApplicationOrTaxesPaginatedAsync(DateTime? From = null, DateTime? To = null, BillModel searchBillVm = null, string component = null)
        {
            try
            {
                IQueryable<Bill> liststore;

                if (component == "reportApplication")
                {
                    if (searchBillVm.User.UserTypeId==1)
                    {
                        liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.Application).Include(x => x.User)
                                      .Where(b => b.CurrentDate.Value.Date >= From.Value.Date && b.CurrentDate.Value.Date <= To.Value.Date && b.IsDelete == false &&
                                                  b.ApplicationId != null && b.CheckWiteInvoies == false);

                    }
                    else
                    {
                        liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.Application).Include(x => x.User)
                            .Where(b => b.CurrentDate.Value.Date >= From.Value.Date && b.CurrentDate.Value.Date <= To.Value.Date && b.IsDelete == false
                             && b.User.BoxMonyTypeId == searchBillVm.User.BoxMonyTypeId && b.ApplicationId != null && b.CheckWiteInvoies == false);

                    }

                }

                else
                {
                    liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.Application).Include(x => x.User)
                                       .Where(b => b.CurrentDate.Value.Date >= From.Value.Date && b.CurrentDate.Value.Date <= To.Value.Date && b.IsDelete == false
                                        && b.User.BoxMonyTypeId == searchBillVm.User.BoxMonyTypeId && b.CheckWiteInvoies == false);

                }

                var model = new BillReportTotalsModel()
                {
                    TotalBillCount = await liststore.CountAsync(),
                    SumBillNetTotals = (double)await liststore.SumAsync(y => y.NetTotal),
                    SumBillCash = (double)await liststore.Where(x => x.PaymentId == 1 || x.PaymentId == 2).SumAsync(y => y.Paied),
                    SumBillVisa = (double)await liststore.Where(x => x.PaymentId == 3).SumAsync(y => y.Paied),
                    SumBillRemaining = (double)await liststore.Where(x => x.PaymentId == 2).SumAsync(y => y.Remaining),
                    SumBillDiscounts = (double)await liststore.SumAsync(y => y.CurrentDiscount),
                    SumBillTotalVatTax = (double)await liststore.SumAsync(y => y.TotalVatTax),
                };



                return model;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}



