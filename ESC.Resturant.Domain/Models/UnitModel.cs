using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class UnitModel
    {
        public int Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public bool? IsForSell { get; set; }
        public bool? IsForBuy { get; set; }
        public bool? IsDelete { get; set; }
        //public virtual ICollection<ItemModel> Item { get; set; }
        //public virtual ICollection<BillDetails> BillDetails { get; set; }
    }
}
