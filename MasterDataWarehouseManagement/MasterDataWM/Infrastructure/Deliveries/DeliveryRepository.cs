using MDWM.Domain.Deliveries;
using MDWM.Infrastructure.Shared;

namespace MDWM.Infrastructure.Deliveries
{
    public class DeliveryRepository : BaseRepository<Delivery, DeliveryId>, IDeliveryRepository
    {
        public DeliveryRepository (MDWMDbContext context):base(context.Deliveries){
            
        }
    }
}