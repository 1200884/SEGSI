

using System;

namespace MDWM.Domain.Deliveries
{
    public class DeliveryDto
    {
        public string Id { get; set;}
        
        public DateTime date { get;  set;}

        public double weight { get;  set;} 

        public string destinationWarehouseId  {get;  set;}

        public int loadTime { get;  set;}

        public int unloadTime { get;  set;}

    }
}