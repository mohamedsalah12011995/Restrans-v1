using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class Taxes
    {
        [Key]
        public int Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public double PercentValue { get; set; }
        public Nullable<int> DiscountId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public virtual ICollection<BillTaxes> BillTaxes { get; set; }
        public virtual DiscountType DiscountType { get; set; }

    }
}
