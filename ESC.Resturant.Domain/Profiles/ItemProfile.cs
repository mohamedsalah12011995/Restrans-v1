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
    public class ItemProfile : Profile
    {
        public ItemProfile( )
        {
            CreateMap<ItemModel, Item>().ForMember(x => x.Unit, opt => opt.Ignore())
                                        .ForMember(x => x.ItemCategory, opt => opt.Ignore());

            CreateMap<Item, ItemModel>();
        }

    }
}
