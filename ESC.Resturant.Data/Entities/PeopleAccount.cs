using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class PeopleAccount
    {  
        [Key]
        public int Id { get; set; }     
        public Nullable<int> PeopleId { get; set; }
        public Nullable<int> BillId { get; set; }
        public Nullable<double> AccountDebit { get; set; }
        public Nullable<double> AccountCredit { get; set; }
        public Nullable<double> AccCurrentBalance { get; set; }
        public Nullable<System.DateTime> CurrentDate { get; set; }
        public Nullable<System.DateTime> AccoutDate { get; set; }
        public Nullable<int> UserID { get; set; }

        public virtual People People { get; set; }
    }
}
