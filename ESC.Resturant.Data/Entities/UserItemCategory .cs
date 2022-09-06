using ESA.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class UserItemCategory
    {
        [Key]
        public int Id { get; set; }
        public string  UserId { get; set; }
        public string  ItemCategories { get; set; }

        public virtual ApplicationUser ApplicationUser { set; get; }

    }
}
