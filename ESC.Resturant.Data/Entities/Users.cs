using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Data.Entities
{
    public class User
    {
        [key]
        public int Id { get; set; }
        public string Password { set; get; }
        public string UserName { get; set; }
        public string NameAr { get; set; }
        public string NameEN { get; set; }
        public string ImageName { get; set; }
        public string ImagePath { get; set; }
        //public ICollection<BoxMonies> BoxMonies { get; set; }
    }
}
