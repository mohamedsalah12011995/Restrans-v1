using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class BillDetails
    {

        [Key]
        public int Id { get; set; }
        public Nullable<int> BillId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<double> ItemSellPrice { get; set; }
        public Nullable<double> ItemBuyPrice { get; set; }
        public Nullable<double> Qty { get; set; }
        public Nullable<int> UnitId { get; set; }
        public Nullable<double> SmallUnitQty { get; set; }
        public Nullable<double> SupTotal { get; set; }
        public Nullable<double> VATTax { get; set; }
        public Nullable<double> VatTaxValue { get; set; }
        public Nullable<double> TotalAfterVatTax { get; set; }
        public Nullable<double> Discount { get; set; }
        public Nullable<double> DiscountValue { get; set; }
        public Nullable<double> NetTotal { get; set; }
        public Nullable<System.DateTime> CurrentDate { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string TableNo { get; set; }
        public string Note { get; set; }
        public Nullable<double> NotePrice { get; set; }
        public Nullable<int> ItemPriceId { get; set; }
        public Nullable<bool> IsNew { get; set; }
        public Nullable<bool> IsFinshed { get; set; }
        public Nullable<bool> IsDelete { get; set; }


        public virtual Unit Unit { get; set; }
        public virtual Bill Bill { get; set; }
        public virtual Item Item { get; set; }
        public virtual ItemPrices ItemPrice { get; set; }

    }
}
