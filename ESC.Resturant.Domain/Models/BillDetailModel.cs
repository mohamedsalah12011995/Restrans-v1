using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class BillDetailsModel
    {
        public int Id { get; set; }
        public int BillId { get; set; }
        public int ItemId { get; set; }
        public double ItemSellPrice { get; set; }
        public double ItemBuyPrice { get; set; }
        public double Qty { get; set; }
        public int UnitId { get; set; }
        public double SmallUnitQty { get; set; }
        public double SupTotal { get; set; }
        public double VATTax { get; set; }
        public double VatTaxValue { get; set; }
        public double TotalAfterVatTax { get; set; }
        public double Discount { get; set; }
        public double DiscountValue { get; set; }
        public double NetTotal { get; set; }

        public DateTime CurrentDate { get; set; }
        public DateTime Date { get; set; }
        public string TableNo { get; set; }
        public string Note { get; set; }
        public double NotePrice { get; set; }
        public int ItemPriceId { get; set; }
        [NotMapped]
        public bool IsNew { get; set; }
        public bool? IsPrint { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsFire { get; set; }
        public bool? IsSeparate { get; set; }
        public bool? IsFinshed { get; set; }


        public  BillModel Bills { get; set; }
        public  ItemModel Item { get; set; }
        public  UnitModel Unit { get; set; }
        public  ItemPricesModel ItemPrice { get; set; }

    }
}
