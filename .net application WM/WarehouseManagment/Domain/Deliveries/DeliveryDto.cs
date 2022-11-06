using System;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryDto
    {
        public string Id { get; set;}
        
        public string date { get;  set;}

        public int weight { get;  set;}
                
        public string warehouseDeliveryId  {get;  set;}

        public int loadTime { get;  set;}

        public int unloadTime { get;  set;}

        
    }
}