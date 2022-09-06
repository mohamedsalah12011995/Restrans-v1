using AutoMapper;
using ESC.Resturant.Data.Context;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Concrete
{
    /// <summary>
    /// BaseService All shared proprties for all services here 
    /// </summary>
    public class BaseService
    {
        public ESC_Resturant_DBContext dbcontext { set; get; }
        public IMapper mapper { set; get; }


        //public BaseService(IMapper _mapper, ESC_Resturant_DBContext escContext)
        //{
        //    mapper = _mapper;
        //    dbcontext = escContext;
        //}
    }
}

