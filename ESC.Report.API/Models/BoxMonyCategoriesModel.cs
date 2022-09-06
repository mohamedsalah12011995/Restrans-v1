using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ESC.Resturant.Domain.Models
{
    public class BoxMonyCategoriesModel
    {
        [Key]
        public int Id { get; set; }
        public string NameAR { get; set; }
        public string NameEN { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsCredit { get; set; }
        public bool? IsDebit { get; set; }

        public ICollection<BoxMoneisModel> boxMoneis { get; set; }
    }
}
