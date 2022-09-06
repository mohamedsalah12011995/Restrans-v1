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
    public class PeopleProfile : Profile
    {
        public PeopleProfile()
        {

            CreateMap<PeopleModel, People>()
                .ForMember(x => x.PeopleCategory, opt => opt.Ignore())
                .ForMember(x => x.PeopleType, opt => opt.Ignore())
                .ForMember(x => x.PeopleAccounts, opt => opt.Ignore());
            CreateMap<People, PeopleModel>();
        }


    }
}
