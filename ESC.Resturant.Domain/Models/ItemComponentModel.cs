using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class ItemComponentModel
    {
       
        public int Id { get; set; }
        public Nullable<int> ItemPriceId { get; set; }
        public Nullable<int> ItemComponentId { get; set; }
        public Nullable<double> Quantity { get; set; }

        public  ItemModel Item { get; set; }
        public  ItemPricesModel ItemPrice { get; set; }


    }
}
