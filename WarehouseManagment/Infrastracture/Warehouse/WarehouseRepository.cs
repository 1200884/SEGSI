using WarehouseManagment.Domain.Warehouses;
using WarehouseManagment.Infrastructure.Shared;

namespace WarehouseManagment.Infrastructure.Warehouses
{
    public class WarehouseRepository : BaseRepository<Warehouse, WarehouseId>, IWarehouseRepository
    {
      
        public WarehouseRepository(WarehouseManagmentDbContext context):base(context.Warehouses)
        {
            
        }

    }
}