using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ESC.Resturant.Domain.Models
{
    public class BoxMonyTypeModel
    {
        [Key]
        public int Id { get; set; }
        public string NameAR { get; set; }
        public string NameEN { get; set; }
        public ICollection<BoxMoneisModel> boxMoneis { get; set; }
    }
}
