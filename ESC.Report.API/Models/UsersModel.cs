using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ESC.Resturant.Domain.Models
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string NameAr { get; set; }
        public string NameEN { get; set; }
        public string ImageName { get; set; }
        public string ImagePath { get; set; }
        public string Password { set; get; }
       public ICollection<BoxMoneisModel> boxMoneisModels { get; set; }
    }
}
