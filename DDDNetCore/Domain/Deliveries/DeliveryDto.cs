

namespace DDDNetCore.Domain.Deliveries
{
    public class DeliveryDto
    {
        public string Id { get; set;}
        
        public string date { get;  set;}

        public int weight { get;  set;} 

        public string destinationWarehouseId  {get;  set;}

        public int loadTime { get;  set;}

        public int unloadTime { get;  set;}

    }
}