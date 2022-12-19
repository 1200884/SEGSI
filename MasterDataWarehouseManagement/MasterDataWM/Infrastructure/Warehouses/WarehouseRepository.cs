using MDWM.Domain.Warehouses;
using MDWM.Infrastructure.Shared;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MDWM.Infrastructure.Warehouses
{
    public class WarehouseRepository : BaseRepository<Warehouse, WarehouseId>, IWarehouseRepository
    {
        public WarehouseRepository(MDWMDbContext context):base(context.Warehouses)
        {

        }

        /*public Task<List<Warehouse>> GetDisabled()
        {
            var query = context.Warehouses
                       .Where(w => !w.Active);
                return (Task<List<Warehouse>>)query;
        }*/
    }
}