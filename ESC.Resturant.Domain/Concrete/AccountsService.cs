using AutoMapper;
using ESA.Data;
using ESC.Resturant.Data.Context;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Helpers;
using ESC.Resturant.Domain.Helpers.Auth;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using System.Web;

namespace ESC.Resturant.Domain.Concrete
{
    public class AccountsService : IAccountsService
    {
        private ESC_Resturant_DBContext _dbcontext { set; get; }
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _RoleManager;

        private readonly IMapper _mapper;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;





        public AccountsService(IMapper mapper, ESC_Resturant_DBContext eSAResturantContext, UserManager<ApplicationUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions, RoleManager<IdentityRole> roleManager)
        {
            _dbcontext = eSAResturantContext;
            _userManager = userManager;
            _mapper = mapper;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _RoleManager = roleManager;
        }

        /// <summary>
        /// Get User Profile 
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public async Task<ApplicationUserModel> GetUserProfileByUserNameAsync(string username)
        {
            ApplicationUserModel appUserModel = new ApplicationUserModel();
            var appUser = _userManager.FindByNameAsync(username).GetAwaiter().GetResult();
            //var appUserModel = _mapper.Map<ApplicationUserModel>(appUser);
            if (appUser != null)
            {
                appUserModel = _mapper.Map<ApplicationUser, ApplicationUserModel>(appUser);
                appUserModel.Roles = (List<string>)await _userManager.GetRolesAsync(appUser);
                appUserModel.ItemCategories = _dbcontext.UserItemCategories.Where(x => x.UserId == appUser.Id).Select(x=>x.ItemCategories).FirstOrDefault();
                return appUserModel;
            }
            else
            {
                return null;
            }

        }






        /// <summary>
        /// Get User Profile 
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public async Task<ApplicationUserModel> GetUserProfileByEmailAsync(string email)
        {
            ApplicationUserModel appUserModel = new ApplicationUserModel();
            var appUser = _userManager.FindByEmailAsync(email).GetAwaiter().GetResult();
            //var appUserModel = _mapper.Map<ApplicationUserModel>(appUser);
            if (appUser != null)
            {
                appUserModel = _mapper.Map<ApplicationUser, ApplicationUserModel>(appUser);
                appUserModel.Roles = (List<string>)await _userManager.GetRolesAsync(appUser);
                appUserModel.ItemCategories = _dbcontext.UserItemCategories.Where(x => x.UserId == appUser.Id).Select(x => x.ItemCategories).FirstOrDefault();

                return appUserModel;
            }
            else
            {
                return null;
            }

        }


