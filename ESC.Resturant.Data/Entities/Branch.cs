using ESA.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public partial class Branch
    {
        [key]
        public int Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public bool IsDelete { get; set; }
        public int? CompanyInfoId { get; set; }
        public virtual CompanyInfo CompanyInfo { get; set; }
        public virtual ICollection<Bill> Bills { get; set; }
        public virtual ICollection<ApplicationUser> ApplicationUsers { get; set; }

    }
}
