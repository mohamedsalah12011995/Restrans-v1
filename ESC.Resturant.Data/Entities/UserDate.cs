using ESA.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public partial class UserDate
    {
        [key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime? CurrentDate { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
