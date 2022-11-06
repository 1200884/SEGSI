using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarehouseManagment.Domain.Warehouses;

namespace WarehouseManagment.Infrastructure.Warehouses
{
    internal class WarehouseEntityTypeConfiguration : IEntityTypeConfiguration<Warehouse>
    {
        public void Configure(EntityTypeBuilder<Warehouse> builder)
        {
            //builder.ToTable("Families", SchemaNames.WarehouseManagment);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}