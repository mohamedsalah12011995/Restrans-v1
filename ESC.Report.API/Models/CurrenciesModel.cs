using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class CurrenciesModel
    {
        public int Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public double BankValue { get; set; }
        public bool IsDefault { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public int? ModifiedBy { get; set; }

        public virtual ICollection <BillCurrenciesModel> BillCurrencies { get; set; }
        public virtual ICollection <BoxMoneisModel> BoxMoneis { get; set; }

    }
}
