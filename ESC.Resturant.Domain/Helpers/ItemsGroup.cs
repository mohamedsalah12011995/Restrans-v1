using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Helpers
{
   public class ItemsGroup<T>
    {
        public String ItemName { get; set; }
        public double Qty { get; set; }
        public double Total { get; set; }
    }
}
