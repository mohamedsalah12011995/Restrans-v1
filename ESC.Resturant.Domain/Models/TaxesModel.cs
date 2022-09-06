﻿using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class TaxesModel
    {
        public int Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public double PercentValue { get; set; }
        public int DiscountId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public  BillModel Bill { get; set; }
        public  ICollection<BillTaxesModel> BillTaxes { get; set; }
        public  ICollection<DiscountTypeModel> DiscountTypes { get; set; }


    }
}
