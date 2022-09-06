using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class Currencies
    {
        [Key]
        public int Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public double BankValue { get; set; }
        public bool IsDefault { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public int? ModifiedBy { get; set; }

        public virtual ICollection <Bill> Bills { get; set; }
        public virtual ICollection <BillCurrencies> BillCurrencies { get; set; }
        public virtual ICollection <BoxMonies> BoxMonies { get; set; }

    }
}
