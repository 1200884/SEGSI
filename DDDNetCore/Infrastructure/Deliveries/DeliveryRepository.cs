using DDDNetCore.Domain.Deliveries;
using DDDNetCore.Infrastructure.Shared;

namespace DDDNetCore.Infrastructure.Deliveries
{
    public class DeliveryRepository : BaseRepository<Delivery, DeliveryId>, IDeliveryRepository
    {
        public DeliveryRepository (DDDNetCoreDbContext context):base(context.Deliveries){
            
        }
    }
}