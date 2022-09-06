
using ESC.Resturant.Domain.Helpers;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ESC.Resturant.Domain.Abstract
{
    public interface IAccountsService
    {
        UserTokenModel GetUerToken(LoginModel loginModel);

        Task<ApplicationUserModel> GetUserProfileByEmailAsync(string email);

        Task<ApplicationUserModel> GetUserProfileByUserNameAsync(string username);

        Task<int> CreateUserAsync(ApplicationUserModel usermodel);

        Boolean UpdateUser(ApplicationUserModel usermodel);

        List<ApplicationUserModel> GetAllUsers();

        Task<bool> SendResetPasswordEmailAsync(string useremail);

        Task<bool> SendSetupPasswordEmailAsync(string useremail);

        PagedData<ApplicationUserModel> GetUserListPaginated( int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string UserName = null);

        bool CheckTokenResetTokenValidity(string email, string code);

        bool ChangePassword(ChangePasswordModel changePassword);
        bool DeleteUser(string userName);

        //bool ResetPassword(ResetPasswordModel model);
    }

}
