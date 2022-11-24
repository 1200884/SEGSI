

namespace DDDNetCore.Domain.Deliveries
{
    public class DeliveryMapper
    {

        public static DeliveryDto toDTO(Delivery del){
            return new DeliveryDto(){
                Id = del.Id.AsString(),
                date = del.date, 
                weight = del.weight,
                destinationWarhouseId = del.destinationWarhouseId,
                loadTime = del.loadTime, 
                unloadTime = del.unloadTime
            };
        }

        public static Delivery toDelivery(DeliveryDto del){
            return new Delivery(del.Id, del.date, del.weight, del.destinationWarhouseId, del.loadTime, del.unloadTime);
                  
            
        }
        
    }
}