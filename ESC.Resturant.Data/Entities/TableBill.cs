using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class TableBill
    {

        [Key]
        public int Id { get; set; }
        public string TableNo { get; set; }
        public string PepoleName { get; set; }
        public Nullable<System.DateTime> CurrentDate { get; set; }
        public Nullable<System.DateTime> Date { get; set; }       
        public Nullable<double> NetTotal { get; set; }    
        public Nullable<bool> CheckWiteInvoies { get; set; }
        public Nullable<bool> IsDelete { get; set; }

    }
}
