using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ESC.Resturant.Domain.Models
{
    public class StockModel
    {
        [Key]
        public int Id { get; set; }
        public string NameAR { get; set; }
        public string NameEN { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool IsStatus { get; set; }
    }
}
