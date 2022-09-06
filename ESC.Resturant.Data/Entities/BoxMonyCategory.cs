using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ESC.Resturant.Data.Entities
{
    public class BoxMonyCategories
    {

        [Key]
        public int Id { get; set; }
        public string NameAR { get; set; }
        public string NameEN { get; set; }
        public bool IsDelete { get; set; }
        public bool IsCredit { get; set; }
        public bool IsDebit { get; set; }
        public virtual ICollection<BoxMonies> BoxMonies { get; set; }
    }
}
