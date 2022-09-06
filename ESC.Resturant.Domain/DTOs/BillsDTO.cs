using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.DTOs
{
    class BillsDTO
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int? OrderNo { get; set; }
        public string TableNo { get; set; }
        public string PepoleName { get; set; }
        public DateTime? CurrentDate { get; set; }
        public DateTime? Date { get; set; }
        public double TotalQty { get; set; }
        public double SupTotal { get; set; }
        public double TotalVatTax { get; set; }
        public double TotalAfterVatTax { get; set; }
        public double TotalNotePrice { get; set; }
        public double CurrentDiscount { get; set; }
        public double DescountValue { get; set; }
        public double ServiceFees { set; get; }
        public double ServiceFeesValue { set; get; }
        public double ApplicationValue { get; set; }
        public double NetTotal { get; set; }
        public double Paied { get; set; }
        public double Remaining { get; set; }
        public string UserName { get; set; }
        public string BillTypeName { get; set; }
        public string BillPlaceName { get; set; }
        public string PaymentName { get; set; }
        public string ApplicationName { get; set; }
        public string BranchName { get; set; }



        public virtual ICollection<BillDetailsModel> BillDetails { get; set; }
        public virtual ICollection<BillTaxesModel> BillTaxes { get; set; }
        public virtual ICollection<BillCurrenciesModel> BillCurrencies { get; set; }
        public virtual ICollection<BillDeliveriesModel> BillDeliveries { get; set; }
    }
}
