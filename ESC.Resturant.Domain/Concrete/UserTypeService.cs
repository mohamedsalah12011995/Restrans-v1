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
    public class UserTypeservice : BaseService, IUserTypeService
    {
        public UserTypeservice(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsUserTypeExist(int id)
        {
            return dbcontext.UserTypes.Any(e => e.Id == id);
        }

        public bool DeleteUserType(int id)
        {
            try
            {
                ///get obj for delete 
                //var UserType = dbcontext.UserTypes.Find(id);

                ///remove obj from db context 
                //dbcontext.UserTypes.Remove(UserType);

                ///save changes on database 
                //dbcontext.SaveChanges();
                //return true;
                var _UserType = dbcontext.UserTypes.Find(id);
                _UserType.IsDelete = true;

                dbcontext.UserTypes.Update(_UserType);
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public UserTypeModel GetUserTypeByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var UserType = dbcontext.UserTypes.Find(id);
                ///cast entitiy to model 
                var UserTypeModel = mapper.Map<UserTypeModel>(UserType);

                ///return model
                return UserTypeModel;
            }
            catch
            {
                return null;
            }
        }

        public List<UserTypeModel> GetUserTypes()
        {
            try
            {
                ///retrive list of Application (Entities).
                var listUserType = dbcontext.UserTypes.Where(u=> u.IsDelete==false).ToList();
                ///cast entities to models 
                var UserTypeModelList = mapper.Map<List<UserTypeModel>>(listUserType);

                ///return models 
                return UserTypeModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public UserTypeModel InsertOrUpdate(UserTypeModel UserTypeModel)
        {
            if (UserTypeModel.Id > 0)  ///Update UserType
            {
                ///Get Application entity from database by id 
                var UserType = dbcontext.UserTypes.Find(UserTypeModel.Id);
                if (UserType != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from Applicationmodel to Application 
                        var mappedUserType = mapper.Map<UserTypeModel, UserType>(UserTypeModel, UserType);
                        dbcontext.UserTypes.Update(mappedUserType);
                        dbcontext.SaveChanges();

                        //  return true;
                        return UserTypeModel;
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
                    var mappedUserType = mapper.Map<UserType>(UserTypeModel);
                    dbcontext.UserTypes.Add(mappedUserType);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return UserTypeModel;
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