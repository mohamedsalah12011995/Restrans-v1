
using AutoMapper;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Profiles
{
    public class SettingsProfile : Profile
    {
            public SettingsProfile()
            {
                CreateMap<SettingsModel, Settings>();
                CreateMap<Settings, SettingsModel>();
            }
    }
}
