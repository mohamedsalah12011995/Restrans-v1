using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESC.Resturant.Domain.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace ESAResturant.NEW.web.Controllers
{

    [Route("api/Dashboard")]
    public class DashboardController : Controller
    {

        private IDashboardService DashboardService { set; get; }
        
        public DashboardController(IDashboardService _DashboardService)
        {
            DashboardService = _DashboardService;
        }



        [HttpGet]
        [Route("GetTodayDashboardTotals")]
        public async Task<IActionResult> GetTodayDashboardTotals()
        {

            var ResultObj=   await DashboardService.GetTodayTotalsAsync();
           return Ok(ResultObj);     
         }

        [HttpGet]
        [Route("GetMonthlyDashboardTotals")]
        public async Task<IActionResult> GetMonthlyDashboardTotals()
        {
            var ResultObj = await DashboardService.GeMonthlyTotalsAsync();
            return Ok(ResultObj);
        }


        [HttpGet]
        [Route("GetMonthlySalesDashboardChart")]
        public async Task<IActionResult> GetMonthlySalesDashboardChart()
        {
            var ResultObj = await DashboardService.GetMonthlySalesDashboardChart();
            return Ok(ResultObj);
        }




        [HttpGet]
        [Route("GetBestSalesDashboard")]
        public async Task<IActionResult> GetBestSalesDashboard()
        {
            var ResultObj = await DashboardService.GetBestSalesDashboard();
            return Ok(ResultObj);
        }



        [HttpGet]
        [Route("GetBillsCountToday")]
        public async Task<IActionResult> GetBillsCountTodayAsync()
        {
            var ResultObj = await DashboardService.GetBillsCountTodayAsync();
            return Ok(ResultObj);
        }


        [HttpGet]
        [Route("GetDeliveryBillsCountToday")]
        public async Task<IActionResult> GetDeliveryBillsCountTodayAsync()
        {
            var ResultObj = await DashboardService.GetDeliveryBillsCountTodayAsync();
            return Ok(ResultObj);
        }


        [HttpGet]
        [Route("GetDeliveryTabelsBillsCountToday")]
        public async Task<IActionResult> GetDeliveryTabelsBillsCountTodayAsync()
        {
            var ResultObj = await DashboardService.GetDeliveryTabelsBillsCountTodayAsync();
            return Ok(ResultObj);
        }

    }
}