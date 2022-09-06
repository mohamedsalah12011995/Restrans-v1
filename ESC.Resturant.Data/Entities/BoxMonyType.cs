using ESA.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class BoxMonyType
    {

        [Key]
        public int Id { get; set; }
        public string NameAR { get; set; }
        public string NameEN { get; set; }
        public virtual ICollection<BoxMonies> BoxMonies { get; set; }
        public virtual ICollection<ApplicationUser> User { get; set; }
    }
}
