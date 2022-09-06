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

namespace ESC.Resturant.Domain.Concrete
{
    public class DashboardService : IDashboardService
    {
        private IMapper _mapper { set; get; }
        private ESC_Resturant_DBContext _escContext { set; get; }

        public DashboardService(IMapper mapper, ESC_Resturant_DBContext escContext)
        {
            _mapper = mapper;
            _escContext = escContext;

        }

        public async Task<object> GetTodayTotalsAsync()
        {
            try
            {
                var TodayTotal = await _escContext.Bills.Where(c => (c.BillTypeId == (int)BillTypes.BillInvoice && c.IsDelete != true && c.CheckWiteInvoies != true && c.CurrentDate.Value.Date.ToShortDateString() == DateTime.Now.Date.ToShortDateString())).AsNoTracking().SumAsync(x => x.NetTotal);

                var previosTotal = await _escContext.Bills.Where(c => (c.BillTypeId == (int)BillTypes.BillInvoice && c.IsDelete != true && c.CheckWiteInvoies != true && c.CurrentDate.Value.Date == DateTime.Today.AddDays(-1).Date)).AsNoTracking().SumAsync(x => x.NetTotal);

               return new {  TodayTotal= TodayTotal,YasterdayTotal = previosTotal };
                
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public async Task<object> GeMonthlyTotalsAsync()
        {
            try
            {
                var MonthlyTotal = await _escContext.Bills.Where(c => (c.BillTypeId == (int)BillTypes.BillInvoice && c.IsDelete != true && c.CheckWiteInvoies != true && c.CurrentDate.Value.Month == DateTime.Now.Month  &&  c.CurrentDate.Value.Year == DateTime.Now.Year)).AsNoTracking().SumAsync(x => x.NetTotal);

                var previosTotal = await _escContext.Bills.Where(c => (c.BillTypeId == (int)BillTypes.BillInvoice && c.IsDelete != true && c.CheckWiteInvoies != true && c.CurrentDate.Value.Month == DateTime.Today.AddMonths(-1).Month && c.CurrentDate.Value.Year == DateTime.Now.Year)).AsNoTracking().SumAsync(x => x.NetTotal);

                return new { MonthlyTotal = MonthlyTotal, LastMonthTotal = previosTotal };

            }
            catch (Exception e)
            {
                return null;
            }

        }


        public async Task<object> GetMonthlySalesDashboardChart()
        {
            try
            {
                var MonthlyTotal = await _escContext.Bills.Where(c => c.BillTypeId == (int)BillTypes.BillInvoice && c.IsDelete != true && c.CheckWiteInvoies != true && c.CurrentDate.Value.Year == DateTime.Now.Year).GroupBy(x => x.CurrentDate.Value.Month).Select(x => new {

                    Monthl =  x.Select(g => g.CurrentDate.Value.Month).FirstOrDefault(),
                    
                    Count = x.Count(),

                    Total = x.Sum(g=>g.NetTotal),


                }).AsNoTracking().ToListAsync();


                return  MonthlyTotal;

            }
            catch (Exception e)
            {
                return null;
            }

        }



        public async Task<object> GetBestSalesDashboard()
        {
            try
            {
                var MonthlyTotal = await _escContext.BillDetails.Include(x=>x.Bill).Include(x => x.Item).Include(x=>x.ItemPrice).ThenInclude(x=>x.ItemSize).Where(c => c.Bill.BillTypeId == (int)BillTypes.BillInvoice && c.Bill.IsDelete != true && c.Item.IsDelete != true && c.Bill.CheckWiteInvoies != true && c.Bill.CurrentDate.Value.Year == DateTime.Now.Year).GroupBy(x=> new { x.ItemId , x.ItemPriceId}).Select(x => new {

                    ItemName = x.Select(g => g.Item.NameAR +" "+ g.ItemPrice.ItemSize.SizeNameAr ).FirstOrDefault(),

                    Count = x.Count(),

                    TotalQty = x.Sum(g => g.Qty),


                }).OrderByDescending(x=>x.TotalQty).Take(10).AsNoTracking().ToListAsync();


                return MonthlyTotal;

            }
            catch (Exception e)
            {
                return null;
            }

        }



        public async Task<object> GetBillsCountTodayAsync()
        {
            try
            {
                var BillsCount = await _escContext.Bills.Where(c => (c.BillTypeId == (int)BillTypes.BillInvoice && c.IsDelete != true && c.CheckWiteInvoies != true && c.CurrentDate.Value.Date.ToShortDateString() == DateTime.Now.ToShortDateString() )).AsNoTracking().CountAsync();

       
                return BillsCount;

            }
            catch (Exception e)
            {
                return null;
            }
        }


        public async Task<object> GetDeliveryBillsCountTodayAsync()
        {
            try
            {
                var BillsCount = await _escContext.Bills.Where(c => (c.BillTypeId == (int)BillTypes.BillInvoice && c.IsDelete != true && c.CheckWiteInvoies != true && c.CurrentDate.Value.Date == DateTime.Now.Date && c.BillPlaceId == 1 /*delivery */ )).AsNoTracking().CountAsync();


                return BillsCount;

            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<object> GetDeliveryTabelsBillsCountTodayAsync()
        {
            try
            {
                var BillsCount = await _escContext.Bills.Where(c => (c.BillTypeId == (int)BillTypes.BillInvoice && c.IsDelete != true && c.CheckWiteInvoies != true && c.CurrentDate.Value.Date == DateTime.Now.Date && c.TableNo != null /*ontabel */ )).AsNoTracking().CountAsync();


                return BillsCount;


            }
            catch (Exception e)
            {
                return null;
            }
        }






    }
}



