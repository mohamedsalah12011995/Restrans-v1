using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class BillTypeModel
    {
        public int Id { get; set; }
        public string NameAR { get; set; }
        public string NameEN { get; set; }
        public ICollection<BoxMonyTypeModel> BoxMonies { get; set; }
        public ICollection< ApplicationUserModel> User { get; set; }
    }
}
