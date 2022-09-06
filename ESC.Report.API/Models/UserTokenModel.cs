using System;
using System.Collections.Generic;

namespace ESC.Resturant.Domain.Models
{
    public class UserTokenModel
    {
        /// <summary>
        /// User Id 
        /// </summary>
        public string  UserName { get; set; }

        /// <summary>
        /// Represent JWT Token String 
        /// </summary>
        public string AuthToken { set; get; }   


        /// <summary>
        /// Token Expiration in seconds 
        /// </summary>
        public int ExpiresInSeconds { set; get; }
        
        /// <summary>
        /// Token Expiration Date 
        /// </summary>
        public DateTime ExpirationDate { set; get; }

        public int? UserType { set; get; }

        public IList<string> Roles { set; get; }

        public String ItemCategories { set; get; }

        public string UserId { get; set; }
        public int BranchId { get; set; }
        //public virtual BranchModel Branch { get; set; }
    }
}
