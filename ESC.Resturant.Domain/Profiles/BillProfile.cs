using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.DTOs;
using ESC.Resturant.Domain.Models;

namespace ESC.Resturant.Domain.Profiles
{

    /// <summary>
    /// Here Create Automapper profile for mapping props from models to entities and vice versa 
    /// </summary>
    public class BillProfile : Profile
    {
        public BillProfile()
        {

            CreateMap<Bill, BillModel>();

                //.ForMember(dest => dest.BillPlaceName, opt =>
                //{
                //    opt.MapFrom(src => src.BillPlace.NameAr);
                //});

            //CreateMap<Bill, BillModel>()
            //    .ForMember(dest => dest.BillTypeName, opt =>
            //    {
            //        opt.MapFrom(src => src.BillType.NameAr);
            //    });

            //CreateMap<Bill, BillModel>()
            //    .ForMember(dest => dest.PaymentName, opt =>
            //    {
            //        opt.MapFrom(src => src.PaymentType.NameAr);
            //    });
            //CreateMap<Bill, BillModel>()
            //    .ForMember(dest => dest.BranchName, opt =>
            //    {
            //        opt.MapFrom(src => src.Branch.NameAr);
            //    });
            //CreateMap<Bill, BillModel>()
            //    .ForMember(dest => dest.ApplicationName, opt =>
            //    {
            //        opt.MapFrom(src => src.Application.NameAr);
            //    });
            //CreateMap<Bill, BillModel>()
            //    .ForMember(dest => dest.BillDetails, opt =>
            //    {
            //        opt.MapFrom(src => src.BillDetails);
            //    });

            //CreateMap<Bill, BillModel>()
            //   .ForMember(dest => dest.BillDeliveries, opt =>
            //   {
            //       opt.MapFrom(src => src.BillDeliveries);
            //   });
            //CreateMap<Bill, BillModel>()
            //   .ForMember(dest => dest.BillCurrencies, opt =>
            //   {
            //       opt.MapFrom(src => src.BillCurrencies);
            //   });
            //CreateMap<Bill, BillModel>().
            //    ForMember(dest => dest.BillTaxes, opt =>
            //    {
            //        opt.MapFrom(src => src.BillTaxes);
            //    });


            //CreateMap<Bill, BillModel>();

            CreateMap<BillModel, Bill>()
                .ForMember(x => x.BillPlace, opt => opt.Ignore())
                .ForMember(x => x.BillType, opt => opt.Ignore())
                .ForMember(x => x.PaymentType, opt => opt.Ignore())
                .ForMember(x => x.Application, opt => opt.Ignore())
                .ForMember(x => x.DiscountType, opt => opt.Ignore())
                .ForMember(x => x.Branch, opt => opt.Ignore())
                .ForMember(x => x.User, opt => opt.Ignore())
                .ForMember(x => x.Currencies, opt => opt.Ignore());
            CreateMap<Bill, BillModel>();


            //CreateMap<Bill, BillReportModel>();
            //.ForMember(x => x.BillTypeName, opt => opt.MapFrom(x => x.BillType.NameAr))

            //.ForMember(x => x.DiscountTypeName, opt => opt.MapFrom(x => x.DiscountType.NameAr));


        }


    }
}
