using ESC.Resturant.Data.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESA.Data
{
    public class ApplicationUser : IdentityUser 
    {
        //public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? UserTypeId { set; get; }
        public bool IsDelete { set; get; }
        public int? BranchId { get; set; }
        public int? PrinterId { get; set; }
        public int? BoxMonyTypeId { get; set; }
        public virtual UserType UserType { set; get; }
        public virtual UserItemCategory userItemCategoryies { get; set; }
        public virtual UserDate UserDate { get; set; }
        public virtual Branch Branch { get; set; }
        //public virtual Bill Bills { get; set; }
        public virtual Printer Printer { get; set; }
        public virtual BoxMonyType BoxMonyType { get; set; }
        public virtual ICollection<Bill> Bills { get; set; }

        public virtual ICollection<BoxMonies> BoxMonies { get; set; }

    }
}
