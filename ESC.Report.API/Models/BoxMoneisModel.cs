using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class BoxMoneisModel
    {

        [Key]
        public int Id { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public double CurrentBalance { get; set; }
        public string Note { get; set; }
        public DateTime? CurrentDate { get; set; }
        public DateTime? Date { get; set; }
        public int? BoxMonyCategoryId { get; set; }
        public int? BoxMonyTypeId { get; set; }
        public int? PeopleId { get; set; }
        public int? UserId { get; set; }
        public int? CurrencyId { get; set; }
        public virtual BoxMonyCategoriesModel BoxMonyCategories { get; set; }
        public virtual BoxMonyTypeModel BoxMonyTypes { get; set; }
        public virtual PeopleModel Peoples { get; set; }
       // public virtual ApplicationUserModel Users { get; set; }
        public virtual CurrenciesModel Currencies { get; set; }

    }
}
