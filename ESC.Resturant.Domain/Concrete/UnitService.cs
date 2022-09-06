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
    public class UnitService : BaseService, IUnitService
    {
        public UnitService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsUnitExist(int id)
        {
            return dbcontext.Units.Any(e => e.Id == id);
        }

        public bool DeleteUnit(int id)
        {
            try
            {
                ///get obj for delete 
                //var Unit = dbcontext.Units.Find(id);

                ///remove obj from db context 
                //dbcontext.Units.Remove(Unit);

                ///save changes on database 
                //dbcontext.SaveChanges();
                //return true;
                var _Unit = dbcontext.Units.Find(id);
                _Unit.IsDelete = true;

                dbcontext.Units.Update(_Unit);
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public UnitModel GetUnitByid(int id)
        {
            try
            {
                ///retrive  Bill  (Entitiy).
                var Unit = dbcontext.Units.Find(id);
                ///cast entitiy to model 
                var UnitModel = mapper.Map<UnitModel>(Unit);

                ///return model
                return UnitModel;
            }
            catch
            {
                return null;
            }
        }

        public List<UnitModel> GetUnits()
        {
            try
            {
                ///retrive list of Application (Entities).
                var listUnit = dbcontext.Units.Where(u=> u.IsDelete==false).ToList();
                ///cast entities to models 
                var UnitModelList = mapper.Map<List<UnitModel>>(listUnit);

                ///return models 
                return UnitModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public UnitModel InsertOrUpdate(UnitModel UnitModel)
        {
            if (UnitModel.Id > 0)  ///Update Unit
            {
                ///Get Application entity from database by id 
                var Unit = dbcontext.Units.Find(UnitModel.Id);
                if (Unit != null)   ///if Exist 
                {

                    try
                    {
                        ///Mapp new values from Applicationmodel to Application 
                        var mappedUnit = mapper.Map<UnitModel, Unit>(UnitModel, Unit);
                        dbcontext.Units.Update(mappedUnit);
                        dbcontext.SaveChanges();

                        //  return true;
                        return UnitModel;
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
                    var mappedUnit = mapper.Map<Unit>(UnitModel);
                    dbcontext.Units.Add(mappedUnit);
                    dbcontext.SaveChanges();
                    // return inserted object ;
                    return UnitModel;
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