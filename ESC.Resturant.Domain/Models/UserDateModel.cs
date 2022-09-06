using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ESC.Resturant.Domain.Models
{
   public class UserDateModel
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime? CurrentDate { get; set; }
        public virtual ApplicationUserModel User { get; set; }
    }
}
