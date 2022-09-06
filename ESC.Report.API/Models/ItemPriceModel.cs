using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class ItemPricesModel
    {

        public int Id { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<int> SizeId { get; set; }
        public decimal Price { get; set; }
        public bool IsDefullt { get; set; }
        public bool IsDelete { get; set; }
        public virtual ItemSizeModel ItemSize { set; get; }
        public virtual ICollection<ItemComponentModel> ItemComponents { get; set; }
        //public virtual ICollection<BillDetailsModel> BillDetails { get; set; }

    }
}
