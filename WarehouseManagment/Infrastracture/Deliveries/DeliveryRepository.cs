using WarehouseManagment.Domain.Deliveries;
using WarehouseManagment.Infrastructure.Shared;
using WarehouseManagment.Infrastructure.Deliveries;

namespace WarehouseManagment.Infrastructure.Deliveries
{
    public class DeliveryRepository : BaseRepository<Delivery, DeliveryId>, IDeliveryRepository
    {
        public DeliveryRepository (WarehouseManagmentDbContext context):base(context.Deliveries){
            
        }
    }
}