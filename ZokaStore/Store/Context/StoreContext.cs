using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Store.Entities;

namespace Store.Context
{
    public class StoreContext : IdentityDbContext<User, AppRole, int>
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public override DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<FeedBack> FeedBacks { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<CartSession> CartSessions { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        public virtual DbSet<productImages> ProductImages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<IdentityUserClaim<int>>().ToTable("UserClaim");



            //modelBuilder.Entity<CartSession>()
            //            .HasKey(o => new { o.Id, o.UserId });

            //modelBuilder.Entity<CartItem>()
            //            .HasKey(o => new { o.CartSessionId, o.ProductId });

            //modelBuilder.Entity<FeedBack>()
            //            .HasKey(o => new { o.ProductId, o.UserId });

        }

    }
}
