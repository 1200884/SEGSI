using MDWM.Domain.Warehouses;
using MDWM.Infrastructure.Shared;

namespace MDWM.Infrastructure.Warehouses
{
    public class WarehouseRepository : BaseRepository<Warehouse, WarehouseId>, IWarehouseRepository
    {
      
        public WarehouseRepository(MDWMDbContext context):base(context.Warehouses)
        {
            
        }

    }
}