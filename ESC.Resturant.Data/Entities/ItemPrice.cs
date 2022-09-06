using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class ItemPrices
    {
        [Key]
        public int Id { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<int> SizeId { get; set; }
        public decimal Price { get; set; }
        public bool IsDefullt { get; set; }
        public bool IsDelete { get; set; }
        public virtual Item Items { set; get; }
        public virtual ItemSize ItemSize { set; get; }
        public virtual IEnumerable<ItemComponent> ItemComponents { get; set; }
        public virtual ICollection<BillDetails> BillDetails { get; set; }


    }
}
