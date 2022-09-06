using ESA.Data;
using ESC.Resturant.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESC.Resturant.Data.Context
{
    public class ESC_Resturant_DBContext : IdentityDbContext<ApplicationUser>
    {

        //public ESC_Resturant_DBContext( ) : base(Options)
        //{

        //}

        public ESC_Resturant_DBContext(DbContextOptions<ESC_Resturant_DBContext> options) : base(options)
        {
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    //base.OnConfiguring(optionsBuilder);
        //    //optionsBuilder.UseLazyLoadingProxies();
        //}

        /// <summary>
        /// On Model Creating For Relathionship  configuration between DbSets 
        /// </summary>
        /// <param name="builder"></param>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ItemCategory>().HasOne(c => c.Printer).WithMany(x => x.ItemCategories).HasForeignKey(c => c.PrinterId).IsRequired(true);            

            builder.Entity<Item>().HasOne(c => c.ItemCategory).WithMany(c => c.Items).HasForeignKey(x => x.ItemCategoryId).IsRequired(true);
            builder.Entity<Item>().HasMany(x=>x.BillDetails).WithOne(c => c.Item).HasForeignKey(x => x.ItemId).IsRequired(true);           
            builder.Entity<Item>().HasMany(x => x.ItemPrices).WithOne(x => x.Items).HasForeignKey(x => x.ItemId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<ItemSize>().HasMany(x => x.ItemPrices).WithOne(x => x.ItemSize).HasForeignKey(x => x.SizeId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<ItemPrices>().HasMany(x => x.ItemComponents).WithOne(x => x.ItemPrice).HasForeignKey(x => x.ItemPriceId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<ItemComponent>().HasOne(x => x.Item).WithMany(x => x.ItemComponents).HasForeignKey(x => x.ItemComponentId).OnDelete(DeleteBehavior.SetNull);

            //builder.Entity<ItemPrices>().HasMany(x => x.ItemComponents).WithOne(x => x.).HasForeignKey(x => x.ItemComponentId).OnDelete(DeleteBehavior.Cascade);

            // Relation Application

            builder.Entity<Currencies>().HasMany(x => x.BillCurrencies).WithOne(x => x.Currencies).HasForeignKey(x => x.CurrencyId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Taxes>().HasMany(x => x.BillTaxes).WithOne(x => x.Taxes).HasForeignKey(x => x.TaxesId).OnDelete(DeleteBehavior.SetNull);

            // Relation Unit
            builder.Entity<Unit>().HasMany(x => x.Item).WithOne(x => x.Unit).HasForeignKey(x => x.UnitId).OnDelete(DeleteBehavior.SetNull);
            //builder.Entity<Unit>().HasMany(x => x.BillDetails).WithOne(x => x.Unit).HasForeignKey(x => x.UnitId).OnDelete(DeleteBehavior.SetNull);

            // Relation People
            builder.Entity<People>().HasOne(x => x.PeopleCategory).WithMany(x => x.Peoples).HasForeignKey(x => x.PeopleCategoryId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<People>().HasOne(x => x.PeopleType).WithMany(x => x.Peoples).HasForeignKey(x => x.PeopleTypeId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<People>().HasMany(x => x.PeopleAccounts).WithOne(x => x.People).HasForeignKey(x => x.PeopleId).OnDelete(DeleteBehavior.SetNull);
            //builder.Entity<People>().HasMany(x => x.PeopleAccounts).WithOne(x => x.People).HasForeignKey(x => x.PeopleId).OnDelete(DeleteBehavior.Cascade);

            // Relation Bill
            builder.Entity<Bill>().HasMany(x => x.BillDetails).WithOne(x => x.Bill).HasForeignKey(x => x.BillId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Bill>().HasMany(x => x.BillTaxes).WithOne(x => x.Bill).HasForeignKey(x => x.BillId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Bill>().HasMany(x => x.BillDeliveries).WithOne(x => x.Bill).HasForeignKey(x => x.BillId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Bill>().HasMany(x => x.BillCurrencies).WithOne(x => x.Bill).HasForeignKey(x => x.BillId).OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Bill>().HasOne(x => x.BillPlace).WithMany(x => x.Bills).HasForeignKey(x => x.BillPlaceId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Bill>().HasOne(x => x.BillType).WithMany(x => x.Bills).HasForeignKey(x => x.BillTypeId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Bill>().HasOne(x => x.PaymentType).WithMany(x => x.Bills).HasForeignKey(x => x.PaymentId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Bill>().HasOne(x => x.Application).WithMany(x => x.Bills).HasForeignKey(x => x.ApplicationId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Bill>().HasOne(x => x.DiscountType).WithMany(x => x.Bills).HasForeignKey(x => x.DiscountId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Bill>().HasOne(x => x.Currencies).WithMany(x => x.Bills).HasForeignKey(x => x.CurrencyId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<Bill>().HasOne(x => x.Branch).WithMany(x => x.Bills).HasForeignKey(x => x.BranchId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            
            builder.Entity<Bill>().HasOne(x => x.User).WithMany(x => x.Bills).HasForeignKey(x => x.UserId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);


            builder.Entity<BillCurrencies>().HasOne(x => x.Bill).WithMany(x => x.BillCurrencies).HasForeignKey(x => x.BillId).OnDelete(DeleteBehavior.SetNull);
           
            // Relation billDetails
            builder.Entity<BillDetails>().HasOne(x => x.Item).WithMany(x => x.BillDetails).HasForeignKey(x => x.ItemId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<BillDetails>().HasOne(x => x.Unit).WithMany(x => x.BillDetails).HasForeignKey(x => x.UnitId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<BillDetails>().HasOne(x => x.ItemPrice).WithMany(x => x.BillDetails).HasForeignKey(x => x.ItemPriceId).OnDelete(DeleteBehavior.SetNull);

            // RelationShip BoxMonies For BoxMonyCategorys & BoxMonyType & Peoples & Users
            builder.Entity<BoxMonies>().HasOne(x => x.Peoples).WithMany(x => x.BoxMonies).HasForeignKey(x => x.PeopleId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<BoxMonies>().HasOne(x => x.Currencies).WithMany(x => x.BoxMonies).HasForeignKey(x => x.CurrencyId).OnDelete(DeleteBehavior.SetNull);

            builder.Entity<BoxMonies>().HasOne(x => x.BoxMonyCategories).WithMany(x => x.BoxMonies).HasForeignKey(x => x.BoxMonyCategoryId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<BoxMonies>().HasOne(x => x.BoxMonyTypes).WithMany(x => x.BoxMonies).HasForeignKey(x => x.BoxMonyTypeId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<BoxMonies>().HasOne(x => x.User).WithMany(x => x.BoxMonies).HasForeignKey(x => x.UserId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);


            // Relation DiscountType
            builder.Entity<Taxes>().HasOne(x => x.DiscountType).WithMany(x => x.Taxes).HasForeignKey(x => x.DiscountId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<BillCurrencies>().HasOne(x => x.Currencies).WithMany(x => x.BillCurrencies).HasForeignKey(x => x.CurrencyId).OnDelete(DeleteBehavior.SetNull);



            builder.Entity<Application>().HasOne(x => x.DiscountType).WithMany(x => x.Applications).HasForeignKey(x => x.DiscountId).OnDelete(DeleteBehavior.SetNull);
         
            builder.Entity<ApplicationUser>().HasOne(x => x.UserDate).WithOne(x => x.User).HasForeignKey<UserDate>(x => x.UserId);
            builder.Entity<ApplicationUser>().HasOne(x => x.userItemCategoryies).WithOne(x => x.ApplicationUser).HasForeignKey<UserItemCategory>(x => x.UserId);
            builder.Entity<ApplicationUser>().HasOne(x => x.Branch).WithMany(x => x.ApplicationUsers).HasForeignKey(x => x.BranchId).OnDelete(DeleteBehavior.SetNull);
            builder.Entity<ApplicationUser>().HasOne(x => x.Printer).WithMany(x => x.ApplicationUsers).HasForeignKey(x => x.PrinterId).OnDelete(DeleteBehavior.SetNull);


            //builder.Entity<ApplicationUser>().HasOne(x => x.Bills).WithOne(x => x.User).HasForeignKey<Bill>(x => x.UserId);

            builder.Entity<Branch>().HasOne(x => x.CompanyInfo).WithMany(x => x.Branch).HasForeignKey(x => x.CompanyInfoId).OnDelete(DeleteBehavior.SetNull);
           
          

        }




        public DbSet<TablesPlaces> TablesPlaces { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<DiscountType> DiscountTypes { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Currencies> Currencies  { get; set; }
        public DbSet<BillCurrencies> BillCurrencies { get; set; }
        public DbSet<Taxes> Taxes { get; set; }
        public DbSet<BillTaxes> BillTaxes { get; set; }
        public DbSet<BillDeliveries> BillDeliveries { get; set; }

        public DbSet<Item> Items { get; set; }
        public DbSet<ItemPrices> ItemPrices { get; set; }
        public DbSet<ItemSize>ItemSizes { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<Printer> Printers { get; set; }
        public DbSet<PeopleType> PeopleTypes { get; set; }
        public DbSet<PeopleCategory> PeopleCategories { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<People> Peoples { get; set; }
        public DbSet<PeopleAccount> PeopleAccounts { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillType> BillTypes { get; set; }
        public DbSet<BillPlace> BillPlaces { get; set; }
        public DbSet<PaymentType> PaymentTypes { get; set; }
        public DbSet<BillDetails> BillDetails { get; set; }
        public DbSet<BoxMonies> BoxMonies { get; set; }
        public DbSet<BoxMonyCategories> BoxMonyCategories { get; set; }
        public DbSet<BoxMonyType> BoxMonyTypes { get; set; }
        public DbSet<Settings> Settings { get; set; }
        public DbSet<ItemComponent> ItemComponents { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<UserDate> UserDates { get; set; }
        
        public DbSet<UserItemCategory> UserItemCategories { get; set; }


        public DbSet<CompanyInfo> companyInfos { get; set; }
        public DbSet<Stock> Stocks { get; set; }
    }


}
