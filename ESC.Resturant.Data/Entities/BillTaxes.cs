using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class BillTaxes
    {
        [Key]
        public int Id { get; set; }
        public int? TaxesId { get; set; }
        public int? BillId { get; set; }
        public double PercentValue { get; set; }
        public double Total { get; set; }
        public virtual Bill Bill { get; set; }
        public virtual Taxes Taxes { get; set; }

    }
}
