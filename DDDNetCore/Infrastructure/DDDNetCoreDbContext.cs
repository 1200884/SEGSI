using Microsoft.EntityFrameworkCore;
using DDDNetCore.Domain.Warehouses;
using DDDNetCore.Infrastructure.Warehouses;
using DDDNetCore.Domain.Deliveries;
using DDDNetCore.Infrastructure.Deliveries;

namespace DDDNetCore.Infrastructure
{
    public class DDDNetCoreDbContext : DbContext{

        public DbSet<Warehouse> Warehouses { get; set; }

        public DbSet<Delivery> Deliveries { get; set; }

        public DDDNetCoreDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new WarehouseEntityTypeConfiguration());
            modelBuilder.Entity<Warehouse>().OwnsOne(b => b.address);
            modelBuilder.Entity<Warehouse>().OwnsOne(b => b.coordinates);
            modelBuilder.ApplyConfiguration(new DeliveryEntityTypeConfiguration());
        }
    }
}