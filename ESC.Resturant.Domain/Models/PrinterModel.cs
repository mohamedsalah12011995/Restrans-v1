using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class PrinterModel
    {     
        public int Id { get; set; }
        public string DisplayNameAR { get; set; }
        public string DisplayNameEN { get; set; }
        public string PrinterName { get; set; }
        public int? CountCopies { get; set; }
        //public ICollection<ItemCategoryModel> ItemCategories { get; set; }
        public ICollection<ApplicationUserModel> user { get; set; }

    }
}
