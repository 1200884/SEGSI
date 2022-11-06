using Microsoft.EntityFrameworkCore;
using WarehouseManagment.Domain.Warehouses;
using WarehouseManagment.Infrastructure.Warehouses;
using WarehouseManagment.Domain.Deliveries;
using WarehouseManagment.Infrastructure.Deliveries;

namespace WarehouseManagment.Infrastructure
{
    public class WarehouseManagmentDbContext : DbContext{

        public DbSet<Warehouse> Warehouses { get; set; }

        public DbSet<Delivery> Deliveries { get; set; }

        public WarehouseManagmentDbContext(DbContextOptions options) : base(options)
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