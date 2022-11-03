using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseId : EntityId
    {

        public WarehouseId(String value) : base(value)
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