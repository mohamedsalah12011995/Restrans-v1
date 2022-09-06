using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class ItemSize
    {
        [key]
        public int Id { get; set; }
        public string SizeNameAr { get; set; }
        public string SizeNameEn { get; set; }
        public bool IsDelete { get; set; }
        public int IndexRow { get; set; }
        public virtual ICollection<ItemPrices> ItemPrices { get; set; }
        //public ICollection<ItemComponent> ItemComponents { get; set; }



    }
}
