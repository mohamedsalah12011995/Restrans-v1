using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESAResturant.NEW.web.Hups;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Concrete;
using ESC.Resturant.Domain.Helpers;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ESAResturant.NEW.web.Controllers
{
    [Route("api/Bill")]
    public class BillController : Controller
    {
        IHubContext<KitchenHub> _hub;


        private IBillService BillServer;

        public BillController(IBillService _BillServer, IHubContext<KitchenHub> hub)
        {
            BillServer = _BillServer;
            _hub = hub;
        }



        [HttpPost]
        [Route("BillWaitPaginated")]
        public async Task<PagedData<BillModel>> BillWaitPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", [FromBody] BillModel searchBillVm = null, string type = null)
        {
            return await BillServer.BillWaitPaginationAsync(pageIndex, pageSize, searchString, SortKey, sortOrderBY, From, To, searchBillVm, type);
        }


        [HttpPost]
        [Route("BillListPaginated")]
        public async Task<PagedData<BillModel>> BillListPaginatedAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", [FromBody] BillModel searchBillVm = null, string type = null)

        {
            return await BillServer.BillListPaginationAsync(pageIndex, pageSize, searchString, SortKey, sortOrderBY, From, To, searchBillVm, type);
        }

        [HttpPost]
        [Route("BillListFinshedPaginated")]
        public async Task<PagedData<BillModel>> BillListFinshedPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", [FromBody] BillModel searchBillVm = null, string type = null)

        {
            return await BillServer.BillListFinshedPaginationAsync(pageIndex, pageSize, searchString, SortKey, sortOrderBY, From, To, searchBillVm, type);
        }


        [HttpPost]
        [Route("BillReportPaginated")]
        public async Task<object> BillReportPaginatedAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", [FromBody] BillModel searchBillVm = null, string component = null, string TypeDate = "", string All = "")
        {

            if (TypeDate == "date")
            {
                return await BillServer.BillReportPaginationAsync(pageIndex, pageSize, searchString, SortKey, sortOrderBY, From, To, searchBillVm, component, All);
            }
            if (TypeDate == "time")
            {
                return await BillServer.BillReportPaginationByTimeAsync(pageIndex, pageSize, searchString, SortKey, sortOrderBY, From, To, searchBillVm, component, TypeDate, All);
            }
            else
            {
                return null;
            }
        }
        [HttpPost]
        [Route("BillReportTotalsPaginationTimeAsync")]
        public async Task<BillReportTotalsModel> BillReportTotalsPaginationTimeAsync(string From = "", string To = "", [FromBody] BillModel searchBillVm = null, string component = null, string All = "")
        {
            return await BillServer.BillReportTotalsPaginationTimeAsync(From, To, searchBillVm, component, All);
        }

        [HttpPost]
        [Route("BillReportTotalsTodayPaginated")]
        public async Task<BillReportTotalsModel> BillReportTotalsTodayPaginationAsync(string From = "", string To = "", [FromBody] BillModel searchBillVm = null, string component = null, string All = "")
        {
            return await BillServer.BillReportTotalsTodayPaginationAsync(From, To, searchBillVm, component, All);
        }

        [HttpPost]
        [Route("BillReportTotalsPaginated")]
        public async Task<BillReportTotalsModel> BillReportTotalsPaginationAsync(string From = "", string To = "", [FromBody] BillModel searchBillVm = null, string component = null, string All = "")
        {
            return await BillServer.BillReportTotalsPaginationAsync(From, To, searchBillVm, component, All);
        }


        [HttpPost]
        [Route("GetBillByidPaginated")]
        public async Task<PagedData<BillModel>> GetBillByidPaginated(int? Id = 0)
        {
            return await BillServer.GetBillByidPaginated(Id);
        }

        // GET: api/Bill/5
        [HttpGet]
        [Route("GetBillbyId")]
        public BillModel GetBillByid(int id)
        {
            return BillServer.GetBillByid(id);
        }

        // POST: api/Bill
        [HttpPost]
        [Route("InsertOrUpdateBill")]
        public async Task<BillModel> PostAsync([FromBody] BillModel BillModel)
        {

            BillModel.BaseUrl = Request.Scheme + "://" + Request.Host + ":8080";
            var b = BillServer.InsertOrUpdate2(BillModel);
            b.Result.User.FirstName = BillModel.User.FirstName;
            b.Result.User.UserName = BillModel.User.UserName;

            if (b.Result.IsDelete == false)
            {
                await _hub.Clients.All.SendAsync("AddBill", b.Result);
            }
            if (b.Result.TableNo != null)
            {
                await _hub.Clients.All.SendAsync("SelectedTable", b.Result);
            }

            else if (b.Result.IsDelete)
            {
                await _hub.Clients.All.SendAsync("DeleteBill", b.Result);
            }
            return b.Result;
        }

        // POST: api/Bill
        [HttpPost]
        [Route("InsertOrUpdateBill2")]
        public async Task<BillModel> PostAsync2([FromBody] BillModel BillModel)
        {

            var b = BillServer.InsertOrUpdate(BillModel);
            b.User.FirstName = BillModel.User.FirstName;
            b.User.UserName = BillModel.User.UserName;

            if (b.IsDelete == false)
            {
                await _hub.Clients.All.SendAsync("AddBill", b);
                //await _hub.Clients.All.SendAsync("SelectedTable", b);

                //if (b.TableNo != null && b.CheckWiteInvoies == true)
                //{
                //    await _hub.Clients.All.SendAsync("SelectedTable", b);
                //}
            }
            if (b.TableNo != null)
            {
                await _hub.Clients.All.SendAsync("SelectedTable", b);

            }

            else if (b.IsDelete)
            {
                await _hub.Clients.All.SendAsync("DeleteBill", b);
            }

            //else if (b.IsDelete == false && b.TableNo != null)
            //{
            //    await _hub.Clients.All.SendAsync("SelectedTable", b);
            //}



            //else
            //{
            //    await _hub.Clients.All.SendAsync("AddBill", b);
            //}

            //if (BillModel.TableNo!=null)
            //{
            //    await _hub.Clients.All.SendAsync("SelectedTable", b);
            //}

            return b;
        }
        [HttpDelete]
        [Route("DeleteBill")]
        public void DeleteBill(int id)
        {
            var bill = BillServer.ReternObjectBill(id);
            BillServer.DeleteBill(id);

        }

        // GET: api/GetBillLastid
        [HttpGet]
        [Route("GetBillLastid")]
        public BillModel GetBillLastid()
        {
            return BillServer.GetBillLastid();
        }


        // POST: api/Note
        [HttpPost]
        [Route("InsertOrUpdateNote")]
        public void PostNote([FromBody] NoteModel NoteModel)
        {
            BillServer.InsertOrUpdateNote(NoteModel);
        }
        // GET: api/Note
        [HttpGet]
        [Route("GetNotes")]
        public IEnumerable<NoteModel> GetNotes()
        {
            return BillServer.GetNotes();
        }
        // Delete: api/DeleteNote
        [HttpDelete]
        [Route("DeleteNote")]
        public void DeleteNote(int id)
        {
            BillServer.DeleteNote(id);
        }


        // GET: api/BillPlace
        [HttpGet]
        [Route("GetBillPlaces")]
        public IEnumerable<BillPlaceModel> GetBillPlaces()
        {
            return BillServer.GetBillPlaces();
        }

        [HttpGet]
        [Route("GetLastBill")]
        public int LastBill(DateTime _Date)
        {
            return BillServer.LastBill(_Date);
        }


        // GET: api/Bill_Payment Type
        [HttpGet]
        [Route("GetBillPaymentType")]
        public IEnumerable<PaymentTypeModel> GetBillPaymentType()
        {
            return BillServer.GetBillPaymentType();
        }

        // GET: api/BillTypes
        [HttpGet]
        [Route("GetBillTypes")]
        public List<BillTypeModel> GetBillTypes()
        {
            return BillServer.GetBillTypes();
        }

        [HttpPost]
        [Route("UpdateBill")]
        public BillModel UpdateBill([FromBody]BillModel billModel)
        {
            //var b = BillServer.UpdateBill(billModel);
            //_hub.Clients.All.SendAsync("AddBill", b);
            //return b;
            return BillServer.UpdateBill(billModel);
        }
    }
}
