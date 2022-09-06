using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class UserTypeModel
    {
        [Key]
        public int Id { get; set; }
        public string NameAR { get; set; }
        public string NameEN { get; set; }
        public bool? IsDelete { get; set; }
        public String DefaultRoles { set; get; }

        public ICollection<ApplicationUserModel> Users { get; set; }


    }
}
