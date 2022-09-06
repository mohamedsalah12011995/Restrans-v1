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
    public class PeopleService : BaseService, IPeopleService
    {
        public PeopleService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsPeopleExist(int id)
        {
            return dbcontext.Peoples.Any(e => e.Id == id);
        }

        public bool DeletePeople(int id)
        {
            try
            {
                ///get obj for delete 
                var People = dbcontext.Peoples.Find(id);

                ///remove obj from db context 
                dbcontext.Peoples.Remove(People);

                ///save changes on database 
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public PeopleModel GetPeopleByid(int id)
        {
            try
            {
                ///retrive  People  (Entitiy).
                var People = dbcontext.Peoples.Find(id);
                ///cast entitiy to model 
                var PeopleModel = mapper.Map<PeopleModel>(People);

                ///return model
                return PeopleModel;
            }
            catch
            {
                return null;
            }
        }

        public List<PeopleModel> GetPeoples( )
        {
            try
            {
                ///retrive list of People (Entities).
                var listPeople = dbcontext.Peoples.Where(X => X.IsDelete == false).Include(X => X.PeopleCategory)
                    .Include(X => X.PeopleType).ToList();
                ///cast entities to models 
                var PeopleModelList = mapper.Map<List<PeopleModel>>(listPeople);

                ///return models 
                return PeopleModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public PeopleModel InsertOrUpdate(PeopleModel PeopleModel)
        {
            if (PeopleModel.Id > 0)  ///Update PeopleCategory 
            {
                ///Get PeopleCategory entity from database by id 
                var People = dbcontext.Peoples.Find(PeopleModel.Id);
                if (People != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from PeopleCategoryrmodel to PeopleCategory 
                        var mappedPeople = mapper.Map<PeopleModel, People>(PeopleModel, People);
                        dbcontext.Peoples.Update(mappedPeople);
                        dbcontext.SaveChanges();

                        //  return true;
                        return PeopleModel;
                    }
                    catch (Exception e)
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
                    var mappedPeople = mapper.Map<People>(PeopleModel);
                    dbcontext.Peoples.Add(mappedPeople);
                    dbcontext.SaveChanges();
                    PeopleModel.Id = mappedPeople.Id;
                    PeopleModel.Name = mappedPeople.Name;
                    PeopleModel.Phone = mappedPeople.Phone;
                    PeopleModel.Address = mappedPeople.Address;
                    // return inserted object ;
                    return PeopleModel;
                }
                catch
                {
                    return null;
                    //return false; 
                }
            }
        }


        public bool CheckIsPeopleCategoryExist(int id)
        {
            return dbcontext.PeopleCategories.Any(e => e.Id == id);
        }


        public List<PeopleTypesModel> GetAllPeopleTypes( )
        {
            try
            {
                ///retrive list of People (Entities).
                var listPeopleTypes = dbcontext.PeopleTypes.ToList();
                ///cast entities to models 
                var PeopleModelList = mapper.Map<List<PeopleTypesModel>>(listPeopleTypes);

                ///return models 
                return PeopleModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }


        //List<PeopleCategoriesModel> GetPeopleCategories( )
        //{
        //     try{
        //        ///retrive list of People (Entities).
        //        var listPeopleCategories = dbcontext.PeopleCategories.ToList();
                
        //        ///cast entities to models 
        //        var PeopleModelList = mapper.Map<List<PeopleCategoriesModel>>(listPeopleCategories);

        //        ///return models 
        //        return PeopleModelList;
        //    }
        //    catch (Exception e)
        //    {
        //        return null;
        //    }

        //}

        List<PeopleCategoriesModel> IPeopleService.GetPeopleCategories( )
        {
            try
            {
                ///retrive list of People (Entities).
                var listPeopleCategories = dbcontext.PeopleCategories.ToList();

                ///cast entities to models 
                var PeopleModelList = mapper.Map<List<PeopleCategoriesModel>>(listPeopleCategories);

                ///return models 
                return PeopleModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<PeopleModel> GetPeoplesByCustomer()
        {
            try
            {
                ///retrive list of People (Entities).
                var listPeople = dbcontext.Peoples.Where(X => X.IsDelete != true && X.PeopleType.NameAR == "عميل").Include(X => X.PeopleCategory)
                    .Include(X => X.PeopleType).ToList();
                ///cast entities to models 
                var PeopleModelList = mapper.Map<List<PeopleModel>>(listPeople);

                ///return models 
                return PeopleModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<PeopleModel> GetPeoplesBySupplier()
        {
            try
            {
                ///retrive list of People (Entities).
                var listPeople = dbcontext.Peoples.Where(X => X.IsDelete != true && X.PeopleType.NameAR == "مورد").Include(X => X.PeopleCategory)
                    .Include(X => X.PeopleType).ToList();
                ///cast entities to models 
                var PeopleModelList = mapper.Map<List<PeopleModel>>(listPeople);

                ///return models 
                return PeopleModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public PeopleModel GetLastPeople()
        {
            var result = dbcontext.Peoples.OrderByDescending(p => p.Id).FirstOrDefault();
            var PeopleResult = mapper.Map<PeopleModel>(result);

            return PeopleResult;
        }

        public List<PeopleModel> GetPeoplesByNameOrPhone(string key)
        {
          var listPeople =   dbcontext.Peoples.Where(X =>( X.IsDelete == false ) && (X.Phone.ToLower().Contains(key.ToLower()) || X.Name.ToLower().Contains(key))).Include(X => X.PeopleCategory)
                    .Include(X => X.PeopleType).Take(10).ToList();

            ///cast entities to models 
            var PeopleModelList = mapper.Map<List<PeopleModel>>(listPeople);

            ///return models 
            return PeopleModelList;
        }


                
                
        
    }
}