        /// <summary>
        /// Log in and create jwt token we some info 
        /// </summary>
        /// <param name="loginModel">Login Cradentials (UserName or  Email , Password )</param>
        /// <returns></returns>
        public UserTokenModel GetUerToken(LoginModel loginModel)
        {
            try
            {
                
                UserTokenModel UserToken = new UserTokenModel();

                var userToVerify = _userManager.FindByNameAsync(loginModel.UserName).GetAwaiter().GetResult();
                if (userToVerify == null)
                {
                    return null;
                }

                if (userToVerify.IsDelete==true)
                {
                    return null;
                }
               
                if (_userManager.CheckPasswordAsync(userToVerify, loginModel.Password).GetAwaiter().GetResult())
                {
                    //var IdentityClaims =   _jwtFactory.GenerateClaimsIdentity(loginModel.UserName, userToVerify.Id)
                    UserToken.Roles = _userManager.GetRolesAsync(userToVerify).GetAwaiter().GetResult();
                    

                    UserToken.ItemCategories = _dbcontext.UserItemCategories.Where(x => x.UserId == userToVerify.Id).Select(x => x.ItemCategories).FirstOrDefault();
                    UserToken.UserType = _dbcontext.UserTypes.Find(userToVerify.UserTypeId);
                    
                    ///Generate Jwt Token For this User And its Roles and Claims 
                    UserToken.AuthToken = _jwtFactory.GenerateEncodedToken(userToVerify.UserName, userToVerify.Id, UserToken.Roles).GetAwaiter().GetResult();

                    ///Add Expiration Period in Seconds 
                    UserToken.ExpiresInSeconds = (int)_jwtOptions.ValidFor.TotalSeconds;

                    ///Add Expiration Date 
                    UserToken.ExpirationDate = DateTime.Now.AddSeconds(UserToken.ExpiresInSeconds);

                    UserToken.UserName = userToVerify.UserName;
                    UserToken.UserId = userToVerify.Id;
                    UserToken.UserType = userToVerify.UserType;
                    UserToken.UserTypeId = userToVerify.UserTypeId;
                    UserToken.BoxMonyTypeId = userToVerify.BoxMonyTypeId;
                    UserToken.BranchId = userToVerify.BranchId;
                    UserToken.PrinterId = userToVerify.PrinterId;
                    UserToken.Branch = _dbcontext.Branches.Include(x=> x.CompanyInfo).SingleOrDefault(x => x.Id == userToVerify.BranchId);
                    UserToken.Printer = _dbcontext.Printers.SingleOrDefault(x => x.Id == userToVerify.PrinterId);

                    var findUser = _dbcontext.UserDates.SingleOrDefault(x=> x.UserId== userToVerify.Id);
                    if (findUser != null)
                    {
                        UserToken.UserDate = _dbcontext.UserDates.SingleOrDefault(x => x.UserId == UserToken.UserId);
                        UserToken.UserDate.CurrentDate = DateTime.Now;
                        UserToken.UserDate.CurrentDate.Value.ToString("yyyy/MM/dd hh:mm:ss tt");
                        _dbcontext.UserDates.Update(UserToken.UserDate);
                        _dbcontext.SaveChanges();

                        UserToken.UserDate = _dbcontext.UserDates.SingleOrDefault(x => x.UserId == UserToken.UserId);

                    }
                    else
                    {
                        var _userDate = new UserDate();
                        _userDate.UserId = userToVerify.Id;
                        _userDate.CurrentDate = DateTime.Now;
                        _dbcontext.UserDates.Add(_userDate);
                        _dbcontext.SaveChanges();
                        UserToken.UserDate = _dbcontext.UserDates.SingleOrDefault(x => x.UserId == UserToken.UserId);

                    }
                    return UserToken;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        /// <summary>
        /// Create New User With Roles 
        /// </summary>
        /// <param name="usermodel"></param>
        /// <returns></returns>
        public async System.Threading.Tasks.Task<int> CreateUserAsync(ApplicationUserModel usermodel)
        {
            try
            {

                

                var identityuser = new ApplicationUser { UserName = usermodel.UserName, Email = usermodel.Email , FirstName = usermodel.FirstName , LastName=usermodel.LastName , UserTypeId=(int)usermodel.UserTypeId,
                                                        BranchId = (int)usermodel.BranchId,PrinterId = (int)usermodel.PrinterId,BoxMonyTypeId = (int)usermodel.BoxMonyTypeId
                };           //identityuser.UserType = null;

                var isuserExist = await _userManager.FindByNameAsync(usermodel.UserName);

                if(isuserExist == null) {  


                var CreateUserresult = _userManager.CreateAsync(identityuser, usermodel.Password).GetAwaiter().GetResult();
                    if (CreateUserresult.Succeeded==false)
                    {
                        return 3;
                    }
                if (CreateUserresult.Succeeded)
                {
                         var user   = await _userManager.FindByNameAsync(usermodel.UserName);
                        _dbcontext.UserItemCategories.Add(new Data.Entities.UserItemCategory() { UserId = user.Id, ItemCategories = usermodel.ItemCategories });
                        _dbcontext.SaveChanges();


                        



                        foreach (string role in usermodel.Roles)
                    {
                        IdentityResult roleResult;
                        //Adding Addmin Role    
                        var roleCheck = _RoleManager.RoleExistsAsync(role).GetAwaiter().GetResult();
                        if (!roleCheck)
                        {
                            //create the roles and seed them to the database    
                            roleResult = _RoleManager.CreateAsync(new IdentityRole(role)).GetAwaiter().GetResult();
                        }
                    }

                    var rolesResult = _userManager.AddToRolesAsync(identityuser, usermodel.Roles).GetAwaiter().GetResult();
                    if (rolesResult.Succeeded)
                    {
                       // ///Send Reset Password Email to New User 
                       //await SendSetupPasswordEmailAsync(usermodel.Email);

                        return 1;
                    }

                    return 1;
                    }
                    else
                    {

                        return 0;
                    }
                }
                else
                {
                    return 2;
                }
            }
            catch(Exception e)
            {
                return 0;
            }
        }



        /// <summary>
        /// Update Exist  User With Roles 
        /// </summary>
        /// <param name="usermodel"></param>
        /// <returns></returns>
        public Boolean UpdateUser(ApplicationUserModel usermodel)
        {
            try
            {
                UserStore<ApplicationUser> store = new UserStore<ApplicationUser>(_dbcontext);

                //////To Do Generate Randome password 
                ////  usermodel.Password = "ESGStuffAdmin@1234";
                //////Generate any rondome password Using Request Code Wrapper  Class 
                //usermodel.Password = RequestCodeWrapper.GenerateKey();

                ///remove All old User Roles 
                ///
                //var identityuser = new ApplicationUser
                //{
                //    UserName = usermodel.UserName,
                //    Email = usermodel.Email,
                //    FirstName = usermodel.FirstName,
                //    LastName = usermodel.LastName,
                //    UserTypeId = (int)usermodel.UserTypeId,
                //    BranchId = (int)usermodel.BranchId,
                //    PrinterId = (int)usermodel.PrinterId,
                //    BoxMonyTypeId = (int)usermodel.BoxMonyTypeId
                //};


                //var CreateUserresult = _userManager.CreateAsync(identityuser, usermodel.Password).GetAwaiter().GetResult();
                if (usermodel.Password.Length < 4 && !usermodel.Password.Any(char.IsLower) && !usermodel.Password.Any(char.IsSymbol))
                {
                    return false;
                }



                ApplicationUser cUser =  store.FindByIdAsync(usermodel.Id).GetAwaiter().GetResult();
                String hashedNewPassword = _userManager.PasswordHasher.HashPassword(cUser,usermodel.Password);
                store.SetPasswordHashAsync(cUser, hashedNewPassword);


                var olduser = _userManager.FindByIdAsync(usermodel.Id).GetAwaiter().GetResult();
                if (olduser == null) { return false; }

                var oldUserRoles = _userManager.GetRolesAsync(olduser).GetAwaiter().GetResult();

                ApplicationUser NewmappedUser = _mapper.Map<ApplicationUserModel, ApplicationUser>(usermodel, olduser);

                ///tried User Manager but sometimes Fail and Deleting User Recorf
                var UpdateUserresult = _userManager.UpdateAsync(NewmappedUser).GetAwaiter().GetResult();

                var RemoveOldRolesResult = _userManager.RemoveFromRolesAsync(olduser, oldUserRoles).GetAwaiter().GetResult();

                if (!RemoveOldRolesResult.Succeeded) { return false; };

                var itemcataloge = _dbcontext.UserItemCategories.Where(x => x.UserId == olduser.Id).FirstOrDefault();
                if (itemcataloge != null)
                {

                    _dbcontext.UserItemCategories.Add(new Data.Entities.UserItemCategory() { UserId = olduser.Id, ItemCategories = usermodel.ItemCategories });
                    _dbcontext.SaveChanges();

                }
                else
                {
                    _dbcontext.UserItemCategories.Add(new Data.Entities.UserItemCategory() { UserId = olduser.Id, ItemCategories = usermodel.ItemCategories });
                    _dbcontext.SaveChanges();


                }



                foreach (string role in usermodel.Roles)
                    {
                        IdentityResult roleResult;
                        //Adding Addmin Role    
                        var roleCheck = _RoleManager.RoleExistsAsync(role).GetAwaiter().GetResult();
                        if (!roleCheck)
                        {
                            //create the roles and seed them to the database    
                            roleResult = _RoleManager.CreateAsync(new IdentityRole(role)).GetAwaiter().GetResult();
                        }
                    }

                    var rolesResult = _userManager.AddToRolesAsync(NewmappedUser, usermodel.Roles).GetAwaiter().GetResult();
                    if (rolesResult.Succeeded)
                    {
                        /////Send Reset Password Email to New User 
                        //SendResetPasswordEmail(usermodel.Email);

                        return true;
                    }

                    return true;
                
            }
            catch(Exception e)
            {
                return false;
            }
        }






        public List<ApplicationUserModel> GetAllUsers( )
        {
            try
            {

                List<ApplicationUserModel> AppuserModels = new List<ApplicationUserModel>();



                var appUsers = _dbcontext.Users.ToList();

                //var appUserModel = _mapper.Map<ApplicationUserModel>(appUser);
                if (appUsers != null)
                {
                    AppuserModels = _mapper.Map<List<ApplicationUser>, List<ApplicationUserModel>>(appUsers);
                    ///////////Find Roles For Each User 
                    foreach (var AppuserModel in AppuserModels)
                    {
                        AppuserModel.Roles = (List<string>)_userManager.GetRolesAsync(appUsers.Find(x => x.Email == AppuserModel.Email)).GetAwaiter().GetResult();
                       // AppuserModel.ItemCategories = _dbcontext.UserItemCategories.Where(x => x.UserId == AppuserModel.Id).Select(x => x.ItemCategories).FirstOrDefault();



                    }


                    return AppuserModels;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }


        }

        public PagedData<ApplicationUserModel> GetUserListPaginated(int? pageIndex, int? pageSize, string searchString, string SortKey = "", string sortOrderBY = "", string UserName = null )
        {
            pageIndex = pageIndex != null ? pageIndex : 0;
            pageSize = pageSize != null ? pageSize : 0;
            SortKey = SortKey != null ? SortKey : "Id";
            sortOrderBY = sortOrderBY != null ? sortOrderBY : "asc";
            //---------------------------------------------------------------
            IQueryable<ApplicationUser> liststore;
            if (UserName != "Easacc" || UserName != "Easacc1" || UserName != "Easacc2")
            {
                liststore = _dbcontext.Users.Where(x => x.IsDelete == false && x.UserName != "Easacc" && x.UserName != "Easacc1" && x.UserName != "Easacc2")
                .OrderBy(SortKey + " " + sortOrderBY).AsQueryable();
            }

            else
            {
                liststore = _dbcontext.Users.Where(x => x.IsDelete == false).OrderBy(SortKey + " " + sortOrderBY).AsQueryable();
            }

            IEnumerable<ApplicationUserModel> DataModel = _mapper.Map<IEnumerable<ApplicationUser>, IEnumerable<ApplicationUserModel>>(liststore);
            /////////////Find Roles For Each User 
            foreach (var AppuserModel in DataModel)
            {
                AppuserModel.Roles = (List<string>)_userManager.GetRolesAsync(liststore.Where(x => x.Email == AppuserModel.Email).FirstOrDefault()).GetAwaiter().GetResult();
                AppuserModel.ItemCategories = _dbcontext.UserItemCategories.Where(x => x.UserId == AppuserModel.Id).Select(x => x.ItemCategories).FirstOrDefault();

            }

            var result = DataModel;
            // result = result.OrderBy(o => o.Id);
            var PageNumber = pageIndex * pageSize;
            DataModel = DataModel.Skip(PageNumber.Value).Take(pageSize.Value);
            PagedData<ApplicationUserModel> resultPagedData = new PagedData<ApplicationUserModel>()
            {
                Items = DataModel,
                TotalCount = result.Count()
            };

            return resultPagedData;
        }


        /// <summary>
        /// For New Users setip Password For th first Time 
        /// </summary>
        /// <param name="useremail"></param>
        /// <returns></returns>
        public async System.Threading.Tasks.Task<bool> SendSetupPasswordEmailAsync(string useremail)
        {
            try
            {
                var user =await _userManager.FindByEmailAsync(useremail);

                string code = _userManager.GeneratePasswordResetTokenAsync(user).GetAwaiter().GetResult();

                ///send Reset  Email 
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }

        //public async System.Threading.Tasks.Task<bool> SendResetPasswordEmailAsync(string useremail)
        //{
        //    try
        //    {
        //        var user = _userManager.FindByEmailAsync(useremail).GetAwaiter().GetResult();

        //        string code = _userManager.GeneratePasswordResetTokenAsync(user).GetAwaiter().GetResult();

        //        ///send Reset  Email 
        //        await    _emailservice.SendResetPasswordLinkAsync(useremail, code,user.UserName);

        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        return false;
        //    }

        //}





        public bool CheckTokenResetTokenValidity(string email, string code)
        {


            if (string.IsNullOrEmpty(code) || string.IsNullOrEmpty(email))
            { return false; }

            var user = _userManager.FindByEmailAsync(email).GetAwaiter().GetResult();

            if (user == null) { return false; }

            var tokenprovider = _userManager.Options.Tokens.PasswordResetTokenProvider;

            var urlDecodedPasswordResetCode = HttpUtility.UrlDecode(code);
            bool decodedresult = _userManager.VerifyUserTokenAsync(user, tokenprovider, "ResetPassword", urlDecodedPasswordResetCode).GetAwaiter().GetResult();

            bool result = _userManager.VerifyUserTokenAsync(user, tokenprovider, "ResetPassword", code).GetAwaiter().GetResult();

            return result || decodedresult;
        }

        public Task<bool> SendResetPasswordEmailAsync(string useremail)
        {
            throw new NotImplementedException();
        }




        public bool ChangePassword(ChangePasswordModel changePassword)
        {


            var user = _userManager.FindByNameAsync(changePassword.UserName).GetAwaiter().GetResult();
            if (user == null)
            {
                return false;
            }
          


            var result = _userManager.ChangePasswordAsync(user, changePassword.CurrentPassword, changePassword.NewPassword).GetAwaiter().GetResult();
            if (result.Succeeded )
            {
                return true;
            }

            return false;

        }

        public bool DeleteUser(ApplicationUserModel applicationUser)
        {
            var user = _userManager.FindByNameAsync(applicationUser.UserName).GetAwaiter().GetResult();
            if (user!=null)
            {
                user.IsDelete = true;
                var UpdateUserresult = _userManager.UpdateAsync(user).GetAwaiter().GetResult();
                _dbcontext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool DeleteUser(string userName)
        {
            var user = _userManager.FindByNameAsync(userName).GetAwaiter().GetResult();
            if (user != null)
            {
                user.IsDelete = true;
                var UpdateUserresult = _userManager.UpdateAsync(user).GetAwaiter().GetResult();
                _dbcontext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }


        public UserDate GetUserDate(int id)
        {
            var _UserDate = _dbcontext.UserDates.SingleOrDefault(x => x.Id == id);
            return _UserDate;
        }

        //public UserDateModel InsertUserDate(User userDate)
        //{
        //    var _UserDate = new UserDateModel();
        //    if (userDate.Id>0)
        //    {
        //       var UserDate = _dbcontext.UserDates.Update(userDate);
        //    }
        //    return _UserDate;
        //}






        //public String GetCurrentUserName( )
        //{
        //    ////Manage Checks For User type 
        //    var User = HttpContext.User;
        //    var currentLoggedCotactEmail = User.Claims.FirstOrDefault(x => x.Type == "id").Value;
        //    return currentLoggedCotactEmail;
        //}




    }
}
