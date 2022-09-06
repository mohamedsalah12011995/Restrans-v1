using ESC.Resturant.Data.Entities;
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
        public int? CurrencyId { get; set; }
        public string UserId { get; set; }

        public  BoxMonyCategoriesModel BoxMonyCategories { get; set; }
        public  BoxMonyTypeModel BoxMonyTypes { get; set; }
        public  PeopleModel Peoples { get; set; }
        public  CurrenciesModel Currencies { get; set; }

        public  ApplicationUserModel User { get; set; }

    }
}
