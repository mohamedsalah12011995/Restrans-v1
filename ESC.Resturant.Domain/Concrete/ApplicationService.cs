using AutoMapper;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using ESC.Resturant.Data.Context;


namespace ESC.Resturant.Domain.Concrete
{
    public class ApplicationService : BaseService, IApplicationService
    {
        public ApplicationService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsApplicationExist(int id)
        {
            return dbcontext.Applications.Any(e => e.Id == id);
        }

        public bool DeleteApplication(int id)
        {
            try
            {
                ///get obj for delete 
                //var Application = dbcontext.Applications.Find(id);

                ///remove obj from db context 
                //dbcontext.Applications.Remove(Application);

                ///save changes on database 
                //dbcontext.SaveChanges();
                //return true;

                var _app = dbcontext.Applications.Find(id);
                _app.IsDelete = true;

                dbcontext.Applications.Update(_app);
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public ApplicationModel GetApplicationByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var Application = dbcontext.Applications.Find(id);
                ///cast entitiy to model 
                var ApplicationModel = mapper.Map<ApplicationModel>(Application);

                ///return model
                return ApplicationModel;
            }
            catch
            {
                return null;
            }
        }

        public List<ApplicationModel> GetApplications()
        {
            try
            {
                ///retrive list of Application (Entities).
                var listApplication = dbcontext.Applications.Where(a => a.IsDelete == false).ToList();
                ///cast entities to models 
                var ApplicationModelList = mapper.Map<List<ApplicationModel>>(listApplication);

                ///return models 
                return ApplicationModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public ApplicationModel InsertOrUpdate(ApplicationModel ApplicationModel)
        {
            if (ApplicationModel.Id > 0)  ///Update Application
            {
                ///Get Application entity from database by id 
                var Application = dbcontext.Applications.Find(ApplicationModel.Id);
                if (Application != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from Applicationmodel to Application 
                        var mappedApplication = mapper.Map<ApplicationModel, Application>(ApplicationModel, Application);
                        dbcontext.Applications.Update(mappedApplication);
                        dbcontext.SaveChanges();

                        //  return true;
                        return ApplicationModel;
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
                    var mappedApplication = mapper.Map<Application>(ApplicationModel);
                    dbcontext.Applications.Add(mappedApplication);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return ApplicationModel;
                }
                catch
                {
                    return null;
                    //return false; 
                }
            }
        }
    }
}