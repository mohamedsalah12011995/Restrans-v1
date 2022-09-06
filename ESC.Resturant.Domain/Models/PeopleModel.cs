using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Models
{
    public class PeopleModel
    {


        public PeopleModel()
        {
            this.PeopleAccounts = new HashSet<PeopleAccountModel>();
        }
        [Key]
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public double Discount { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public double Balance { get; set; }
        public double Point { get; set; }
        public string Notes { get; set; }
        public string NumberCar { get; set; }
        public Nullable<System.DateTime> RememberDate { get; set; }
        public Nullable<bool> IsRemember { get; set; }
        public Nullable<bool> IsNotActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public Nullable<int> PeopleCategoryId { get; set; }
        public Nullable<int> PeopleTypeId { get; set; }

        public  ICollection<PeopleAccountModel> PeopleAccounts { get; set; }
        public  ICollection<BoxMoneisModel> BoxMonies { get; set; }
        public  PeopleCategoriesModel PeopleCategory { get; set; }
        public  PeopleTypesModel PeopleType { get; set; }
    }
}
