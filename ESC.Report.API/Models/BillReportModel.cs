using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class BillReportModel
    {

        //public int Id { get; set; }
        //public string Code { get; set; }
        //public int? OrderNo { get; set; }
        //public string TableNo { get; set; }
        //public string PepoleName { get; set; }
        //public string BillTypeName { set; get; }
        //public DateTime? CurrentDate { get; set; }
        //public DateTime? Date { get; set; }
        //public double TotalQty { get; set; }
        //public double SupTotal { get; set; }
        //public double TotalVatTax { get; set; }
        //public double TotalAfterVatTax { get; set; }
        //public double TotalNotePrice { get; set; }
        //public double CurrentDiscount { get; set; }
        //public double DescountValue { get; set; }
        //public string DiscountTypeName { set; get; }
        //public double ServiceFees { set; get; }
        //public double ServiceFeesValue { set; get; }
        //public double ApplicationValue { get; set; }
        //public double NetTotal { get; set; }
        //public double Paied { get; set; }
        //public double Remaining { get; set; }
        //public string Notes { get; set; }
        //public string Reference { get; set; }
        //public int EmployeeId { get; set; }
        //public int BranchID { get; set; }
        //public int UserID { get; set; }
        //public int BillTypeId { get; set; }
        //public int BillPlaceId { get; set; }
        //public int PaymentId { get; set; }
        //public int VisaID { get; set; }
        //public int? ApplicationId { get; set; }
        //public int ApplicationDiscountId { get; set; }
        //public int DiscountId { get; set; }
        //public int CurrencyId { get; set; }
        //public bool CheckWiteInvoies { get; set; }
        //public bool IsDelete { get; set; }
        //public int? IsApproverd { get; set; }



        //public virtual ICollection<BillDetails> BillDetails { get; set; }
        //public virtual ICollection<BillTaxes> BillTaxes { get; set; }
        //public virtual ICollection<BillCurrencies> BillCurrencies { get; set; }
        //public virtual ICollection<BillDeliveries> BillDeliveries { get; set; }

        //public virtual BillPlace BillPlace { get; set; }
        //public virtual Application Application { get; set; }
        //public virtual DiscountType DiscountType { get; set; }
        //public virtual Currencies Currencies { get; set; }
        //public virtual BillType BillType { get; set; }
        //public virtual PaymentType PaymentType { get; set; }

        public int Id { get; set; }
        public string Code { get; set; }
        public Nullable<int> OrderNo { get; set; }
        public string TableNo { get; set; }
        public Nullable<int> PeopleID { get; set; }
        public string PepoleName { get; set; }
        public Nullable<System.DateTime> CurrentDate { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<double> TotalQty { get; set; }
        public Nullable<double> SupTotal { get; set; }
        public Nullable<double> TotalVatTax { get; set; }
        public Nullable<double> TotalAfterVatTax { get; set; }
        public Nullable<double> TotalNotePrice { get; set; }
        public Nullable<double> CurrentDiscount { get; set; }
        public Nullable<double> DescountValue { get; set; }
        public Nullable<double> ServiceFees { set; get; }
        public Nullable<double> ServiceFeesValue { set; get; }
        public Nullable<double> ApplicationValue { get; set; }
        public Nullable<double> NetTotal { get; set; }
        public Nullable<double> Paied { get; set; }
        public Nullable<double> Remaining { get; set; }
        public string Notes { get; set; }
        public string Reference { get; set; }
        public Nullable<int> EmployeeId { get; set; }
        public Nullable<int> BranchID { get; set; }
        public Nullable<int> UserID { get; set; }
        public Nullable<int> BillTypeId { get; set; }
        public Nullable<int> BillPlaceId { get; set; }
        public Nullable<int> PaymentId { get; set; }
        public Nullable<int> VisaID { get; set; }
        public Nullable<int> ApplicationId { get; set; }
        public Nullable<int> ApplicationDiscountId { get; set; }
        public Nullable<int> DiscountId { get; set; }
        public Nullable<int> CurrencyId { get; set; }
        public Nullable<bool> CheckWiteInvoies { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public Nullable<int> IsApproverd { get; set; }




        public virtual ICollection<BillDetailsModel> BillDetails { get; set; }
        public virtual ICollection<BillTaxesModel> BillTaxes { get; set; }
        public virtual ICollection<BillCurrenciesModel> BillCurrencies { get; set; }
        public virtual ICollection<BillDeliveriesModel> BillDeliveries { get; set; }

        public virtual BillPlaceModel BillPlace { get; set; }
        public virtual ApplicationModel Application { get; set; }
        public virtual DiscountTypeModel DiscountType { get; set; }
        public virtual CurrenciesModel Currencies { get; set; }
        public virtual BillTypeModel BillType { get; set; }
        public virtual PaymentTypeModel PaymentType { get; set; }

    }
}
