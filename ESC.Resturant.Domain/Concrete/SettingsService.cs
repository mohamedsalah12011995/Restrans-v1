using AutoMapper;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using ESC.Resturant.Data.Context;
using Microsoft.EntityFrameworkCore;



namespace ESC.Resturant.Domain.Concrete
{
    public class SettingsService : BaseService, ISettingsService
    {
        public SettingsService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }
        public bool CheckIsSettingsExist(int id)
        {
            return dbcontext.Settings.Any(e => e.Id == id);
        }

        public bool DeleteSettings(int id)
        {
            try
            {
                ///get obj for delete 
                var Settings = dbcontext.Settings.Find(id);

                ///remove obj from db context 
                dbcontext.Settings.Remove(Settings);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public SettingsModel GetSettingsByid(int id)
        {
            try
            {
                var Settings = dbcontext.Settings.Find(id);
                var SettingssModel = mapper.Map<SettingsModel>(Settings);

                return SettingssModel;
            }
            catch
            {
                return null;
            }
        }

        public List<SettingsModel> GetSettings()
        {
            try
            {
                var listSettings = dbcontext.Settings.Where(x => x.IsDelete == false).ToList();
                var SettingsModelList = mapper.Map<List<SettingsModel>>(listSettings);

                ///return models 
                return SettingsModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public SettingsModel InsertOrUpdate(SettingsModel SettingsModel)
        {
            if (SettingsModel.Id > 0)  ///Update BillCategory 
            {
                ///Get BillCategory entity from database by id 
                var BoxMony = dbcontext.Settings.Find(SettingsModel.Id);
                if (BoxMony != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from BoxMonyModel to BoxMony 
                        var mappedSettings = mapper.Map<SettingsModel, Settings>(SettingsModel, BoxMony);
                        dbcontext.Settings.Update(mappedSettings);
                        dbcontext.SaveChanges();

                        //  return true;
                        return SettingsModel;
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
                    var mappedBoxMony = mapper.Map<Settings>(SettingsModel);
                    dbcontext.Settings.Add(mappedBoxMony);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return SettingsModel;
                }
                catch (Exception e)
                {
                    return null;
                    //return false; 
                }
            }
        }
    }
}



