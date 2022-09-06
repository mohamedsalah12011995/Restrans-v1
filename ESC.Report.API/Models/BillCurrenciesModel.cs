using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class BillCurrenciesModel
    {
        public int Id { get; set; }
        public int BillId { get; set; }
        public int CurrencyId { get; set; }
        public double BankValue { get; set; }
        public double Total { get; set; }
        public bool IsSelected { get; set; }
        public virtual BillModel Bills { get; set; }

        public virtual CurrenciesModel Currencies { get; set; }

    }
}
