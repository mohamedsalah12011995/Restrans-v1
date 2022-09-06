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
    public class TablesPlacesService : BaseService, ITablesPlacesService
    {
        public TablesPlacesService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsTablesPlacesExist(int id)
        {
            return dbcontext.TablesPlaces.Any(e => e.Id == id);
        }

        public bool DeleteTablesPlaces(int id)
        {
            try
            {
                ///get obj for delete 
                //var TablesPlaces = dbcontext.TablesPlacess.Find(id);

                ///remove obj from db context 
                //dbcontext.TablesPlacess.Remove(TablesPlaces);

                ///save changes on database 
                //dbcontext.SaveChanges();
                //return true;

                var _app = dbcontext.TablesPlaces.Find(id);
                _app.IsDelete = true;

                dbcontext.TablesPlaces.Update(_app);
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public TablesPlacesModel GetTablesPlacesByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var TablesPlaces = dbcontext.TablesPlaces.Find(id);
                ///cast entitiy to model 
                var TablesPlacesModel = mapper.Map<TablesPlacesModel>(TablesPlaces);

                ///return model
                return TablesPlacesModel;
            }
            catch
            {
                return null;
            }
        }

        public List<TablesPlacesModel> GetTablesPlaces()
        {
            try
            {
                List<TablesPlaces> tablesPlaces = new List<TablesPlaces>();
                ///retrive list of TablesPlaces (Entities).
                tablesPlaces = dbcontext.TablesPlaces.Where(a => a.IsDelete == false).ToList();
                ///cast entities to models 
                var TablesPlacesModelList = mapper.Map<List<TablesPlacesModel>>(tablesPlaces);

                ///return models 
                return TablesPlacesModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public TablesPlacesModel InsertOrUpdate(TablesPlacesModel TablesPlacesModel)
        {
            if (TablesPlacesModel.Id > 0)  ///Update TablesPlaces
            {
                ///Get TablesPlaces entity from database by id 
                var TablesPlaces = dbcontext.TablesPlaces.Find(TablesPlacesModel.Id);
                if (TablesPlaces != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from TablesPlacesmodel to TablesPlaces 
                        var mappedTablesPlaces = mapper.Map<TablesPlacesModel, TablesPlaces>(TablesPlacesModel, TablesPlaces);
                        dbcontext.TablesPlaces.Update(mappedTablesPlaces);
                        dbcontext.SaveChanges();

                        //  return true;
                        return TablesPlacesModel;
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
                    var mappedTablesPlaces = mapper.Map<TablesPlaces>(TablesPlacesModel);
                    dbcontext.TablesPlaces.Add(mappedTablesPlaces);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return TablesPlacesModel;
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