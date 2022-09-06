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
    public class ItemPriceProfile : Profile
    {
        public ItemPriceProfile( )
        {

            CreateMap<ItemPricesModel, ItemPrices>()
                .ForMember(x => x.Items, opt => opt.Ignore())
                //.ForMember(x => x.ItemComponents, opt => opt.Ignore())
                .ForMember(x => x.ItemSize, opt => opt.Ignore());
            CreateMap<ItemPrices, ItemPricesModel>();
        }


    }
}
