using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class Application
    {
        [Key]
        public int Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public Nullable<int> DiscountId { get; set; }
        public bool IsDelete { get; set; }
        public virtual ICollection <Bill> Bills { get; set; }
        public virtual DiscountType DiscountType { get; set; }

    }
}
