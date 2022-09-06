using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ESC.Resturant.Domain.Models
{
    public class UserItemCategoryModel
    {
     
        public int Id { get; set; }
        public string UserId { get; set; }
        public string ItemCategories { get; set; }

        //public ApplicationUserModel ApplicationUser { set; get; }
    }
}
