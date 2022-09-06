using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class BillCurrencies
    {
        [Key]
        public int Id { get; set; }
        public Nullable<int> BillId { get; set; }
        public Nullable<int> CurrencyId { get; set; }
        public double BankValue { get; set; }
        public double Total { get; set; }
        public bool IsSelected { get; set; }
        public virtual Bill Bill { get; set; }
        public virtual Currencies Currencies { get; set; }

    }
}
