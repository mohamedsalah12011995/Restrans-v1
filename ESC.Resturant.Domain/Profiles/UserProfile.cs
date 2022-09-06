using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using ESA.Data;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Models;

namespace ESC.Resturant.Domain.Profiles
{

    /// <summary>
    /// Here Create Automapper profile for mapping props from models to entities and vice versa 
    /// </summary>
    public class UserProfile : Profile
    {
        public UserProfile( )
        {

            CreateMap<UserModel, User>();
            CreateMap<User, UserModel>();


            CreateMap<ApplicationUserModel, ApplicationUser>()
            .ForMember(x => x.UserType, opt => opt.Ignore())
            .ForMember(x => x.Branch, opt => opt.Ignore())
            .ForMember(x => x.BoxMonyType, opt => opt.Ignore())
            .ForMember(x => x.Printer, opt => opt.Ignore());
            CreateMap<ApplicationUser, ApplicationUserModel>();
        }


    }
}
