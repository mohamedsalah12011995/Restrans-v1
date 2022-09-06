using AutoMapper;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using ESC.Resturant.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace ESC.Resturant.Domain.Concrete
{
    class UserDateService : BaseService, IUserDateService
    {
        public UserDateService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public UserDateModel GetUserDateModelByUserId(string id)
        {

            try
            {
                var _UserDate = dbcontext.UserDates.SingleOrDefault(x => x.UserId == id);
                var mappedUserDate = mapper.Map<UserDateModel>(_UserDate);
                return mappedUserDate;
            }
            catch
            {
                return null;
            }

        }

        //public UserDateModel InsertOrUpdateUserDate(UserDateModel _UserDateModel)
        //{
        //    if (_UserDateModel.Id > 0)  ///Update Application
        //    {
        //        ///Get Application entity from database by id 
        //        var _UserDate = dbcontext.UserDates.Find(_UserDateModel.Id);
        //        if (_UserDate != null)   ///if Exist 
        //        {

        //            try
        //            {
        //                ///Mapp new values from Applicationmodel to Application 
        //                var mappedUserDate = mapper.Map<UserDateModel, UserDate>(_UserDateModel, _UserDate);
        //                dbcontext.UserDates.Update(mappedUserDate);
        //                dbcontext.SaveChanges();

        //                //  return true;
        //                return _UserDateModel;
        //            }
        //            catch (Exception)
        //            {
        //                return null;
        //            }


        //        }
        //        else { return null; }
        //    }
        //    else
        //    {
        //        try
        //        {
        //            var mappedUserDate = mapper.Map<UserDate>(_UserDateModel);
        //            dbcontext.UserDates.Add(mappedUserDate);
        //            dbcontext.SaveChanges();
        //            // return inserted object ;
        //            return _UserDateModel;
        //        }
        //        catch
        //        {
        //            return null;
        //            //return false; 
        //        }
        //    }
        //}



        public UserDateModel InsertOrUpdateUserDate(UserDateModel userDateModel)
        {
            


                var _UserDate = dbcontext.UserDates.SingleOrDefault(x=> x.UserId==userDateModel.UserId);
                if (_UserDate != null)   ///if Exist 
                {
                    try
                    {
                    _UserDate.CurrentDate = userDateModel.CurrentDate;
                        ///Mapp new values from Applicationmodel to Application 
                   //     var mappedUserDate = mapper.Map<UserDateModel, UserDate>(userDateModel, _UserDate);
                        dbcontext.UserDates.Update(_UserDate);
                        dbcontext.SaveChanges();
                        return userDateModel;
                    }
                    //  return true;
                    catch (Exception ex)
                    {
                        return null;
                    }


                
            }
            else
            {
                try
                {
                    var mappedUserDate = mapper.Map<UserDate>(userDateModel);
                    dbcontext.UserDates.Add(mappedUserDate);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return userDateModel;
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
