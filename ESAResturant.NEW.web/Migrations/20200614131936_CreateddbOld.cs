using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ESAResturant.NEW.web.Migrations
{
    public partial class CreateddbOld : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BillPlaces",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAr = table.Column<string>(nullable: true),
                    NameEn = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillPlaces", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BillTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAr = table.Column<string>(nullable: true),
                    NameEn = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BoxMonyCategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAR = table.Column<string>(nullable: true),
                    NameEN = table.Column<string>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: false),
                    IsCredit = table.Column<bool>(nullable: false),
                    IsDebit = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoxMonyCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BoxMonyTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAR = table.Column<string>(nullable: true),
                    NameEN = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoxMonyTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "companyInfos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAR = table.Column<string>(nullable: true),
                    NameEN = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Note = table.Column<string>(nullable: true),
                    Logo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_companyInfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Currencies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAr = table.Column<string>(nullable: true),
                    NameEn = table.Column<string>(nullable: true),
                    BankValue = table.Column<double>(nullable: false),
                    IsDefault = table.Column<bool>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: true),
                    ModifiedAt = table.Column<DateTime>(nullable: true),
                    ModifiedBy = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currencies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DiscountTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAr = table.Column<string>(nullable: true),
                    NameEn = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscountTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItemSizes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SizeNameAr = table.Column<string>(nullable: true),
                    SizeNameEn = table.Column<string>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: false),
                    IndexRow = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemSizes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAr = table.Column<string>(nullable: true),
                    NameEn = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaymentTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAr = table.Column<string>(nullable: true),
                    NameEn = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PeopleCategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAR = table.Column<string>(nullable: true),
                    NameEN = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeopleCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PeopleTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAR = table.Column<string>(nullable: true),
                    NameEN = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeopleTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Printers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DisplayNameAR = table.Column<string>(nullable: true),
                    DisplayNameEN = table.Column<string>(nullable: true),
                    PrinterName = table.Column<string>(nullable: true),
                    CountCopies = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Printers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    IsDefault = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stocks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAR = table.Column<string>(nullable: true),
                    NameEN = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    IsStatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stocks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TablesPlaces",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAr = table.Column<string>(nullable: true),
                    NameEn = table.Column<string>(nullable: true),
                    Count = table.Column<int>(nullable: true),
                    StartNum = table.Column<int>(nullable: true),
                    EndNum = table.Column<int>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TablesPlaces", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Units",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAr = table.Column<string>(nullable: true),
                    NameEn = table.Column<string>(nullable: true),
                    IsForSell = table.Column<bool>(nullable: true),
                    IsForBuy = table.Column<bool>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Units", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAR = table.Column<string>(nullable: true),
                    NameEN = table.Column<string>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: true),
                    DefaultRoles = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Branches",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAr = table.Column<string>(nullable: true),
                    NameEn = table.Column<string>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: false),
                    CompanyInfoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Branches_companyInfos_CompanyInfoId",
                        column: x => x.CompanyInfoId,
                        principalTable: "companyInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Applications",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAr = table.Column<string>(nullable: true),
                    NameEn = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    DiscountId = table.Column<int>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Applications_DiscountTypes_DiscountId",
                        column: x => x.DiscountId,
                        principalTable: "DiscountTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Taxes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAr = table.Column<string>(nullable: true),
                    NameEn = table.Column<string>(nullable: true),
                    PercentValue = table.Column<double>(nullable: false),
                    DiscountId = table.Column<int>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Taxes_DiscountTypes_DiscountId",
                        column: x => x.DiscountId,
                        principalTable: "DiscountTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Peoples",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Discount = table.Column<double>(nullable: false),
                    Debit = table.Column<double>(nullable: false),
                    Credit = table.Column<double>(nullable: false),
                    Balance = table.Column<double>(nullable: false),
                    Point = table.Column<double>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    NumberCar = table.Column<string>(nullable: true),
                    RememberDate = table.Column<DateTime>(nullable: true),
                    IsRemember = table.Column<bool>(nullable: true),
                    IsNotActive = table.Column<bool>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: true),
                    PeopleCategoryId = table.Column<int>(nullable: true),
                    PeopleTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Peoples", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Peoples_PeopleCategories_PeopleCategoryId",
                        column: x => x.PeopleCategoryId,
                        principalTable: "PeopleCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Peoples_PeopleTypes_PeopleTypeId",
                        column: x => x.PeopleTypeId,
                        principalTable: "PeopleTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ItemCategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameAR = table.Column<string>(nullable: true),
                    NameEN = table.Column<string>(nullable: true),
                    SellCategory = table.Column<bool>(nullable: true),
                    BuyCategory = table.Column<bool>(nullable: true),
                    ParentId = table.Column<int>(nullable: true),
                    PrinterId = table.Column<int>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemCategories_Printers_PrinterId",
                        column: x => x.PrinterId,
                        principalTable: "Printers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    UserTypeId = table.Column<int>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: false),
                    BranchId = table.Column<int>(nullable: true),
                    PrinterId = table.Column<int>(nullable: true),
                    BoxMonyTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_BoxMonyTypes_BoxMonyTypeId",
                        column: x => x.BoxMonyTypeId,
                        principalTable: "BoxMonyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_Printers_PrinterId",
                        column: x => x.PrinterId,
                        principalTable: "Printers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_UserTypes_UserTypeId",
                        column: x => x.UserTypeId,
                        principalTable: "UserTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PeopleAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PeopleId = table.Column<int>(nullable: true),
                    BillId = table.Column<int>(nullable: true),
                    AccountDebit = table.Column<double>(nullable: true),
                    AccountCredit = table.Column<double>(nullable: true),
                    AccCurrentBalance = table.Column<double>(nullable: true),
                    CurrentDate = table.Column<DateTime>(nullable: true),
                    AccoutDate = table.Column<DateTime>(nullable: true),
                    UserID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeopleAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PeopleAccounts_Peoples_PeopleId",
                        column: x => x.PeopleId,
                        principalTable: "Peoples",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(nullable: true),
                    NameAR = table.Column<string>(nullable: true),
                    NameEN = table.Column<string>(nullable: true),
                    Note = table.Column<string>(nullable: true),
                    ImageName = table.Column<string>(nullable: true),
                    ImagePath = table.Column<string>(nullable: true),
                    ItemCategoryId = table.Column<int>(nullable: false),
                    CurrentDicount = table.Column<int>(nullable: false),
                    VAT = table.Column<double>(nullable: true),
                    UnitId = table.Column<int>(nullable: true),
                    SmallUnitQty = table.Column<double>(nullable: false),
                    AveragePrice = table.Column<double>(nullable: false),
                    TotalAveragePrice = table.Column<double>(nullable: false),
                    LastPurchaseDate = table.Column<DateTime>(nullable: true),
                    LastSeleDate = table.Column<DateTime>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: true),
                    LowestSellPrice = table.Column<decimal>(nullable: true),
                    BuyPrice = table.Column<decimal>(nullable: true),
                    LowestQuantity = table.Column<int>(nullable: true),
                    IsForSell = table.Column<bool>(nullable: true),
                    BarCode1 = table.Column<string>(nullable: true),
                    BarCode2 = table.Column<string>(nullable: true),
                    BarCode3 = table.Column<string>(nullable: true),
                    CurrentQuantity = table.Column<double>(nullable: true),
                    FirstQuantity = table.Column<double>(nullable: true),
                    ItemIndex = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_ItemCategories_ItemCategoryId",
                        column: x => x.ItemCategoryId,
                        principalTable: "ItemCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Items_Units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(maxLength: 128, nullable: false),
                    ProviderKey = table.Column<string>(maxLength: 128, nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(maxLength: 128, nullable: false),
                    Name = table.Column<string>(maxLength: 128, nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(nullable: true),
                    OrderNo = table.Column<int>(nullable: true),
                    TableNo = table.Column<string>(nullable: true),
                    PeopleID = table.Column<int>(nullable: true),
                    PepoleName = table.Column<string>(nullable: true),
                    CurrentDate = table.Column<DateTime>(nullable: true),
                    Date = table.Column<DateTime>(nullable: true),
                    TotalQty = table.Column<double>(nullable: true),
                    SupTotal = table.Column<double>(nullable: true),
                    TotalVatTax = table.Column<double>(nullable: true),
                    TotalAfterVatTax = table.Column<double>(nullable: true),
                    TotalNotePrice = table.Column<double>(nullable: true),
                    CurrentDiscount = table.Column<double>(nullable: true),
                    DescountValue = table.Column<double>(nullable: true),
                    ServiceFees = table.Column<double>(nullable: true),
                    ServiceFeesValue = table.Column<double>(nullable: true),
                    ApplicationValue = table.Column<double>(nullable: true),
                    NetTotal = table.Column<double>(nullable: true),
                    Paied = table.Column<double>(nullable: true),
                    Remaining = table.Column<double>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    Reference = table.Column<string>(nullable: true),
                    EmployeeId = table.Column<int>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    BillTypeId = table.Column<int>(nullable: true),
                    BillPlaceId = table.Column<int>(nullable: true),
                    PaymentId = table.Column<int>(nullable: true),
                    VisaID = table.Column<int>(nullable: true),
                    ApplicationId = table.Column<int>(nullable: true),
                    ApplicationDiscountId = table.Column<int>(nullable: true),
                    DiscountId = table.Column<int>(nullable: true),
                    CurrencyId = table.Column<int>(nullable: true),
                    CheckWiteInvoies = table.Column<bool>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: true),
                    IsApproverd = table.Column<int>(nullable: true),
                    BranchId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bills_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Bills_BillPlaces_BillPlaceId",
                        column: x => x.BillPlaceId,
                        principalTable: "BillPlaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Bills_BillTypes_BillTypeId",
                        column: x => x.BillTypeId,
                        principalTable: "BillTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Bills_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Bills_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Bills_DiscountTypes_DiscountId",
                        column: x => x.DiscountId,
                        principalTable: "DiscountTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Bills_PaymentTypes_PaymentId",
                        column: x => x.PaymentId,
                        principalTable: "PaymentTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Bills_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BoxMonies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Debit = table.Column<double>(nullable: false),
                    Credit = table.Column<double>(nullable: false),
                    CurrentBalance = table.Column<double>(nullable: false),
                    Note = table.Column<string>(nullable: true),
                    CurrentDate = table.Column<DateTime>(nullable: true),
                    Date = table.Column<DateTime>(nullable: true),
                    BoxMonyCategoryId = table.Column<int>(nullable: true),
                    BoxMonyTypeId = table.Column<int>(nullable: true),
                    PeopleId = table.Column<int>(nullable: true),
                    CurrencyId = table.Column<int>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoxMonies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BoxMonies_BoxMonyCategories_BoxMonyCategoryId",
                        column: x => x.BoxMonyCategoryId,
                        principalTable: "BoxMonyCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_BoxMonies_BoxMonyTypes_BoxMonyTypeId",
                        column: x => x.BoxMonyTypeId,
                        principalTable: "BoxMonyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_BoxMonies_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_BoxMonies_Peoples_PeopleId",
                        column: x => x.PeopleId,
                        principalTable: "Peoples",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_BoxMonies_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "UserDates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true),
                    CurrentDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserDates_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserItemCategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true),
                    ItemCategories = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserItemCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserItemCategories_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ItemPrices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ItemId = table.Column<int>(nullable: true),
                    SizeId = table.Column<int>(nullable: true),
                    Price = table.Column<decimal>(nullable: false),
                    IsDefullt = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemPrices_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_ItemPrices_ItemSizes_SizeId",
                        column: x => x.SizeId,
                        principalTable: "ItemSizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "BillCurrencies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BillId = table.Column<int>(nullable: true),
                    CurrencyId = table.Column<int>(nullable: true),
                    BankValue = table.Column<double>(nullable: false),
                    Total = table.Column<double>(nullable: false),
                    IsSelected = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillCurrencies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillCurrencies_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_BillCurrencies_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "BillDeliveries",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BillId = table.Column<int>(nullable: true),
                    DeliveryName = table.Column<string>(nullable: true),
                    DeliveryPhone = table.Column<string>(nullable: true),
                    DeliveryAddress = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillDeliveries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillDeliveries_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "BillTaxes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TaxesId = table.Column<int>(nullable: true),
                    BillId = table.Column<int>(nullable: true),
                    PercentValue = table.Column<double>(nullable: false),
                    Total = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillTaxes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillTaxes_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_BillTaxes_Taxes_TaxesId",
                        column: x => x.TaxesId,
                        principalTable: "Taxes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "BillDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BillId = table.Column<int>(nullable: true),
                    ItemId = table.Column<int>(nullable: true),
                    ItemSellPrice = table.Column<double>(nullable: true),
                    ItemBuyPrice = table.Column<double>(nullable: true),
                    Qty = table.Column<double>(nullable: true),
                    UnitId = table.Column<int>(nullable: true),
                    SmallUnitQty = table.Column<double>(nullable: true),
                    SupTotal = table.Column<double>(nullable: true),
                    VATTax = table.Column<double>(nullable: true),
                    VatTaxValue = table.Column<double>(nullable: true),
                    TotalAfterVatTax = table.Column<double>(nullable: true),
                    Discount = table.Column<double>(nullable: true),
                    DiscountValue = table.Column<double>(nullable: true),
                    NetTotal = table.Column<double>(nullable: true),
                    CurrentDate = table.Column<DateTime>(nullable: true),
                    Date = table.Column<DateTime>(nullable: true),
                    TableNo = table.Column<string>(nullable: true),
                    Note = table.Column<string>(nullable: true),
                    NotePrice = table.Column<double>(nullable: true),
                    ItemPriceId = table.Column<int>(nullable: true),
                    IsNew = table.Column<bool>(nullable: true),
                    IsFinshed = table.Column<bool>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillDetails_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_BillDetails_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_BillDetails_ItemPrices_ItemPriceId",
                        column: x => x.ItemPriceId,
                        principalTable: "ItemPrices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_BillDetails_Units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ItemComponents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ItemPriceId = table.Column<int>(nullable: true),
                    ItemComponentId = table.Column<int>(nullable: true),
                    Quantity = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemComponents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemComponents_Items_ItemComponentId",
                        column: x => x.ItemComponentId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_ItemComponents_ItemPrices_ItemPriceId",
                        column: x => x.ItemPriceId,
                        principalTable: "ItemPrices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Applications_DiscountId",
                table: "Applications",
                column: "DiscountId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_BoxMonyTypeId",
                table: "AspNetUsers",
                column: "BoxMonyTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_BranchId",
                table: "AspNetUsers",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_PrinterId",
                table: "AspNetUsers",
                column: "PrinterId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserTypeId",
                table: "AspNetUsers",
                column: "UserTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_BillCurrencies_BillId",
                table: "BillCurrencies",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_BillCurrencies_CurrencyId",
                table: "BillCurrencies",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_BillDeliveries_BillId",
                table: "BillDeliveries",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_BillId",
                table: "BillDetails",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_ItemId",
                table: "BillDetails",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_ItemPriceId",
                table: "BillDetails",
                column: "ItemPriceId");

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_UnitId",
                table: "BillDetails",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_ApplicationId",
                table: "Bills",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_BillPlaceId",
                table: "Bills",
                column: "BillPlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_BillTypeId",
                table: "Bills",
                column: "BillTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_BranchId",
                table: "Bills",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_CurrencyId",
                table: "Bills",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_DiscountId",
                table: "Bills",
                column: "DiscountId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_PaymentId",
                table: "Bills",
                column: "PaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_UserId",
                table: "Bills",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_BillTaxes_BillId",
                table: "BillTaxes",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_BillTaxes_TaxesId",
                table: "BillTaxes",
                column: "TaxesId");

            migrationBuilder.CreateIndex(
                name: "IX_BoxMonies_BoxMonyCategoryId",
                table: "BoxMonies",
                column: "BoxMonyCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_BoxMonies_BoxMonyTypeId",
                table: "BoxMonies",
                column: "BoxMonyTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_BoxMonies_CurrencyId",
                table: "BoxMonies",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_BoxMonies_PeopleId",
                table: "BoxMonies",
                column: "PeopleId");

            migrationBuilder.CreateIndex(
                name: "IX_BoxMonies_UserId",
                table: "BoxMonies",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_CompanyInfoId",
                table: "Branches",
                column: "CompanyInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemCategories_PrinterId",
                table: "ItemCategories",
                column: "PrinterId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemComponents_ItemComponentId",
                table: "ItemComponents",
                column: "ItemComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemComponents_ItemPriceId",
                table: "ItemComponents",
                column: "ItemPriceId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemPrices_ItemId",
                table: "ItemPrices",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemPrices_SizeId",
                table: "ItemPrices",
                column: "SizeId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ItemCategoryId",
                table: "Items",
                column: "ItemCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_UnitId",
                table: "Items",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_PeopleAccounts_PeopleId",
                table: "PeopleAccounts",
                column: "PeopleId");

            migrationBuilder.CreateIndex(
                name: "IX_Peoples_PeopleCategoryId",
                table: "Peoples",
                column: "PeopleCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Peoples_PeopleTypeId",
                table: "Peoples",
                column: "PeopleTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxes_DiscountId",
                table: "Taxes",
                column: "DiscountId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDates_UserId",
                table: "UserDates",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_UserItemCategories_UserId",
                table: "UserItemCategories",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "BillCurrencies");

            migrationBuilder.DropTable(
                name: "BillDeliveries");

            migrationBuilder.DropTable(
                name: "BillDetails");

            migrationBuilder.DropTable(
                name: "BillTaxes");

            migrationBuilder.DropTable(
                name: "BoxMonies");

            migrationBuilder.DropTable(
                name: "ItemComponents");

            migrationBuilder.DropTable(
                name: "Notes");

            migrationBuilder.DropTable(
                name: "PeopleAccounts");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropTable(
                name: "Stocks");

            migrationBuilder.DropTable(
                name: "TablesPlaces");

            migrationBuilder.DropTable(
                name: "UserDates");

            migrationBuilder.DropTable(
                name: "UserItemCategories");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Bills");

            migrationBuilder.DropTable(
                name: "Taxes");

            migrationBuilder.DropTable(
                name: "BoxMonyCategories");

            migrationBuilder.DropTable(
                name: "ItemPrices");

            migrationBuilder.DropTable(
                name: "Peoples");

            migrationBuilder.DropTable(
                name: "Applications");

            migrationBuilder.DropTable(
                name: "BillPlaces");

            migrationBuilder.DropTable(
                name: "BillTypes");

            migrationBuilder.DropTable(
                name: "Currencies");

            migrationBuilder.DropTable(
                name: "PaymentTypes");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "ItemSizes");

            migrationBuilder.DropTable(
                name: "PeopleCategories");

            migrationBuilder.DropTable(
                name: "PeopleTypes");

            migrationBuilder.DropTable(
                name: "DiscountTypes");

            migrationBuilder.DropTable(
                name: "BoxMonyTypes");

            migrationBuilder.DropTable(
                name: "Branches");

            migrationBuilder.DropTable(
                name: "UserTypes");

            migrationBuilder.DropTable(
                name: "ItemCategories");

            migrationBuilder.DropTable(
                name: "Units");

            migrationBuilder.DropTable(
                name: "companyInfos");

            migrationBuilder.DropTable(
                name: "Printers");
        }
    }
}
