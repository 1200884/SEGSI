using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Infrastructure.Warehouses;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Infraestructure.Deliveries;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext{

        public DbSet<Warehouse> Warehouses { get; set; }

        public DbSet<Delivery> Deliveries { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
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