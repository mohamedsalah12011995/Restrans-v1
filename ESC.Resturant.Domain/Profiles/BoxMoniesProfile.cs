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
    public class BoxMoniesProfile : Profile
    {
        public BoxMoniesProfile()
        {
            CreateMap<BoxMoneisModel, BoxMonies>().ForMember(x => x.BoxMonyCategories, opt => opt.Ignore())
                                                  .ForMember(x => x.BoxMonyTypes, opt => opt.Ignore())
                                                  .ForMember(x => x.Peoples, opt => opt.Ignore())
                                                  .ForMember(x => x.User, opt => opt.Ignore())
                                                  .ForMember(x => x.Currencies, opt => opt.Ignore());
                                                  //.ForMember(x => x.User, opt => opt.Ignore());
            CreateMap<BoxMonies, BoxMoneisModel>();
        }
    }
}
