using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Data.Entities
{
    public  class BranchItem
    {
        public int Id { get; set; }
        public Nullable<int> BranchId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<double> CurrentQuantity { get; set; }
        public Nullable<double> FirstQuantity { get; set; }

        public virtual Branch Branch { get; set; }
        public virtual Item Item { get; set; }
    }
}
