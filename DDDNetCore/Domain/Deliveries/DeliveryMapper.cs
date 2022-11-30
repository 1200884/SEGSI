

namespace DDDNetCore.Domain.Deliveries
{
    public class DeliveryMapper
    {

        public static DeliveryDto toDTO(Delivery del){
            return new DeliveryDto(){
                Id = del.Id.AsString(),
                date = del.date, 
                weight = del.weight,
                destinationWarehouseId = del.destinationWarehouseId,
                loadTime = del.loadTime, 
                unloadTime = del.unloadTime
            };
        }

        public static Delivery toDelivery(DeliveryDto del){
            return new Delivery(del.Id, del.date, del.weight, del.destinationWarehouseId, del.loadTime, del.unloadTime);
                  
            
        }
        
    }
}