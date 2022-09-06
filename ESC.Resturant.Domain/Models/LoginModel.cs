
//using FluentValidation.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ESC.Resturant.Domain.Models
{  
    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
