using ESC.Resturant.Data.Entities;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class BillReportTotalsModel
    {
        public double TotalBillCount { set; get; }
        public double SumBillNetTotals { set; get; }
        public double SumBillCash { set; get; }
        public double SumBillVisa { set; get; }
        public double SumBillRemaining { set; get; }
        public double SumBillDiscounts { set; get; }
        public double SumBillTotalVatTax { set; get; }
        public double Qabd { set; get; }
        public double Sarf { set; get; }
        public string DateFrom { set; get; }
        public string DateTo { set; get; }
        public  ApplicationUserModel User { get; set; }
        public  string Condetion { get; set; }




    }
}