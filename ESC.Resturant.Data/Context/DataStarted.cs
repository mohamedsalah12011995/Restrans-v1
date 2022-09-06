using AutoMapper;
using ESA.Data;
using ESC.Resturant.Data.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ESC.Resturant.Data.Context
{
    public class DataStasted
    {
        public ESC_Resturant_DBContext dbcontext { set; get; }
        public IMapper mapper { set; get; }

        public DataStasted(IMapper _mapper, ESC_Resturant_DBContext escContext)
        {

            mapper = _mapper;
            dbcontext = escContext;
        }

        public void Add_BillType()
        {
            List<BillType> billType = new List<BillType>();
            var x = dbcontext.BillTypes.FirstOrDefault();
            if (x == null)
            {
                billType = new List<BillType> {
                new BillType{NameAr = "",NameEn = "" },
                new BillType{NameAr = "",NameEn = "" },
                new BillType{NameAr = "",NameEn = "" },
                new BillType{NameAr = "",NameEn = "" }};
                dbcontext.BillTypes.AddRange(billType);
                dbcontext.SaveChanges();

            }
        }

        public void Add_BillPlace()
        {
           List< BillPlace> billPlace = new List<BillPlace>();
            var x = dbcontext.BillTypes.ToList();
            if (x == null)
            {
                billPlace = new List<BillPlace> {
                new BillPlace{NameAr = "",NameEn = "" },
                new BillPlace{NameAr = "",NameEn = "" },
                new BillPlace{NameAr = "",NameEn = "" },
                new BillPlace{NameAr = "",NameEn = "" }};

                dbcontext.BillPlaces.AddRange(billPlace);
                dbcontext.SaveChanges();
            }

        }

        public void Add_PaymentType()
        {
            List<PaymentType> payment= new List<PaymentType>();
            var x = dbcontext.PaymentTypes.ToList();
            if (x == null)
            {
                payment = new List<PaymentType> {
                new PaymentType{NameAr = "",NameEn = "" },
                new PaymentType{NameAr = "",NameEn = "" },
                new PaymentType{NameAr = "",NameEn = "" },
                new PaymentType{NameAr = "",NameEn = "" }};

                dbcontext.PaymentTypes.AddRange(payment);
                dbcontext.SaveChanges();
            }

        }


        public void Add_DiscountType()
        {
            List<DiscountType> discount = new List<DiscountType>();
            var x = dbcontext.DiscountTypes.ToList();
            if (x == null)
            {
                discount = new List<DiscountType> {
                new DiscountType{NameAr = "",NameEn = "" },
                new DiscountType{NameAr = "",NameEn = "" },
                new DiscountType{NameAr = "",NameEn = "" },
                new DiscountType{NameAr = "",NameEn = "" }};

                dbcontext.DiscountTypes.AddRange(discount);
                dbcontext.SaveChanges();
            }

        }

        public void Add_Printer()
        {
            List<Printer> printer = new List<Printer>();
            var x = dbcontext.Printers.ToList();
            if (x == null)
            {
                printer = new List<Printer> {
                new Printer{DisplayNameAR = "لاتوجد",DisplayNameEN = "not found",CountCopies=0,PrinterName="لاتوجد" }};
                dbcontext.Printers.AddRange(printer);
                dbcontext.SaveChanges();
            }
        }





        public void Add_Rols()
        {
            List<IdentityRole> role = new List<IdentityRole>();
            var x = dbcontext.Roles.ToList();
            if (x == null)
            {
                new IdentityRole { Id = "087cbd44-966e-46b0-818f-36f4afcff6db", Name = "DeleteItem", NormalizedName = "DeleteItem", ConcurrencyStamp = "85fbade6-3980-4ad9-ac46-6866628e858a" };
                new IdentityRole { Id = "0ae62c4a-951e-4a68-8d31-862b59b8718c", Name = "ChangePassword", NormalizedName = "CHANGEPASSWORD", ConcurrencyStamp = "260d9ef2-b071-43a9-b015-a9b3cf228a3d" };
                new IdentityRole { Id = "1929ca61-853a-4880-ba59-ca9d71f29a89", Name = "Tables", NormalizedName = "TABLES", ConcurrencyStamp = "61c111f8-8157-4d0d-ad6b-d07d32f7b091" };
                new IdentityRole { Id = "1e50969c-507d-49c5-ac4c-a005e8e749fd", Name = "SettingsManagment", NormalizedName = "SETTINGSMANAGMENT", ConcurrencyStamp = "5594ad9c-b93a-476d-950c-14c29adcbac1" };
                new IdentityRole { Id = "2130b85f-8d5b-4c6f-a616-ec5300f94829", Name = "TaxesManagment", NormalizedName = "TAXESMANAGMENT", ConcurrencyStamp = "f4448523-4193-427c-b78d-a1808903d9c9" };
                new IdentityRole { Id = "21f01964-1374-4c38-aec9-e44aa2b6919f", Name = "ApplicationsManagment", NormalizedName = "APPLICATIONSMANAGMENT", ConcurrencyStamp = "3a2f0520-52ee-49c5-961a-43f08b70a381" };
                new IdentityRole { Id = "30ce2b71-72fb-44c1-9900-18c1a3769a56", Name = "Items", NormalizedName = "ITEMS", ConcurrencyStamp = "3232a64d-670b-4340-acc8-a86fa1c41eec" };
                new IdentityRole { Id = "33f51d64-b75f-42b8-b2c4-4d780a86176a", Name = "userManagment", NormalizedName = "USERMANAGMENT", ConcurrencyStamp = "f186434b-779a-4022-86db-3ee4306e3780" };
                new IdentityRole { Id = "3c81c793-06c4-4cfb-abdd-847cb94729ee", Name = "AddItem", NormalizedName = "ADDITEM", ConcurrencyStamp = "608b055d-6417-495a-a414-f87d82049d4d" };
                new IdentityRole { Id = "41afa06d-9157-40eb-add5-70f377ce4d2a", Name = "AddBillInvoice", NormalizedName = "ADDBILLINVOICE", ConcurrencyStamp = "4f1ee9f8-2f10-4cef-857a-5544ebc8fa5e" };
                new IdentityRole { Id = "4c310fef-48bc-425e-a024-23fd980a67b7", Name = "WaitBillInvoice", NormalizedName = "WAITBILLINVOICE", ConcurrencyStamp = "7b3822c6-9d82-44fb-babe-0d844adea98f" };
                new IdentityRole { Id = "52818e57-15b9-472e-a884-a4ee56d85760", Name = "AddBranch", NormalizedName = "ADDBRANCH", ConcurrencyStamp = "a979da10-652c-4f3d-a683-a5a31ee06334" };
                new IdentityRole { Id = "6660b611-b6e3-485b-a402-255736d670cf", Name = "EditTable", NormalizedName = "EDITTABLE", ConcurrencyStamp = "8dbca457-cc5a-47f9-b453-5de8de60a241" };
                new IdentityRole { Id = "6fcd58df-7b6f-4793-ba95-c8dae6c37703", Name = "CompanyInfo", NormalizedName = "COMPANYINFO", ConcurrencyStamp = "4e7a8ad3-0b87-43fe-985c-6f62689863d9" };
                new IdentityRole { Id = "76b40a3f-d65a-4f23-b301-12953603ea37", Name = "DailyReport", NormalizedName = "DAILYREPORT", ConcurrencyStamp = "87d0438d-0ec4-4abf-abd0-588cdb2b7281" };
                new IdentityRole { Id = "7eab3ad2-8573-4466-8c09-484d2f2a43db", Name = "peopleManagment", NormalizedName = "PEOPLEMANAGMENT", ConcurrencyStamp = "b095c89e-a448-42a6-8c53-ea72f82c239c" };
                new IdentityRole { Id = "9561b217-49f7-4462-8b86-cffad6a2ce0c", Name = "EditBuyItem", NormalizedName = "EDITBUYITEM", ConcurrencyStamp = "56eaaa0c-97d2-4c5a-9291-d995f91bd3b4" };
                new IdentityRole { Id = "959aa582-4b82-4d1b-b24f-5e1c3fbc0fc9", Name = "AddBuyItem", NormalizedName = "ADDBUYITEM", ConcurrencyStamp = "74b49102-9506-4fc0-9394-5ff703f52f81" };
                new IdentityRole { Id = "9c27d82e-f67f-4e9d-8a15-c29716edfb1a", Name = "TablesManagement", NormalizedName = "TABLESMANAGEMENT", ConcurrencyStamp = "c27d6c85-fbf0-4441-80cc-0fabb9925ad9" };
                new IdentityRole { Id = "9e9b0ac7-b863-4c6b-a16f-96a3fa366b86", Name = "BillPurchases", NormalizedName = "BILLPURCHASES", ConcurrencyStamp = "b7a19693-15d4-406a-bf5f-c2661d04dff3" };
                new IdentityRole { Id = "a176d87b-f4e6-4a5b-92e2-ec9f93994e01", Name = "AddTable", NormalizedName = "ADDTABLE", ConcurrencyStamp = "299b89d4-9cd2-4625-a352-e53e2d08b965" };
                new IdentityRole { Id = "a7050f29-4766-4732-80f1-1640cbc8b9be", Name = "UserTypes", NormalizedName = "USERTYPES", ConcurrencyStamp = "928cbc70-1853-4344-93f4-803de081fdf7" };
                new IdentityRole { Id = "a8c4e8cc-f614-4171-82bf-acba70ff1919", Name = "KitchenScreen", NormalizedName = "KITCHENSCREEN", ConcurrencyStamp = "f572f18a-8c42-4a51-b37b-384be28917c0" };
                new IdentityRole { Id = "ab1373c7-f523-49b7-a453-5b56d0d5fbf1", Name = "ReportTaxs", NormalizedName = "REPORTTAXS", ConcurrencyStamp = "81984175-80a4-4d2b-a0ac-e6156bcbebd0" };
                new IdentityRole { Id = "b10e91d6-5c16-4d99-b1bd-a77a5fdf871f", Name = "CurrenciesManagment", NormalizedName = "CURRENCIESMANAGMENT", ConcurrencyStamp = "1c626672-7074-49a6-8466-9434487543c3" };
                new IdentityRole { Id = "b4120fdb-df22-4d91-91a0-ca5d3618f6c0", Name = "InvoicesReport", NormalizedName = "INVOICESREPORT", ConcurrencyStamp = "4a330213-d149-48ce-adcd-69dfaa12e160" };
                new IdentityRole { Id = "b76c8571-8edc-4563-b798-5cc62dec336c", Name = "CustomerAccount", NormalizedName = "CUSTOMERACCOUNT", ConcurrencyStamp = "c3aa7d37-8c51-4e8c-9ed6-6b5149353999" };
                new IdentityRole { Id = "b7ed0d8c-27e0-46e4-abae-c4f5da17742d", Name = "EditItem", NormalizedName = "EDITITEM", ConcurrencyStamp = "d74a1cfd-5a0d-443d-9736-1d92a2dc6990" };
                new IdentityRole { Id = "bccde246-4b4d-4303-9e59-326fe25c037e", Name = "DeleteTable", NormalizedName = "DELETETABLE", ConcurrencyStamp = "d3321bf0-69e3-47b8-bebc-7689a9e0017b" };
                new IdentityRole { Id = "be97d063-1b76-4ea5-851e-f7c99fbf6652", Name = "Store", NormalizedName = "STORE", ConcurrencyStamp = "eb4fca83-d51e-4f35-8a3d-3bfca3e3a9b6" };
                new IdentityRole { Id = "c3dc6907-1dfe-4527-9bb8-f9090e7e5d79", Name = "Menu", NormalizedName = "MENU", ConcurrencyStamp = "c8f0efb4-50ca-464d-93d9-14b2efce3b8f" };
                new IdentityRole { Id = "c6a16436-27aa-4103-9993-b7eca760692b", Name = "BuyItems", NormalizedName = "BUYITEMS", ConcurrencyStamp = "1e8012a3-a0f3-43ae-ab7d-b1b5f993fdfb" };
                new IdentityRole { Id = "cf0215f4-81d7-4ff4-b0bc-542dcdc0cb59", Name = "ManagmentTables", NormalizedName = "MANAGMENTTABLES", ConcurrencyStamp = "c826149e-4c0b-42b2-937f-d9f5682c6e71" };
                new IdentityRole { Id = "d6938f6d-be04-4f2d-a4a9-430e6fa9f948", Name = "OpenTable", NormalizedName = "OPENTABLE", ConcurrencyStamp = "18877166-0104-4fd6-a986-826ec0fb70f4" };
                new IdentityRole { Id = "e2e6b759-3749-4463-b49f-9f760c53a683", Name = "DeleteBuyItem", NormalizedName = "DELETEBUYITEM", ConcurrencyStamp = "feb857d8-cc3a-421c-9c94-8f573db46272" };
                new IdentityRole { Id = "e87c4b9e-b59e-4ca6-aae8-c1afbc98e8a2", Name = "ApplicationReport", NormalizedName = "APPLICATIONREPORT", ConcurrencyStamp = "f46e4b7c-66ab-49d7-8197-e2afa7e28976" };
                new IdentityRole { Id = "f2830170-a5e7-4f16-9dc3-51310dd79377", Name = "ItemsReport", NormalizedName = "ITEMSREPORT", ConcurrencyStamp = "dbfbf6aa-b7eb-41db-a723-12ecbb117232" };
                new IdentityRole { Id = "fc252468-d5da-42f0-9a9f-d24b66f353d4", Name = "BoxMonyReport", NormalizedName = "BOXMONYREPORT", ConcurrencyStamp = "dce14859-1089-4be0-bd90-860ee84e1960" };
                new IdentityRole { Id = "fe6165bd-a1de-4dad-9df7-7bd769afdc75", Name = "DashBoard", NormalizedName = "DASHBOARD", ConcurrencyStamp = "9eb707a9-0590-4aa1-ad97-dd05763526e5" };
            }

            dbcontext.Roles.AddRange(role);
            dbcontext.SaveChanges();
        }


        public void Add_UserType()
        {
            List<UserType> userType = new List<UserType>();
            var x = dbcontext.UserTypes.ToList();
            if (x == null)
            {
                var _roles = dbcontext.Roles.ToList();
                var _splitRols = string.Join(", ", _roles);
                userType = new List<UserType> {
                new UserType{NameAR = "مدير",NameEN="admin",IsDelete=false,DefaultRoles=_splitRols}};
                dbcontext.UserTypes.AddRange(userType);
                dbcontext.SaveChanges();
            }
        }

        public void Add_User()
        {
            List<ApplicationUser> user = new List<ApplicationUser>();
            var x = dbcontext.Users.ToList();
            if (x == null)
            {
                new ApplicationUser
                {
                    Id = "",
                    UserName = "ms",
                    NormalizedUserName = "MS",
                    Email = "mohamed.salah@easacc.com",
                    NormalizedEmail = "MOHAMED.SALAH@EASACC.COM",
                    EmailConfirmed = true,
                    PasswordHash = "AQAAAAEAACcQAAAAEG4QsDCKwoviPirrzV13BWU6k6v2uokZzx1iz1kSzegbEzq1ArOQYblTqZq5pczleA==",
                    SecurityStamp = "U5M2LXT45NFVNPKDA35Q4ZNX6THB5NDH",
                    ConcurrencyStamp = "7850923f-a0e7-40bf-b123-e4273434e3da",
                    PhoneNumber = "",
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnd = DateTime.Now,
                    LockoutEnabled = false,
                    AccessFailedCount = 0,
                    UserTypeId = 1,
                    FirstName = "mohamed",
                    LastName = "salah",
                    IsDelete = false,
                    BranchId = 0,
                    PrinterId = 1,
                    BoxMonyTypeId = 1

                };

                new ApplicationUser
                {
                    Id = "1c0aec95-7802-4dba-a342-4603e67d3135",
                    UserName = "Easacc",
                    NormalizedUserName = "ADMIN",
                    Email = "Easacc@info.com",
                    NormalizedEmail = "EASACC@INFO.COM",
                    EmailConfirmed = true,
                    PasswordHash = "AQAAAAEAACcQAAAAEGHOU81mnnNFH7l1dVufHJJwE0Q6FsWJ3Qk6YzokAI5LhoZclN2cL7xRMXXskqffBQ==",
                    SecurityStamp = "SNKBBPB5SYAJEBLW54B53XWLNWMWKUGP",
                    ConcurrencyStamp = "a638ed06-b944-4ef4-a9e0-7873d2c0f5ee",
                    PhoneNumber = "",
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnd = DateTime.Now,
                    LockoutEnabled = false,
                    AccessFailedCount = 0,
                    UserTypeId = 1,
                    FirstName = "Easacc",
                    LastName = "Software",
                    IsDelete = false,
                    BranchId = 0,
                    PrinterId = 1,
                    BoxMonyTypeId = 1

                };

                new ApplicationUser
                {
                    Id = "",
                    UserName = "Easacc1",
                    NormalizedUserName = "EASACC1",
                    Email = "Easacc_software@info.com",
                    NormalizedEmail = "EASACC_SOFTWARE@INFO.COM",
                    EmailConfirmed = false,
                    PasswordHash = "AQAAAAEAACcQAAAAEMuv+wlkOENsbZqcMzauhhWFcreLj78XLd3n3ieJM3k2lGmiyyh9vlTAOL9z5uYaTA==",
                    SecurityStamp = "6D225PRMFDQOR542JPAHNYITUDQGYQGL",
                    ConcurrencyStamp = "6cde3440-cb4a-4a5a-822b-a81ec1f04032",
                    PhoneNumber = "",
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnd = DateTime.Now,
                    LockoutEnabled = false,
                    AccessFailedCount = 0,
                    UserTypeId = 1,
                    FirstName = "Easacc",
                    LastName = "Software",
                    IsDelete = false,
                    BranchId = 0,
                    PrinterId = 1,
                    BoxMonyTypeId = 1

                };

                new ApplicationUser
                {
                    Id = "",
                    UserName = "Easacc2",
                    NormalizedUserName = "EASACC2",
                    Email = "Easacc_software2@info.com",
                    NormalizedEmail = "EASACC_SOFTWARE@INFO.COM",
                    EmailConfirmed = false,
                    PasswordHash = "AQAAAAEAACcQAAAAEOjBk74At2rFXcuukFbedUnvuPwNwAOyWbHN07K0EPIQrUFseMVLmBlWgPjwnpcMgw==",
                    SecurityStamp = "UOTQ5RGCNSUUOKNWDE7E4FEBEKK4LRWI",
                    ConcurrencyStamp = "cdb1927c-2770-481b-ab37-d90fa02f17bc",
                    PhoneNumber = "",
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnd = DateTime.Now,
                    LockoutEnabled = false,
                    AccessFailedCount = 0,
                    UserTypeId = 1,
                    FirstName = "Easacc2",
                    LastName = "Software",
                    IsDelete = false,
                    BranchId = 0,
                    PrinterId = 1,
                    BoxMonyTypeId = 1

                };



                dbcontext.Users.AddRange(user);
                dbcontext.SaveChanges();
            }
        }
    }
}

