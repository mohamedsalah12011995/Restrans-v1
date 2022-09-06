using ESA.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class Printer
    {

        [Key]
        public int Id { get; set; }
        public string DisplayNameAR { get; set; }
        public string DisplayNameEN { get; set; }
        public string PrinterName { get; set; }
        public int? CountCopies { get; set; }
        public virtual ICollection<ItemCategory> ItemCategories { set; get; }
        public virtual ICollection<ApplicationUser> ApplicationUsers { get; set; }

    }
}
