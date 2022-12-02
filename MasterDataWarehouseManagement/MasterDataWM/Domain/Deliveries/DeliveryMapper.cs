

namespace MDWM.Domain.Deliveries
{
    public class DeliveryMapper
    {

        public static DeliveryDto toDTO(Delivery del){
            return new DeliveryDto(){
                Id = del.Id.AsString(),
                date = del.date._Date, 
                weight = del.weight._Weight,
                destinationWarehouseId = del.destinationWarehouseId,
                loadTime = del.packagingTime._LoadTime, 
                unloadTime = del.packagingTime._UnloadTime
            };
        }

        public static Delivery toDelivery(DeliveryDto del){
            return new Delivery(del.Id, del.date, del.weight, del.destinationWarehouseId, del.loadTime, del.unloadTime);
                  
            
        }
        
    }
}