using ESA.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Entities
{
    public class BoxMonies
    {
        [key]
        public int Id { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public double CurrentBalance { get; set; }
        public string Note { get; set; }
        public DateTime? CurrentDate { get; set; }
        public DateTime? Date { get; set; }
        public Nullable<int> BoxMonyCategoryId { get; set; }
        public Nullable<int> BoxMonyTypeId { get; set; }
        public Nullable<int> PeopleId { get; set; }
        public Nullable<int> CurrencyId { get; set; }
        public string UserId { get; set; }

        public virtual BoxMonyCategories BoxMonyCategories { get; set; }
        public virtual BoxMonyType BoxMonyTypes { get; set; }
        public virtual People Peoples { get; set; }
        public virtual Currencies Currencies { get; set; }
        public virtual ApplicationUser User { get; set; }

    }
}
