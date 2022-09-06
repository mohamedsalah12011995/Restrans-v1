using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ESAResturant.NEW.web.Controllers
{
    [Route("api/BillDetalis")]
    [ApiController]
    public class BillDetalisController : ControllerBase
    {
        private IBillDetailsService BillDetailsService;
        public BillDetalisController(IBillDetailsService _BillDetailsServer)
        {
            BillDetailsService = _BillDetailsServer;
        }
        // GET: api/BillDetails
        [HttpGet]
        [Route("GetBillDetails")]
        public IEnumerable<BillDetailsModel> GetBillDetail()
        {
            return BillDetailsService.GetBillDetails();
        }

        [HttpPost]
        [Route("GetItemsGroup")]
        public async Task<object> ItemsGroupModel(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", DateTime? From = null, DateTime? To = null, BillDetailsModel billDetails = null, string type = null)
        {
            return await BillDetailsService.GetItemsGroup(pageIndex, pageSize, searchString, SortKey, sortOrderBY, From, To, billDetails,type);
        }

        // GET: api/BillDetails/5
        [HttpGet]
        [Route("GetBillDetailsByid")]
        public List<BillDetailsModel> GetBillDetailsByid(int id)
        {
            return BillDetailsService.GetBillDetailsByid(id);
        }

        // POST: api/Bill
        [HttpPost]
        [Route("InsertOrUpdateBillDetails")]
        public void Post([FromBody] BillDetailsModel BillDetails)
        {
            BillDetailsService.InsertOrUpdate(BillDetails);
        }


        [HttpDelete]
        [Route("DeleteBillDetails")]
        public void Delete(int id)
        {
            BillDetailsService.DeleteBillDetails(id);
        }
    }
}