using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Models
{
   public  class ApplicationUserModel
    {
        public string Id { get; set; }

        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        // Extended Properties
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public bool IsActive { get; set; }

        public int? UserTypeId { set; get; }
        // public UserTypeModel UserType { set; get; }

        public bool? IsDelete { set; get; }
        public int BranchId { get; set; }
        public int PrinterId { get; set; }
        public int BoxMonyTypeId { get; set; }

        public DateTime? CurrentDate { get; set; }

        /// <summary>
        /// used For Discriminate if we want add new user Or Update Exist one   
        /// </summary>
        public bool IsNewUser { get; set; } 
        /// <summary>
        /// List Of User Roles 
        /// </summary>
        public List<String> Roles { set; get; }


        public String ItemCategories { set; get; }
        public BranchModel Branch { get; set; }
        public PrinterModel Printer { get; set; }
        public BoxMonyTypeModel BoxMonyType { get; set; }

        public ICollection<BoxMoneisModel> BoxMonies { get; set; }
        public ICollection<BillModel> Bills { get; set; }


    }
}
