using ESC.Resturant.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class TablesPlacesModel
    {
        public int Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public int? Count { get; set; }
        public int? StartNum { get; set; }
        public int? EndNum { get; set; }
        public bool? IsDelete { get; set; }


    }
}
