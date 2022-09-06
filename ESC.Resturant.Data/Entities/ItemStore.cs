using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class ItemStore
    {
        [Key]
        public int Id { get; set; }
        public int ItemSizeId { set; get; }
        public virtual ItemSize ItemSize { set; get; }

        public int StoreItemId { set; get; }
        public virtual Item StoreItem { set; get; }

        public int Quantity { set; get; }





        //public Discount Discount { get; set; }
    }

}

