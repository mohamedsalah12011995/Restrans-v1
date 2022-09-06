
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Helpers.Auth
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(string userName, string UserId, IList<string> UserRoles);
    }
}
