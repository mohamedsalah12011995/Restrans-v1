using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Models
{
   public class ItemSizeModel
    {
        public int Id { get; set; }
        public string SizeNameAr { get; set; }
        public string SizeNameEn { get; set; }
        public bool IsDelete { get; set; }
        public int IndexRow { get; set; }
        //public ICollection<ItemPricesModel> ItemPrices { get; set; }

    }
}
