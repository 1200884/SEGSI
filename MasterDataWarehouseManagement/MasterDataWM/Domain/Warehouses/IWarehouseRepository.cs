using MDWM.Domain.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MDWM.Domain.Warehouses
{
    public interface IWarehouseRepository:IRepository<Warehouse,WarehouseId>
    {
        //Task<List<Warehouse>> GetDisabled();
    }
}