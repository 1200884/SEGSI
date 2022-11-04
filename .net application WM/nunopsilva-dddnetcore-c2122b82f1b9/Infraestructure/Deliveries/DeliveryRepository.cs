using DDDSample1.Domain.Deliveries;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Infraestructure.Deliveries;

namespace DDDSample1.Infrastructure.Deliveries
{
    public class DeliveryRepository : BaseRepository<Delivery, DeliveryId>, IDeliveryRepository
    {
        public DeliveryRepository (DDDSample1DbContext context):base(context.Deliveries){
            
        }
    }
}