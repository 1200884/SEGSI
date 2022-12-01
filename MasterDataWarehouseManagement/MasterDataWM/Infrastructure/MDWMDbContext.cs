using Microsoft.EntityFrameworkCore;
using MDWM.Domain.Warehouses;
using MDWM.Infrastructure.Warehouses;
using MDWM.Domain.Deliveries;
using MDWM.Infrastructure.Deliveries;

namespace MDWM.Infrastructure
{
    public class MDWMDbContext : DbContext{

        public DbSet<Warehouse> Warehouses { get; set; }

        public DbSet<Delivery> Deliveries { get; set; }

        public MDWMDbContext(DbContextOptions options) : base(options)
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