using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class ItemComponent
    {
        [Key]
        public int Id { get; set; }
        public Nullable<int> ItemPriceId { get; set; }
        public int? ItemComponentId { get; set; }
        public double Quantity { get; set; }

        public virtual Item Item { get; set; }
        public virtual ItemPrices ItemPrice { get; set; }
        //public virtual ItemSize ItemSize { get; set; }
    }
}
