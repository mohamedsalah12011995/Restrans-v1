using AutoMapper;
using AutoMapper.QueryableExtensions;
using ESC.Resturant.Data.Context;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Helpers;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Globalization;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Concrete

{
    public class BillService : BaseService, IBillService
    {
        public BillService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsBillExist(int id)
        {
            return dbcontext.Bills.Any(e => e.Id == id);
        }

        public object ReternObjectBill(int id)
        {
            var Bill = dbcontext.Bills.Find(id);
            return Bill;
        }

        public bool DeleteBill(int id)
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
                var Bill = dbcontext.Bills.Find(id);
                //var box = dbcontext.BoxMonies.Find(Bill.Date.Value);
                Bill.IsDelete = true;
                dbcontext.Bills.Update(Bill);
                dbcontext.SaveChanges();
                return false;
            }
        }

        public BillModel GetBillByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var bill = dbcontext.Bills.Include(x => x.BillDetails)
                                                          .ThenInclude(x => x.Item).ThenInclude(x => x.ItemPrices).ThenInclude(x => x.ItemSize)

                                              .Include(x => x.BillDetails)
                                                          .ThenInclude(x => x.Item).ThenInclude(x => x.ItemCategory).ThenInclude(x => x.Printer)
                                              .Include(x => x.BillCurrencies)
                                              .Include(x => x.BillTaxes)
                                              .Include(x => x.PaymentType)
                                              .Include(x => x.BillPlace)
                                              .Include(x => x.Application)
                                              .Include(x => x.Currencies)
                                              .Include(x => x.DiscountType)
                                              .Include(x => x.User).ThenInclude(u => u.Branch).ThenInclude(u => u.CompanyInfo)

                                              .Include(x => x.BillType).SingleOrDefault(b => b.Id == id);

                //var bill = dbcontext.Bills.SingleOrDefault(b => b.Id == id);

                //var bill = (from b in dbcontext.Bills
                //                  join detail in dbcontext.BillDetails on b.Id equals detail.BillId
                //                  join payment in dbcontext.PaymentTypes on b.PaymentId equals payment.Id
                //                  join place in dbcontext.BillPlaces on b.BillPlaceId equals place.Id
                //                  join appliction in dbcontext.Applications on b.ApplicationId equals appliction.Id
                //                  join discount in dbcontext.DiscountTypes on b.DiscountId equals discount.Id
                //                  join billtype in dbcontext.BillTypes on b.BillTypeId equals billtype.Id
                //                  where b.Id==id 
                //                  select new {b,detail,payment,place,appliction,discount,billtype}
                //                  );


                //var bill = dbcontext.Bills.Find(id);

                ///cast entitiy to model 
                var BillModel = mapper.Map<BillModel>(bill);
                //BillModel.BillDetails.Where(f => f.IsDelete == true);
                ///return model
                return BillModel;
            }
            catch (Exception)
            {
                return null;
            }
        }




        public BillModel GetBillLastid()
        {


            var result = dbcontext.Bills.OrderByDescending(p => p.Id).FirstOrDefault();
            var BillResult = mapper.Map<BillModel>(result);

            return BillResult;
        }

        public async Task<BillModel> InsertOrUpdate2(BillModel BillModel)
        {

            using (var transaction = dbcontext.Database.BeginTransaction())
            {
                try
                {
                    var _CurrentDate = DateTime.Parse(BillModel.CurrentDate).ToString("yyyy/MM/dd hh:mm:ss tt");
                    var _Date = DateTime.Parse(BillModel.Date).ToString("yyyy/MM/dd hh:mm:ss tt");

                    if (BillModel.IsDelete == true)
                    {
                        var Bill = dbcontext.Bills.Find(BillModel.Id);
                        if (Bill != null)   ///if Exist 
                        {
                            try
                            {
                                foreach (var detail in BillModel.BillDetails)
                                {
                                    detail.IsDelete = true;
                                }

                                var mappedBill = mapper.Map<BillModel, Bill>(BillModel, Bill);
                                mappedBill.CurrentDate = DateTime.Parse(_CurrentDate);
                                mappedBill.Date = DateTime.Parse(_Date);
                                dbcontext.UpdateRange(mappedBill.BillDetails);
                                dbcontext.UpdateRange(mappedBill.BillCurrencies);
                                dbcontext.UpdateRange(mappedBill.BillTaxes);
                                dbcontext.Bills.Update(mappedBill);


                                var OldBill = dbcontext.Bills.Find(BillModel.Id);
                                var boxMony = dbcontext.BoxMonies.Where(b => b.CurrentDate.Value.Date == mappedBill.CurrentDate.Value.Date && b.BoxMonyCategoryId == 4).FirstOrDefault();
                                if (boxMony != null)
                                {
                                    double? NetResult = boxMony.Credit - OldBill.NetTotal;
                                    boxMony.Credit = double.Parse(NetResult.Value.ToString());

                                    dbcontext.BoxMonies.Update(boxMony);
                                    dbcontext.SaveChanges();

                                }

                                await dbcontext.SaveChangesAsync();
                                CheckBaseURL(BillModel);

                                transaction.Commit();
                                return BillModel;
                            }
                            catch (Exception e)
                            {
                                transaction.Rollback();
                                Console.WriteLine("Error occurred.");
                                return null;
                            }
                        }
                    }
                    if (BillModel.Id > 0 && BillModel.IsDelete == false)  ///Update Bill
                    {
                        ///Get BillCategory entity from database by id 
                        var Bill = dbcontext.Bills.Find(BillModel.Id);

                        var mappedBill = mapper.Map<BillModel, Bill>(BillModel, Bill);

                        mappedBill.CurrentDate = DateTime.Parse(_CurrentDate.ToString());
                        mappedBill.Date = DateTime.Parse(_Date.ToString());

                        dbcontext.UpdateRange(mappedBill.BillDetails);
                        dbcontext.UpdateRange(mappedBill.BillDeliveries);
                        //dbcontext.UpdateRange(mappedBill.BillCurrencies);
                        dbcontext.UpdateRange(mappedBill.BillTaxes);
                        dbcontext.Bills.Update(mappedBill);
                        dbcontext.SaveChanges();
                        if (BillModel.BillTypeId == (int)BillTypes.BillInvoice && BillModel.CheckWiteInvoies == false)
                        {
                            try
                            {
                                if (BillModel.CheckWiteInvoies == false & BillModel.IsApproverd == 2)
                                {
                                    // add in box monies
                                    var boxMony = dbcontext.BoxMonies.Where(b => b.CurrentDate.Value.Date == mappedBill.CurrentDate.Value.Date && b.BoxMonyCategoryId == 4).FirstOrDefault();
                                    if (boxMony == null)
                                    {
                                        BoxMonies NewBoxMony = new BoxMonies();

                                        if (mappedBill.PaymentId == 2)
                                        {
                                            NewBoxMony.Credit = double.Parse(mappedBill.Paied.Value.ToString());
                                        }
                                        else
                                        {
                                            NewBoxMony.Credit = double.Parse(mappedBill.Paied.Value.ToString());
                                        }
                                        NewBoxMony.Debit = 0;
                                        NewBoxMony.CurrentDate = mappedBill.CurrentDate;
                                        NewBoxMony.Date = mappedBill.Date;
                                        NewBoxMony.CurrentBalance = 0;
                                        NewBoxMony.BoxMonyCategoryId = 4;
                                        NewBoxMony.BoxMonyTypeId = BillModel.User.UserTypeId;
                                        NewBoxMony.UserId = BillModel.UserId;
                                        NewBoxMony.CurrencyId = 1;
                                        NewBoxMony.Note = "وارد مبيعات";
                                        dbcontext.BoxMonies.Add(NewBoxMony);
                                        dbcontext.SaveChanges();
                                    }
                                    else
                                    {

                                        var result = boxMony.Credit + mappedBill.NetTotal;
                                        double? NetResult = result;
                                        boxMony.Credit = double.Parse(NetResult.Value.ToString());
                                        dbcontext.BoxMonies.Update(boxMony);
                                        dbcontext.SaveChanges();

                                    }

                                }
                            }
                            catch (Exception e)
                            {
                                transaction.Rollback();
                                Console.WriteLine("Error occurred."+e);
                                return null;
                            }
                        }

                        CheckBaseURL(BillModel);

                        transaction.Commit();
                        return BillModel;
                    }
                    else
                    {

                        BillModel.IsDelete = false;
                        var mappedBill = mapper.Map<Bill>(BillModel);
                        var currentDate = DateTime.Parse(_CurrentDate.ToString());
                        var date = DateTime.Parse(_Date.ToString());
                        mappedBill.CurrentDate = currentDate;
                        mappedBill.Date = date;

                        if (BillModel.BillTypeId == (int)BillTypes.BillInvoice)
                        {
                            var maxOrderNum = dbcontext.Bills.Where(x => x.CurrentDate.Value.Date == mappedBill.CurrentDate.Value.Date).Max(x => x.OrderNo);
                            if (maxOrderNum == null) { maxOrderNum = 0; }

                            mappedBill.OrderNo = maxOrderNum + 1;

                        }
                        //mappedBill.BillCurrencies = null;
                        dbcontext.Bills.Add(mappedBill);
                        dbcontext.SaveChanges();

                        ///update bill details 
                        if (mappedBill.CheckWiteInvoies == false)
                        {
                            // add in box monies
                            var boxMony = dbcontext.BoxMonies.Where(b => b.CurrentDate.Value.Date == mappedBill.CurrentDate.Value.Date && b.BoxMonyCategoryId == 4).FirstOrDefault();
                            if (boxMony == null)
                            {
                                BoxMonies NewBoxMony = new BoxMonies();

                                if (mappedBill.PaymentId == 2)
                                {
                                    NewBoxMony.Credit = double.Parse(mappedBill.Paied.Value.ToString());
                                }
                                else
                                {
                                    NewBoxMony.Credit = double.Parse(mappedBill.Paied.Value.ToString());
                                }
                                NewBoxMony.Debit = 0;
                                NewBoxMony.CurrentDate = mappedBill.CurrentDate;
                                NewBoxMony.Date = mappedBill.Date;
                                NewBoxMony.CurrentBalance = 0;
                                NewBoxMony.BoxMonyCategoryId = 4;
                                NewBoxMony.BoxMonyTypeId = BillModel.User.UserTypeId;
                                NewBoxMony.UserId = BillModel.UserId;
                                NewBoxMony.CurrencyId = 1;
                                NewBoxMony.Note = "وارد مبيعات";
                                dbcontext.BoxMonies.Add(NewBoxMony);
                                dbcontext.SaveChanges();
                            }
                            else
                            {
                                var result = boxMony.Credit + mappedBill.NetTotal;
                                double? NetResult = result;
                                boxMony.Credit = double.Parse(NetResult.Value.ToString());
                                dbcontext.BoxMonies.Update(boxMony);
                                dbcontext.SaveChanges();

                            }

                        }

                        BillModel.Id = mappedBill.Id;
                        BillModel.OrderNo = mappedBill.OrderNo;

                        // cheack and printing ;
                        CheckBaseURL(BillModel);

                        transaction.Commit();
                        return BillModel;
                    }
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    Console.WriteLine("Error occurred.");
                    return null;
                }
            }
        }

        public void CheckBaseURL(BillModel BillModel)
        {
            var _chkOnline = BillModel.BaseUrl.ToLower().Contains("easacc");
            if (!_chkOnline)
            {

                    PrintBill(BillModel);
               

            }
        }

        public async void PrintBill(BillModel BillModel)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var url = "";
                    var chkRemoveDetail = BillModel.BillDetails.Where(b => b.IsDelete == true);

                    if (chkRemoveDetail.Count() > 0)
                    {
                        //url = "http://localhost:61721/api/BillDetailRemove";
                        url = "http://192.168.1.150:8080/api/BillDetailRemove";

                    }
                    if (BillModel.CheckWiteInvoies == false && chkRemoveDetail.Count() == 0)
                    {

                        //url = "http://localhost:61721/api/BillInvoice";
                        url = "http://192.168.1.150:8080/api/BillInvoice";

                    }
                    if (BillModel.CheckWiteInvoies == true && chkRemoveDetail.Count() == 0)
                    {
                        //url = "http://localhost:61721/api/BillWaitInvoice";
                        url = "http://192.168.1.150:8080/api/BillWaitInvoice";

                    }
                    Console.WriteLine("Before enter print");
                    var json = JsonConvert.SerializeObject(BillModel);
                    var data = new StringContent(json, Encoding.UTF8, "application/json");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = await client.PostAsync(url, data); //API controller name
                    Console.WriteLine("end print");
                    if (response.IsSuccessStatusCode == true)
                        BillModel.Reference = "    Print Success";
                    else BillModel.Reference = "    Print failed";
                
                }
            }
            catch (Exception)
            {

            }

        }


        public List<BillPlaceModel> GetBillPlaces()
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listBillPlace = dbcontext.BillPlaces.ToList();
                ///cast entities to models 
                var BillPlaceModelList = mapper.Map<List<BillPlaceModel>>(listBillPlace);

                ///return models 
                return BillPlaceModelList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<PaymentTypeModel> GetBillPaymentType()
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listPaymentTypes = dbcontext.PaymentTypes.ToList();
                ///cast entities to models 
                var PaymentTypesModelList = mapper.Map<List<PaymentTypeModel>>(listPaymentTypes);

                ///return models 
                return PaymentTypesModelList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<BillTypeModel> GetBillTypes()
        {
            try
            {
                ///retrive list of Bill (Entities).
                var ListBillTypes = dbcontext.BillTypes.ToList();
                ///cast entities to models 
                var BillTypesModelList = mapper.Map<List<BillTypeModel>>(ListBillTypes);

                ///return models 
                return BillTypesModelList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public NoteModel InsertOrUpdateNote(NoteModel NoteModel)
        {
            try
            {
                var mappeNote = mapper.Map<Note>(NoteModel);
                dbcontext.Notes.Add(mappeNote);
                dbcontext.SaveChanges();
                // return inserted object ;
                return NoteModel;
            }
            catch (Exception)
            {
                return null;
                //return false; 
            }
        }

        public List<NoteModel> GetNotes()
        {
            try
            {
                ///retrive list of Bill (Entities).
                var ListNote = dbcontext.Notes.ToList();
                ///cast entities to models 
                var NoteModelList = mapper.Map<List<NoteModel>>(ListNote);

                ///return models 
                return NoteModelList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool DeleteNote(int id)
        {
            try
            {
                ///get obj for delete 
                var note = dbcontext.Notes.Find(id);

                ///remove obj from db context 
                dbcontext.Notes.Remove(note);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }




        public async Task<PagedData<BillModel>> BillReportPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", BillModel searchBillVm = null, string component = null, string All = "")
        {
            var FromFormat = DateTime.Parse(From).ToString("yyyy/MM/dd hh:mm:ss tt");
            var ToFormat = DateTime.Parse(To).ToString("yyyy/MM/dd hh:mm:ss tt");

            var DateFrom = DateTime.Parse(FromFormat);
            var DateTo = DateTime.Parse(ToFormat);

            pageIndex = pageIndex != null ? pageIndex : 0;
            //pageSize = pageSize != null ? pageSize : 0;
            pageSize = int.MaxValue;
            SortKey = SortKey != null ? SortKey : "Id";
            sortOrderBY = sortOrderBY != null ? sortOrderBY : "asc";

            //---------------------------------------------------------------
            IQueryable<Bill> liststore;
            if (component == "reportToday" || component == "reportInvoice")
            {
                if (All == "all" || All == "الكل")
                {
                    liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.BillType).Include(x => x.User)
                                                .Where(b => b.CurrentDate.Value.Date >= DateFrom.Date && b.CurrentDate.Value.Date <= DateTo.Date &&
                                                            b.IsDelete == false && b.CheckWiteInvoies == false);
                }
                else
                {
                    liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.BillType).Include(x => x.User)
                                         .Where(b => b.CurrentDate.Value.Date >= DateFrom.Date && b.CurrentDate.Value.Date <= DateTo.Date &&
                                                     b.IsDelete == false && b.CheckWiteInvoies == false &&
                                                     b.User.BoxMonyTypeId == searchBillVm.User.BoxMonyTypeId &&
                                                     b.BranchId == searchBillVm.User.BranchId);
                }

            }
            else
            {
                liststore = dbcontext.Bills.Where(b => b.IsDelete == false && b.CheckWiteInvoies == true);
            }

            var totalcount = await liststore.CountAsync();
            var PageNumber = pageIndex * pageSize;
            try
            {

                //var newliststore = liststore.Skip(PageNumber.Value).Take(pageSize.Value).AsNoTracking().ProjectTo<BillModel>(mapper.ConfigurationProvider).ToList();

                IEnumerable<BillModel> DataModel = mapper.Map<IEnumerable<Bill>, IEnumerable<BillModel>>(liststore);


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

        public async Task<BillReportTotalsModel> BillReportTotalsPaginationAsync(string From = "", string To = "", BillModel searchBillVm = null, string component = null, string All = "")
        {
            try
            {
                var FromFormat = DateTime.Parse(From).ToString("yyyy/MM/dd hh:mm:ss tt");
                var ToFormat = DateTime.Parse(To).ToString("yyyy/MM/dd hh:mm:ss tt");

                var DateFrom = DateTime.Parse(FromFormat);
                var DateTo = DateTime.Parse(ToFormat);

                IQueryable<Bill> liststore;
                if (component == "reportToday" || component == "reportInvoice" || component == "billInvoice")
                {
                    if (All == "all" || All == "الكل")
                    {
                        //liststore = dbcontext.Bills.Include(x => x.User).Where(b => b.IsDelete == false && b.CheckWiteInvoies == false);
                        liststore = dbcontext.Bills.Include(x => x.User)
                                             .Where(b => b.CurrentDate.Value.Date >= DateFrom.Date && b.CurrentDate.Value.Date <= DateTo.Date &&
                                                         b.IsDelete == false && b.CheckWiteInvoies == false);
                    }
                    else
                    {
                        liststore = dbcontext.Bills.Include(x => x.User)
                                         .Where(b => b.CurrentDate.Value.Date >= DateFrom.Date && b.CurrentDate.Value.Date <= DateTo.Date &&
                                                              b.IsDelete == false && b.CheckWiteInvoies == false &&
                                                              b.User.BoxMonyTypeId == searchBillVm.User.BoxMonyTypeId);
                    }

                }
                else
                {
                    liststore = dbcontext.Bills.Where(b => b.IsDelete == false && b.CheckWiteInvoies == true &&
                                                           b.CurrentDate.Value.Date >= DateFrom.Date);
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
                    DateFrom = DateFrom.ToString(),
                    DateTo = DateTo.ToString(),
                };



                return model;
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public async Task<PagedData<BillModel>> BillReportPaginationByTimeAsync(int? pageIndex, int? pageSize, string searchString, string SortKey, string sortOrderBY, string From, string To, BillModel searchBillVm, string component, string TypeDate, string All = "")

        {
            var FromFormat = DateTime.Parse(From).ToString("yyyy/MM/dd hh:mm:ss tt");
            var ToFormat = DateTime.Parse(To).ToString("yyyy/MM/dd hh:mm:ss tt");

            var DateFrom = DateTime.Parse(FromFormat);
            var DateTo = DateTime.Parse(ToFormat);

            pageIndex = pageIndex != null ? pageIndex : 0;
            pageSize = int.MaxValue;
            SortKey = SortKey != null ? SortKey : "Id";
            sortOrderBY = sortOrderBY != null ? sortOrderBY : "asc";

            //---------------------------------------------------------------
            IQueryable<Bill> liststore;
            if (All == "all" || All == "الكل")
            {

                //liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.BillType).Include(x => x.User)
                //                  .Where(b =>  b.IsDelete == false && b.CheckWiteInvoies == false);

                liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.BillType).Include(x => x.User)
                                           .Where(b => b.Date.Value >= DateFrom && b.Date.Value <= DateTo &&
                                                           b.IsDelete == false && b.CheckWiteInvoies == false);
            }
            else
            {
                liststore = dbcontext.Bills.Include(x => x.PaymentType).Include(x => x.BillType).Include(x => x.User)
                                          .Where(b => b.Date.Value >= DateFrom && b.Date.Value <= DateTo &&
                                                           b.IsDelete == false && b.CheckWiteInvoies == false &&
                                                           b.User.BoxMonyTypeId == searchBillVm.User.BoxMonyTypeId &&
                                                           b.BranchId == searchBillVm.User.BranchId);
            }


            var totalcount = await liststore.CountAsync();
            var PageNumber = pageIndex * pageSize;
            try
            {

                IEnumerable<BillModel> DataModel = mapper.Map<IEnumerable<Bill>, IEnumerable<BillModel>>(liststore);
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

        public async Task<BillReportTotalsModel> BillReportTotalsPaginationTimeAsync(string From = "", string To = "", BillModel searchBillVm = null, string component = null, string All = "")
        {
            try
            {
                var FromFormat = DateTime.Parse(From).ToString("yyyy/MM/dd hh:mm:ss tt");
                var ToFormat = DateTime.Parse(To).ToString("yyyy/MM/dd hh:mm:ss tt");

                var DateFrom = DateTime.Parse(FromFormat);
                var DateTo = DateTime.Parse(ToFormat);

                IQueryable<Bill> liststore;
                if (All == "all" || All == "الكل")
                {
                    //liststore = dbcontext.Bills.Include(x => x.User)
                    //       .Where(b =>b.IsDelete == false && b.CheckWiteInvoies == false);
                    liststore = dbcontext.Bills.Include(x => x.User)
                                               .Where(b => b.Date.Value >= DateFrom && b.Date.Value <= DateTo &&
                                                           b.IsDelete == false && b.CheckWiteInvoies == false &&
                                                           b.BranchId == searchBillVm.User.BranchId);
                }
                else
                {
                    liststore = dbcontext.Bills.Include(x => x.User)
                                               .Where(b => b.Date.Value >= DateFrom && b.Date.Value <= DateTo &&
                                                          b.IsDelete == false && b.CheckWiteInvoies == false &&
                                                          b.User.BoxMonyTypeId == searchBillVm.User.BoxMonyTypeId &&
                                                          b.BranchId == searchBillVm.User.BranchId);
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
                    DateFrom = DateFrom.ToString(),
                    DateTo = DateTo.ToString(),
                };

                return model;
            }
            catch (Exception e)
            {
                return null;
            }
        }


        // .......................   kitchen Bill .................... //
        public async Task<PagedData<BillModel>> BillListPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", BillModel searchBillVm = null, string type = null)
        {

            var FromFormat = DateTime.Parse(From).ToString("yyyy/MM/dd hh:mm:ss tt");
            var ToFormat = DateTime.Parse(To).ToString("yyyy/MM/dd hh:mm:ss tt");

            var DateFrom = DateTime.Parse(FromFormat);
            var DateTo = DateTime.Parse(ToFormat);

            pageIndex = pageIndex != null ? pageIndex : 0;
            //pageSize = pageSize != null ? pageSize : 0;
            pageSize = int.MaxValue;
            SortKey = SortKey != null ? SortKey : "Id";
            sortOrderBY = sortOrderBY != null ? sortOrderBY : "asc";
            //---------------------------------------------------------------
            IQueryable<Bill> liststore;

            liststore = dbcontext.Bills.Include(x => x.User)
                                       .Include(x => x.BillType)
                                       .Include(x => x.BillPlace)
                                       .Include(x => x.BillDetails)
                                                      .ThenInclude(x => x.Item).ThenInclude(x => x.ItemPrices)
                                                      .ThenInclude(x => x.ItemSize).OrderBy(SortKey + " " + sortOrderBY)
                                       .Where(b => b.IsApproverd == 1);

            var totalcount = await liststore.CountAsync();
            var PageNumber = pageIndex * pageSize;
            var newliststore = await liststore.ToListAsync();
            //var newliststore = await liststore.Skip(PageNumber.Value).Take(pageSize.Value).ToListAsync();

            IEnumerable<BillModel> DataModel = mapper.Map<IEnumerable<Bill>, IEnumerable<BillModel>>(newliststore);

            //foreach (var item in DataModel)
            //{
            //    item.BillDetails = item.BillDetails.Where(f => f.IsNew == true).ToList();
            //}

            PagedData<BillModel> resultPagedData = new PagedData<BillModel>()
            {
                Items = DataModel,
                TotalCount = totalcount,
            };

            return resultPagedData;
        }

        public async Task<PagedData<BillModel>> BillListFinshedPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", BillModel searchBillVm = null, string type = null)
        {
            var FromFormat = DateTime.Parse(From).ToString("yyyy/MM/dd hh:mm:ss tt");
            var ToFormat = DateTime.Parse(To).ToString("yyyy/MM/dd hh:mm:ss tt");

            var DateFrom = DateTime.Parse(FromFormat);
            var DateTo = DateTime.Parse(ToFormat);

            pageIndex = pageIndex != null ? pageIndex : 0;
            //pageSize = pageSize != null ? pageSize : 0;
            pageSize = int.MaxValue;
            SortKey = SortKey != null ? SortKey : "Id";
            sortOrderBY = sortOrderBY != null ? sortOrderBY : "asc";
            //---------------------------------------------------------------
            IQueryable<Bill> liststore;
            if (type == "finshedBill")
            {
                //var _BillDetails =new List<BillDetails>();
                liststore = dbcontext.Bills.Include(x => x.BillDetails)
                                                         .ThenInclude(x => x.Item).ThenInclude(x => x.ItemPrices)
                                                         .ThenInclude(x => x.ItemSize).OrderBy(SortKey + " " + sortOrderBY)
                                                         .Include(x => x.BillType)
                                                         .Include(x => x.User)
                                                         .Include(x => x.BillPlace)
                                                         .Where(b => b.CurrentDate.Value.Date >= DateFrom.Date && b.CurrentDate.Value.Date <= DateTo.Date && b.IsApproverd == 2);

            }
            else
            {
                liststore = null;
            }
            var totalcount = await liststore.CountAsync();
            var PageNumber = pageIndex * pageSize;
            var newliststore = await liststore.Skip(PageNumber.Value).Take(pageSize.Value).ToListAsync();

            IEnumerable<BillModel> DataModel = mapper.Map<IEnumerable<Bill>, IEnumerable<BillModel>>(newliststore);

            PagedData<BillModel> resultPagedData = new PagedData<BillModel>()
            {
                Items = DataModel,
                TotalCount = totalcount,
            };

            return resultPagedData;

        }


        // ......................  bill by id  .........................//
        public async Task<PagedData<BillModel>> GetBillByidPaginated(int? id = 0)
        {
            try
            {
                IQueryable<Bill> liststore;

                liststore = dbcontext.Bills.Include(x => x.BillDetails)
                                          .ThenInclude(x => x.Item).ThenInclude(x => x.ItemPrices).ThenInclude(x => x.ItemSize)

                              .Include(x => x.BillDetails)
                                          .ThenInclude(x => x.Item).ThenInclude(x => x.ItemCategory).ThenInclude(x => x.Printer)
                              //.Include(x => x.BillCurrencies)
                              .Include(x => x.BillDeliveries)
                              .Include(x => x.BillTaxes)
                              .Include(x => x.PaymentType)
                              .Include(x => x.BillPlace)
                              .Include(x => x.Application)
                              .Include(x => x.Currencies)
                              .Include(x => x.DiscountType)
                              .Include(x => x.User).ThenInclude(u => u.Branch).ThenInclude(u => u.CompanyInfo)

                              .Include(x => x.BillType).Where(b => b.Id == id);

                var newBill = await liststore.ToListAsync();
                IEnumerable<BillModel> DataModel = mapper.Map<IEnumerable<Bill>, IEnumerable<BillModel>>(newBill);

                PagedData<BillModel> resultPagedData = new PagedData<BillModel>()
                {
                    Items = DataModel,
                };

                return resultPagedData;

            }
            catch (Exception)
            {
                return null;
            }
        }


        public BillModel UpdateBill(BillModel BillModel)
        {

            var Bill = dbcontext.Bills.Find(BillModel.Id);
            if (Bill != null)   ///if Exist 
            {
                var mappedBill = mapper.Map<BillModel, Bill>(BillModel, Bill);
                mappedBill.BillDetails = dbcontext.BillDetails.Where(b => b.BillId == BillModel.Id).ToList();
                //mappedBill.TableNo = BillModel.TableNo;
                //mappedBill.IsApproverd = mappedBill.IsApproverd;
                //mappedBill.BillDetails = mappedBill.BillDetails;
                dbcontext.BillDetails.UpdateRange(mappedBill.BillDetails);
                dbcontext.Bills.Update(mappedBill);
                dbcontext.SaveChanges();
                return BillModel;
            }
            else
            {
                return null;
            }

        }


        public BillModel InsertOrUpdate(BillModel BillModel)
        {
            throw new NotImplementedException();
        }

        public int LastBill(DateTime date)
        {
            var _LastBill = dbcontext.Bills.LastOrDefault(b => b.CurrentDate.Value.Date == date.Date);
            if (_LastBill != null)
            {
                return _LastBill.OrderNo.Value + 1;
            }
            else
            {
                return 1;
            }
        }

        public async Task<PagedData<BillModel>> BillWaitPaginationAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string From = "", string To = "", BillModel searchBillVm = null, string type = null)
        {
            var FromFormat = DateTime.Parse(From).ToString("yyyy/MM/dd hh:mm:ss tt");
            var ToFormat = DateTime.Parse(To).ToString("yyyy/MM/dd hh:mm:ss tt");

            var DateFrom = DateTime.Parse(FromFormat);
            var DateTo = DateTime.Parse(ToFormat);

            IQueryable<Bill> liststore;


            liststore = dbcontext.Bills.Where(b => b.IsDelete == false && b.CheckWiteInvoies == true);

            var totalcount = await liststore.CountAsync();
            var PageNumber = pageIndex * pageSize;
            try
            {

                IEnumerable<BillModel> DataModel = mapper.Map<IEnumerable<Bill>, IEnumerable<BillModel>>(liststore);
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

        public async Task<BillReportTotalsModel> BillReportTotalsTodayPaginationAsync(string From = "", string To = "", BillModel searchBillVm = null, string component = null, string All = "")
        {

            try
            {

                var _LastBill = dbcontext.UserDates.LastOrDefault().CurrentDate;
                var FromFormat = _LastBill.ToString();
                //var FromFormat = DateTime.Parse(From).ToString("yyyy/MM/dd hh:mm:ss tt");
                var ToFormat = DateTime.Parse(To).ToString("yyyy/MM/dd hh:mm:ss tt");

                //var FromFormat = DateTime.Parse(From).ToString("yyyy/MM/dd hh:mm:ss tt");
                //var ToFormat = DateTime.Parse(To).ToString("yyyy/MM/dd hh:mm:ss tt");



                var DateFrom = DateTime.Parse(FromFormat);
                var DateTo = DateTime.Parse(ToFormat);

                IQueryable<Bill> liststore;
                liststore = dbcontext.Bills.Include(x => x.User)
                                           .Where(b => b.CurrentDate.Value.Date >= DateFrom.Date &&
                                                       b.CurrentDate.Value.Date <= DateTo.Date &&
                                                       b.IsDelete == false && b.CheckWiteInvoies == false &&
                                                       b.User.BoxMonyTypeId == searchBillVm.User.BoxMonyTypeId);



                var model = new BillReportTotalsModel()
                {
                    TotalBillCount = await liststore.CountAsync(),
                    SumBillNetTotals = (double)await liststore.SumAsync(y => y.NetTotal),
                    SumBillCash = (double)await liststore.Where(x => x.PaymentId == 1 || x.PaymentId == 2).SumAsync(y => y.Paied),
                    SumBillVisa = (double)await liststore.Where(x => x.PaymentId == 3).SumAsync(y => y.Paied),
                    SumBillRemaining = (double)await liststore.Where(x => x.PaymentId == 2).SumAsync(y => y.Remaining),
                    SumBillDiscounts = (double)await liststore.SumAsync(y => y.CurrentDiscount),
                    SumBillTotalVatTax = (double)await liststore.SumAsync(y => y.TotalVatTax),
                    DateFrom = DateFrom.ToString(),
                    DateTo = DateTo.ToString(),
                };



                return model;
            }
            catch (Exception e)
            {
                return null;
            }

        }
    }
}




