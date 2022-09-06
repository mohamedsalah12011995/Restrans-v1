using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class ItemCategory
    {
        [Key]
        public int Id { get; set; }
        public string NameAR { get; set; }
        public string NameEN { get; set; }
        public bool? SellCategory { get; set; }
        public bool? BuyCategory { get; set; }
        public Nullable<int> ParentId { get; set; }
        public Nullable<int> PrinterId { set; get; }
        public string Image { get; set; }
        public Nullable<bool> IsDelete { get; set; }

        public virtual Printer Printer { get; set; }
        public virtual ICollection<Item> Items { get; set; }

        //public ItemCategory ParentCategory { set; get; }
        //public ICollection<ItemCategory> ChildsCategories { get; set; }

    }
}
