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

namespace ESC.Resturant.Domain.Abstract
{
    public interface IDashboardService
    {


        Task<object> GetTodayTotalsAsync();
        Task<object> GeMonthlyTotalsAsync();
        Task<object> GetMonthlySalesDashboardChart();
        Task<object> GetBestSalesDashboard();

        Task<object> GetDeliveryTabelsBillsCountTodayAsync();
        Task<object> GetDeliveryBillsCountTodayAsync();
        Task<object> GetBillsCountTodayAsync();
    }

}



