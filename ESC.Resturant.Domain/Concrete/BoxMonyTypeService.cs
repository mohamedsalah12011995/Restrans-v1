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
    class BoxMonyTypeServiceService : BaseService, IBoxMonyTypeService
    {
        public BoxMonyTypeServiceService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public bool CheckIsBoxMonyTypeExist(int id)
        {
            throw new NotImplementedException();
        }

        public bool DeleteBoxMonyType(int id)
        {
            throw new NotImplementedException();
        }

        public List<BoxMonyTypeModel> GetBoxMonyType()
        {
            try
            {
                ///retrive list of Bill (Entities).
                var listBoxMonyType = dbcontext.BoxMonyTypes.ToList();
                ///cast entities to models 
                var BoxMonyTypeModelList = mapper.Map<List<BoxMonyTypeModel>>(listBoxMonyType);

                ///return models 
                return BoxMonyTypeModelList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public BoxMonyTypeModel GetBoxMonyTypeByid(int id)
        {
            throw new NotImplementedException();
        }

        public BoxMonyTypeModel InsertOrUpdate(BoxMonyTypeModel boxMonyType)
        {
            throw new NotImplementedException();
        }
    }

}
