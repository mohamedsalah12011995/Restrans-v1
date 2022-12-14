using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class BillModel
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; }
        public int? OrderNo { get; set; }
        public string TableNo { get; set; }
        public int? PeopleID { get; set; }
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
        public string Notes { get; set; }
        public string Reference { get; set; }
        public int EmployeeId { get; set; }
        public string UserId { get; set; }
        public int BillTypeId { get; set; }
        public int BillPlaceId { get; set; }
        public int PaymentId { get; set; }
        public int VisaID { get; set; }
        public int? ApplicationId { get; set; }
        public int ApplicationDiscountId { get; set; }
        public int DiscountId { get; set; }
        public int CurrencyId { get; set; }
        public bool CheckWiteInvoies { get; set; }
        public bool IsDelete { get; set; }
        public int IsApproverd { get; set; }
        public int BranchId { get; set; }
        public string CurrentLang { get; set; }






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
        public virtual BranchModel Branch { get; set; }
        public virtual ApplicationUserModel User { get; set; }
        public virtual CompanyInfoModel CompanyInfo { get; set; }

    }
}
