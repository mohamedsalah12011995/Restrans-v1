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
    //public class UserService : BaseService, IUserService
    //{
    //    public UserService(IMapper _mapper, ESC_Resturant_DBContext escContext)
    //    {

    //        mapper = _mapper;
    //        dbcontext = escContext;
    //    }
    //    public bool CheckIsUserExist(string id)
    //    {
    //        return dbcontext.Users.Any(e => e.Id == id);
    //    }

    //    public UserModel CheckUerLogin(string username, string pass)
    //    {
    //        try
    //        {
    //            ///retrive  Bill  (Entitiy).
    //            var User = dbcontext.Users.Where(x=>x.UserName == username &&  x.Password == pass).FirstOrDefault();
    //            ///cast entitiy to model 
    //            var UsersModel = mapper.Map<UserModel>(User);

    //            ///return model
    //            return UsersModel;
    //        }
    //        catch(Exception e)
    //        {
    //            return null;
    //        }

    //    }

    //    public bool DeleteUser(int id)
    //    {
    //        try
    //        {
    //            ///get obj for delete 
    //            var User = dbcontext.Users.Find(id);

    //            ///remove obj from db context 
    //            dbcontext.Users.Remove(User);

    //            ///save changes on database 
    //            dbcontext.SaveChanges();
    //            return true;
    //        }
    //        catch
    //        {
    //            return false;
    //        }
    //    }


    //    public List<UserModel> GetUser()
    //    {
    //        try
    //        {
    //            ///retrive list of Bill (Entities).
    //            var listUsers = dbcontext.Users.ToList();
    //            ///cast entities to models 
    //            var listUserModels = mapper.Map<List<UserModel>>(listUsers);

    //            ///return models 
    //            return listUserModels;
    //        }
    //        catch (Exception e)
    //        {
    //            return null;
    //        }
    //    }

    //    public UserModel GetUserByid(int id)
    //    {
    //        try
    //        {
    //            ///retrive  Bill  (Entitiy).
    //            var  User = dbcontext.Users.Find(id);
    //            ///cast entitiy to model 
    //            var UsersModel = mapper.Map<UserModel>(User);

    //            ///return model
    //            return UsersModel;
    //        }
    //        catch
    //        {
    //            return null;
    //        }
    //    }

    //    public UserModel InsertOrUpdate(UserModel UserModel)
    //    {
    //        if (UserModel.Id > 0)  ///Update BillCategory 
    //        {
    //            ///Get BillCategory entity from database by id 
    //            var BoxMony = dbcontext.Users.Find(UserModel.Id);
    //            if (BoxMony != null)   ///if Exist 
    //            {
    //                try
    //                {
    //                    ///Mapp new values from BoxMonyModel to BoxMony 
    //                    var mappedUser = mapper.Map<UserModel, User>(UserModel, BoxMony);
    //                    dbcontext.Users.Update(mappedUser);
    //                    dbcontext.SaveChanges();

    //                    //  return true;
    //                    return UserModel;
    //                }
    //                catch (Exception)
    //                {
    //                    return null;
    //                }


    //            }
    //            else { return null; }
    //        }
    //        else
    //        {
    //            try
    //            {
    //                var mappedUserModel = mapper.Map<User>(UserModel);
    //                dbcontext.Users.Add(mappedUserModel);
    //                dbcontext.SaveChanges();
    //                // return inserted object ;
    //                return UserModel;
    //            }
    //            catch
    //            {
    //                return null;
    //                //return false; 
    //            }
    //        }
    //    }
    //}
}



