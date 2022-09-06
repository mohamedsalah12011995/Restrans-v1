using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class ItemModel
    {
        [Key]
        public int Id { get; set; }

        //public Discount Discount { get; set; }
        public string Code { get; set; }
        public string NameAR { get; set; }
        public string NameEN { get; set; }
        public string Note { get; set; }
        public string ImageName { get; set; }
        public string ImagePath { get; set; }
        public int ItemCategoryId { get; set; }
        public int CurrentDicount { get; set; }
        public double VAT { set; get; }
        public int UnitId { get; set; }
        public double SmallUnitQty { get; set; }
        public double AveragePrice { get; set; }
        public double TotalAveragePrice { get; set; }
        public DateTime? LastPurchaseDate { get; set; }
        public DateTime? LastSeleDate { get; set; }
        public bool IsDelete { get; set; }
        public Nullable<decimal> LowestSellPrice { get; set; }
        public Nullable<decimal> BuyPrice { get; set; }
        public Nullable<int> LowestQuantity { get; set; }
        public Nullable<bool> IsForSell { get; set; }
        public string BarCode1 { get; set; }
        public string BarCode2 { get; set; }
        public string BarCode3 { get; set; }

        public Nullable<double> CurrentQuantity { get; set; }
        public Nullable<double> FirstQuantity { get; set; }



        public virtual ItemCategoryModel ItemCategory { get; set; }
        public virtual UnitModel Unit { get; set; }
        public IEnumerable<ItemPricesModel> ItemPrices { get; set; }
        //public virtual ICollection<BillDetailsModel> BillDetails { get; set; }

    }
}
