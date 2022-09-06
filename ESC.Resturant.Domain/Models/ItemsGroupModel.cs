using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Models
{
   public class ItemsGroupModel<T>
    {
        public double Qty  { get; set; }
        public double Total  { get; set; }
        public object ItemsGroub { get; set; }


    }
}
