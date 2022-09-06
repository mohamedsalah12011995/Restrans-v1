using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class BillTaxesModel
    {
        public int Id { get; set; }
        public int TaxesId { get; set; }
        public int BillId { get; set; }
        public double PercentValue { get; set; }
        public double Total { get; set; }
        public virtual TaxesModel Taxes { get; set; }

    }
}
