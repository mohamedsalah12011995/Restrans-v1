using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class DiscountType
    {
        [key]
        public int Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public virtual ICollection<Bill> Bills { get; set; }
        public virtual ICollection<Application> Applications { get; set; }
        public virtual ICollection<Taxes> Taxes { get; set; }

    }
}
