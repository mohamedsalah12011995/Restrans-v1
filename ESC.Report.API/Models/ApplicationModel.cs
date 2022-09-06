using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class ApplicationModel
    {
        public int Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public double? Price { get; set; }
        public string Image { get; set; }
        public int DiscountId { get; set; }

        public bool? IsDelete { get; set; }



    }
}
