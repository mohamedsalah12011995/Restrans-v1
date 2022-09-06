using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public partial class BranchModel
    {
        public int Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public bool? IsDelete { get; set; }
        public int? CompanyInfoId { get; set; }
        public CompanyInfoModel CompanyInfo { get; set; }
        public virtual ICollection<BillModel> Bills { get; set; }
        public virtual ICollection<ApplicationUserModel> ApplicationUsers { get; set; }

    }
}
