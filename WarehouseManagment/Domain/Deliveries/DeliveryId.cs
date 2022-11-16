using System;
using WarehouseManagment.Domain.Shared;

namespace WarehouseManagment.Domain.Deliveries
{
    public class DeliveryId : EntityId
    {
        public DeliveryId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return text;
        }
        
       override
        public String AsString(){
            return (String) base.Value;
        }
    }
}