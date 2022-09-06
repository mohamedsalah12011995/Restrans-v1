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

namespace ESC.Resturant.Domain.Concrete
{
    public class BoxMoniesService : BaseService, IBoxMoniesService
    {
        public BoxMoniesService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }
        public bool CheckIsBoxMoniesExist(int id)
        {
            return dbcontext.BoxMonies.Any(e => e.Id == id);
        }

        public bool DeleteBoxMonies(int id)
        {
            try
            {
                ///get obj for delete 
                var BoxMony = dbcontext.BoxMonies.Find(id);

                ///remove obj from db context 
                dbcontext.BoxMonies.Remove(BoxMony);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public List<BoxMoneisModel> GetBoxMonies(DateTime date_from, DateTime date_to)
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listBoxMony = dbcontext.BoxMonies.Include(b => b.BoxMonyCategories)
                                                     .Include(b => b.BoxMonyTypes)
                                                     //.Include(b => b.User)
                                                     .Where(b => b.CurrentDate.Value.Date >= date_from.Date && b.CurrentDate.Value.Date <= date_to.Date).ToList();
                ///cast entities to models 
                var BoxMonyModelList = mapper.Map<List<BoxMoneisModel>>(listBoxMony);

                ///return models 
                return BoxMonyModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public BoxMoneisModel GetBoxMoniesByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var chk = dbcontext.BoxMonies.Find(id);
                if (chk!=null)
                {
                    var boxMony = dbcontext.BoxMonies.Include(b => b.BoxMonyCategories)
                                            .Include(b => b.BoxMonyTypes)
                                            .Include(b => b.BoxMonyCategories)
                                            .Include(b => b.User).FirstOrDefault(f => f.Id == id);
                    ///cast entitiy to model 
                    var boxMonyModel = mapper.Map<BoxMoneisModel>(boxMony);
                    return boxMonyModel;

                    ///return model
                }
                else
                {
                    return null;
                }

            }
            catch
            {
                return null;
            }
        }

        public List< BoxMoneisModel> GetBoxMoniesByDay(DateTime From,DateTime To)
        {
            try
            {
                ///retrive list of Bill (Entities).
                var BoxMonyDay = dbcontext.BoxMonies.Include(b => b.BoxMonyCategories)
                                                    .Include(b => b.BoxMonyTypes)
                                                    .Include(b => b.BoxMonyCategories)
                                                    .Include(b => b.User)
                           .Where(b => b.CurrentDate.Value.Date >= From.Date&& b.Date.Value.Date<=To.Date).ToList();
      
                ///cast entities to models 
                var BoxMonyModel = mapper.Map<List<BoxMoneisModel>>(BoxMonyDay);
                ///return models 
                return BoxMonyModel;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public BoxMoneisModel InsertOrUpdate(BoxMoneisModel boxMoniesModel)
        {
            if (boxMoniesModel.Id > 0)  ///Update BillCategory 
            {
                ///Get BillCategory entity from database by id 
                var BoxMony = dbcontext.BoxMonies.Find(boxMoniesModel.Id);
                if (BoxMony != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from BoxMonyModel to BoxMony 
                        var mappedBoxMonies = mapper.Map<BoxMoneisModel, BoxMonies>(boxMoniesModel, BoxMony);
                        dbcontext.BoxMonies.Update(mappedBoxMonies);
                        dbcontext.SaveChanges();

                        //  return true;
                        return boxMoniesModel;
                    }
                    catch (Exception x)
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
                    var mappedBoxMony = mapper.Map<BoxMonies>(boxMoniesModel);
                    dbcontext.BoxMonies.Add(mappedBoxMony);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return boxMoniesModel;
                }
                catch (Exception e)
                {
                    return null;
                    //return false; 
                }
            }
        }

        public async Task<object> BoxMoniesPaginatedAsync(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", DateTime? From = null, DateTime? To = null,int boxMonyTypeId=0, BoxMoneisModel boxMoneis = null)
        {
            try
            {
                pageIndex = pageIndex != null ? pageIndex : 0;
                //pageSize = pageSize != null ? pageSize : 0;
                pageSize = int.MaxValue;
                SortKey = SortKey != null ? SortKey : "Id";
                sortOrderBY = sortOrderBY != null ? sortOrderBY : "asc";
                //---------------------------------------------------------------
                IQueryable<BoxMonies> liststore;

                liststore = dbcontext.BoxMonies.Include(b => b.BoxMonyCategories)
                                            .Include(b => b.BoxMonyTypes)
                                            .Include(b => b.BoxMonyCategories)
                                            .Include(b => b.User).Where(b => b.CurrentDate.Value.Date >= From.Value.Date &&
                                                                             b.CurrentDate.Value.Date <= To.Value.Date &&
                                                                             b.BoxMonyTypeId == boxMonyTypeId);


                var totalcount = await liststore.CountAsync();
                var PageNumber = pageIndex * pageSize;
                var newliststore = await liststore.Skip(PageNumber.Value).Take(pageSize.Value).ToListAsync();

                IEnumerable<BoxMoneisModel> DataModel = mapper.Map<IEnumerable<BoxMonies>, IEnumerable<BoxMoneisModel>>(newliststore);
                return DataModel;
            }
            catch (Exception e)
            {
                return null;
            }


        }
    }
}



