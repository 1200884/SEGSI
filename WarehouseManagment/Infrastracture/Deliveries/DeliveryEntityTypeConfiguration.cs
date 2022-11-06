using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarehouseManagment.Domain.Deliveries;

namespace WarehouseManagment.Infrastructure.Deliveries
{
    internal class DeliveryEntityTypeConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
            //builder.ToTable("Deliveries", SchemaNames.WarehouseManagment);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}