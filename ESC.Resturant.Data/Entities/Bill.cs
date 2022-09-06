using ESA.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class Bill
    {

        [Key]
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
        public string UserId { get; set; }
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
        public Nullable<int> BranchId { get; set; }




        public virtual ICollection<BillDetails> BillDetails { get; set; }
        public virtual ICollection<BillTaxes> BillTaxes { get; set; }
        public virtual ICollection<BillCurrencies> BillCurrencies { get; set; }
        public virtual ICollection<BillDeliveries> BillDeliveries { get; set; }

        public virtual BillPlace BillPlace { get; set; }
        public virtual Application Application { get; set; }
        public virtual DiscountType DiscountType { get; set; }
        public virtual Currencies Currencies { get; set; }
        public virtual BillType BillType { get; set; }
        public virtual PaymentType PaymentType { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual ApplicationUser User { get; set; }



    }
}
