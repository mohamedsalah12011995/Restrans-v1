using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models

{
    public class ItemCategoryModel
    {
        [Key]
        public int Id { get; set; }
        public string NameAR { get; set; }
        public string NameEN { get; set; }
        public bool? SellCategory { get; set; }
        public bool? BuyCategory { get; set; }
        public int? ParentId { get; set; }
        public int? PrinterId { set; get; }
        public string Image { get; set; }
        public bool? IsDelete { get; set; }

        public PrinterModel Printer { get; set; }
        //public ICollection<ItemModel> Items { get; set; }
    }
}

