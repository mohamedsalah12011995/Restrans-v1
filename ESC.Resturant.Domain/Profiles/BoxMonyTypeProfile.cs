using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Models;

namespace ESC.Resturant.Domain.Profiles
{

    /// <summary>
    /// Here Create Automapper profile for mapping props from models to entities and vice versa 
    /// </summary>
    public class BoxMonyTypeProfile : Profile
    {
        public BoxMonyTypeProfile( )
        {

            CreateMap<BoxMonyTypeModel, BoxMonyType>();
            CreateMap<BoxMonyType, BoxMonyTypeModel>();
        }


    }
}
