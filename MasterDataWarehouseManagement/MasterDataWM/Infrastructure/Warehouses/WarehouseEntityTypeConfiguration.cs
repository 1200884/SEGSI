using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDWM.Domain.Warehouses;

namespace MDWM.Infrastructure.Warehouses
{
    internal class WarehouseEntityTypeConfiguration : IEntityTypeConfiguration<Warehouse>
    {
        public void Configure(EntityTypeBuilder<Warehouse> builder)
        {
            //builder.ToTable("Families", SchemaNames.MDWM);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}