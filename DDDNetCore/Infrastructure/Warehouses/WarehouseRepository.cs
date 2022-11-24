using DDDNetCore.Domain.Warehouses;
using DDDNetCore.Infrastructure.Shared;

namespace DDDNetCore.Infrastructure.Warehouses
{
    public class WarehouseRepository : BaseRepository<Warehouse, WarehouseId>, IWarehouseRepository
    {
      
        public WarehouseRepository(DDDNetCoreDbContext context):base(context.Warehouses)
        {
            
        }

    }
}