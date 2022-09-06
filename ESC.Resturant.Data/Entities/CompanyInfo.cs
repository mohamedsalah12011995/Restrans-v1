using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class CompanyInfo
    {
        [Key]
        public int Id { get; set; }
        public string NameAR { get; set; }
        public string NameEN { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
        public string Logo { get; set; }
        public virtual ICollection<Branch> Branch { get; set; }

    }
}
